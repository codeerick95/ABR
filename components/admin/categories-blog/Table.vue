<template>
  <div>
    <!-- Alert -->
    <alert-custom v-if="alert.status === true" @event="getCategories"></alert-custom>

    <v-card class="admin__categories-table">
      <table class="table">
        <thead>
        <tr class="text-white">
          <th scope="col">#</th>
          <th scope="col">Nombre de categoría</th>
          <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody class="text-white">
        <tr v-for="(item, index) in items" :key="index" class="animate__animated animate__fadeIn">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.titleCategoryBlog }}</td>
          <td>

            <!-- Editar post -->
            <v-btn small color="primary" @click="showModalCategoryEdit(item)">
                <span class="material-icons">
                  create
                </span>
            </v-btn>

            <!-- Eliminar post -->
            <v-btn small color="error" @click="showModalCategoryDelete(item)">
              <span class="material-icons">
                delete
              </span>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </table>
    </v-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import all from '@/apollo/queries/blog/categories/all'

  import AlertCustom from '@/components/global/Alert'

  export default {
    data() {
      return {
        items: []
      }
    },
    mounted() {
      this.getCategories()
    },
    components: {
      AlertCustom
    },
    methods: {
      getCategories() {
        this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache'
        })
          .then(response => {
            this.items = response.data.categorias_blog
          })
      },
      showModalCategoryEdit(category) {
        this.$store.commit('setModalFullScreen', true)
        this.$store.commit('setObjectSelected', category)
      },
      showModalCategoryDelete(category) {
        this.$store.commit('setModalCategoryDelete', true)
        this.$store.commit('setObjectSelected', category)
      }
    },
    computed: {
      ...mapState(['alert'])
    }
  }
</script>

<style lang="scss">
.admin__categories-table {
  background-color: rgba(#222538, .9) !important;
  color: white !important;
  transition: background-color .7s;
  z-index: 10 !important;

  &:hover {
    background-color: rgba(#222538, .95) !important;
  }
}
</style>
