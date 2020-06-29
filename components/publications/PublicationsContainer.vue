<template>
  <div v-if="publicationSelected">
    <template v-if="publications.length">
      <post v-for="post in publications" :key="post.id" :post="post" v-if="post.estado !== 0">
      </post>

      <!-- Paginación -->
      <div class="d-flex justify-content-center" v-if="publications.length && (nroTotal_items > numberPerPage)">
        <pagination :totalPages="setTotalPages">

          <!-- Slot -->
          <template slot="form">
            <form @submit.prevent="submitByNumber()">
              <input type="number" min="1" class="form-control pagination__field" :disabled="setTotalPages == 1" v-model="currentPage">
            </form>
          </template>

          <template slot="buttons">
            <button class="pagination__button pagination__button--prev" :disabled="currentPage == 1" v-if="currentPage != 1" @click="prev">
                  <span class="material-icons">
                    arrow_back_ios
                  </span>
            </button>
            <button class="pagination__button pagination__button--next" :disabled="currentPage == setTotalPages" v-if="currentPage != setTotalPages" @click="next">
                  <span class="material-icons">
                    arrow_forward_ios
                  </span>
            </button>
          </template>

        </pagination>
      </div>
    </template>

    <!-- Si no existen publicaciones -->
    <h2 v-else class="lead text-dark text-center">Estamos trabajando en las publicaciones</h2>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Post from './Post'
  import Pagination from '@/components/global/Pagination'

  // Queries
  import publications from '@/apollo/queries/publications/all'


  export default {
    data() {
      return {
        publications: [],
        currentPage: 1,
        numberPerPage: 5,
        nroTotal_items: 0, // Utilizado para la paginación
      }
    },
    mounted() {
      this.getPublications()
    },
    methods: {
      getPublications() {
        let categoria_id = parseInt(this.publicationSelected.id),
          page = this.currentPage,
          number_paginate = this.numberPerPage, // Items a traer
          estado = 1

        this.$apollo.query({
          query: publications,
          fetchPolicy: 'no-cache',
          variables: {
            categoria_id,
            page,
            number_paginate,
            estado
          }
        })
          .then(response => {
            this.publications = response.data.publicaciones_categorias.data

            this.nroTotal_items = response.data.publicaciones_categorias.nroTotal_items
          })
      },
      prev() {
        if(this.currentPage > 1) {
          this.currentPage--
          this.getPublications()

          window.scrollTo(0, 400)
        }
      },
      next() {
        if(this.currentPage < this.setTotalPages) {
          this.currentPage++
          this.getPublications()

          window.scrollTo(0, 400)
        }
      },
      submitByNumber() {
        // Si la el número de página que quiere buscar es >= 1 y es menor al total de páginas
        if(this.currentPage >= 1 && this.currentPage <= this.setTotalPages) {
          this.getPublications()
        } else {
          // Se envía a buscar la página nro 1
          this.currentPage = 1
          this.getPublications()
        }
      }
    },
    components: {
      Post,
      Pagination
    },
    computed: {
      ...mapState(['publicationSelected']),
      setTotalPages: function () {
        return Math.ceil(this.nroTotal_items / this.numberPerPage)
      }
    }
  }
</script>

<style scoped>

</style>
