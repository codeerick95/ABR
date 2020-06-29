<template>
  <!-- Search -->
  <div class="bg-light search">
    <b-form inline class="d-flex justify-content-center px-3 px-md-0" @submit.prevent="validate()">
      <b-input
        type="search"
        id="inline-form-input-name"
        class="mb-2 mb-sm-0"
        placeholder="Buscar"
        v-model="querySearch"
      ></b-input>

      <b-button type="submit" variant="warning" class="m-0">
        <img src="../../assets/icons/search-white.svg" alt="" class="icon-button">
      </b-button>
    </b-form>

    <div class="text-center mt-1 mb-0 pt-1">
      <p class="text-danger m-0" v-if="error.status">{{ error.message }}</p>

      <p class="text-muted m-0" v-if="loading">Buscando...</p>
    </div>

  </div>
</template>

<script>
  import search from '@/apollo/queries/blog/search'

  export default {
    data() {
      return {
        error: {
          status: false,
          message: 'Mínimo 4 letras'
        },
        querySearch: '',
        loading: false,
        currentPage: 1,
        numberPerPage: 5
      }
    },
    methods: {
      validate() {
        this.error.status = false

        if (!this.querySearch || this.querySearch.length < 4) {
          this.error.status = true
        } else {
          this.search()
        }
      },
      search() {
        this.loading = true

        let page = this.currentPage,
            number_paginate = this.numberPerPage,
            title = this.querySearch

        this.$apollo.query({
          prefetch: true,
          query: search,
          fetchPolicy: 'no-cache',
          variables: {
            page,
            number_paginate,
            title
          }
        })
        .then(response => {
          let data = {
            query: this.querySearch,
            posts: response.data.blogs_get_title.data
          }

          // Se guardan los posts en vuex para luego ser renderizados desde la vista /blog/resultados-busqueda
          this.$store.commit('setPostsBySearch', data)

          this.loading = false

          this.querySearch = ''

          if(this.$route.path != '/blog/resultados-busqueda') {
            this.$router.push('/blog/resultados-busqueda')
          }
        })
        .catch(error => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
