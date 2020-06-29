<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <v-card outlined class="border-0">
        <div class="card-body">

          <div class="card-create-post__top-action d-flex justify-content-between mb-3">
            <h1 class="card-index-publications__title">Categorías de publicaciones</h1>

            <v-btn small color="primary" to="/admin/categorias-publicaciones/crear">
                <span class="material-icons">
                  post_add
                </span>
            </v-btn>
          </div>

          <p class="text-muted">Seleccione una categoría para ver las publicaciones</p>

          <!-- Lista -->
          <list-categories :fields="fields" :items="items" class="admin-categories-publications__all text-center" v-if="items">
          </list-categories>
        </div>
      </v-card>

      <!-- Los siguientes componentes emiten el evento showAlert cuando se actualizó la categoría
      y así se pueda mostrar una alerta en esta vista -->

      <!-- Modal publications -->
      <modal-publications></modal-publications>

      <!-- Modal edit -->
      <edit-category @showAlert="showAlert($event)"></edit-category>

      <!-- Modal delete -->
      <delete-category @showAlert="showAlert($event)"></delete-category>

    </template>
  </layout>
</template>

<script>
  import { mapState } from 'vuex'

  // Components
  import Layout from '@/components/admin/Layout'
  import ListCategories from '@/components/admin/publications/categories/List'
  import EditCategory from '@/components/admin/publications/categories/Edit'
  import ModalPublications from '@/components/admin/publications/categories/ModalPublications'
  import DeleteCategory from '@/components/admin/publications/categories/Delete'
  import Alert from '@/components/admin/categories-blog/Alert'

  // queries
  import all from '@/apollo/queries/publications/categories/all'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        fields: [ 'id', {key: 'nameCategoryPublication', label: 'Nombre'}, {key: 'stateCategoryPublication', label: 'Estado'}, { key: 'actions', label: 'Acciones'} ],
        dialog: false,
        alert: {
          status: false,
          message: ''
        },
        items: []
      }
    },
    mounted() {
      this.getCategories()

      this.$store.commit('setModalFullScreen', false)
      this.$store.commit('setModalCategoryDelete', false)
    },
    /*apollo: {
      categoria_publicaciones: {
        prefetch: true,
        query: all
      }
    },*/
    components: {
      Layout,
      ListCategories,
      EditCategory,
      ModalPublications,
      DeleteCategory,
      Alert
    },
    methods: {
      showAlert(message) {
        this.alert.status = true
        this.alert.message = message

        this.getCategories()
      },
      closeAlert() {
        this.alert.status = false
        this.alert.message = ''
      },
      getCategories() {
        this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache'
        })
        .then(res => {
          this.items = res.data.categoria_publicaciones
        })
      }
    },
    computed: {
      ...mapState(['modalCategoryDelete'])
    }
  }
</script>

<style lang="scss">
  .card-index-publications__title {
    font-size: 1.2em;
    font-weight: 700;
  }
</style>
