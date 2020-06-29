<template>
<layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <v-card outlined class="border-0">
        <div class="card-body">

          <div class="card-create-post__top-action d-flex justify-content-between mb-3">
            <h1 class="card-index-category__title">Lista de categorías</h1>

            <v-btn small color="primary" to="/admin/categorias/crear">
                <span class="material-icons">
                  post_add
                </span>
            </v-btn>
          </div>

          <!-- Lista -->
          <table-categories class="admin-categories__table text-center">
          </table-categories>
        </div>
      </v-card>

      <!-- Los siguientes componentes emiten el evento showAlert cuando se actualizó la categoría
      y así se pueda mostrar una alerta en esta vista -->

      <!-- Modal edit -->
      <edit-category></edit-category>

      <!-- Modal delete -->
      <delete-category></delete-category>

    </template>
</layout>
</template>

<script>
  // Components
  import Layout from '@/components/admin/Layout'
  import TableCategories from '@/components/admin/categories-blog/Table'
  import EditCategory from '@/components/admin/categories-blog/Edit'
  import DeleteCategory from '@/components/admin/categories-blog/Delete'
  import Alert from '@/components/admin/categories-blog/Alert'

  export default {
      middleware: 'authDashboard',
      data() {
        return {
          dialog: false,
          alert: {
            status: false,
            message: ''
          }
        }
      },
    components: {
        Layout,
        TableCategories,
        EditCategory,
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
      }
    }
  }
</script>

<style lang="scss">
  .card-index-category__title {
    font-size: 1.2em;
    font-weight: 700;
  }

  .admin-categories__table {
    margin-top: 3rem;
  }
</style>
