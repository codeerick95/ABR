<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <alert @closeAlert="closeAlert()" v-if="alert.status" :message="alert.message"></alert>

      <v-card outlined class="border-0">
        <div class="card-body">

          <div class="card-create-post__top-action d-flex justify-content-between mb-3">
            <h1 class="card-index-post__title">Lista de usuarios</h1>

            <v-btn small color="primary" to="/admin/editores/crear">
                <span class="material-icons">
                  post_add
                </span>
            </v-btn>
          </div>

        </div>
      </v-card>

      <!-- Lista -->
      <editors-list>
      </editors-list>
    </template>
  </layout>
</template>

<script>
  // Components
  import Layout from '@/components/admin/Layout'
  import EditorsList from '@/components/admin/editors/EditorsList'
  import ModalUserEdit from '@/components/admin/editors/Edit'
  import ModalPostDelete from '@/components/admin/blog/Delete'
  import Alert from '@/components/admin/blog/Alert'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        fields: [
          'id',
          { key: 'name', label: 'Nombre'},
          { key: 'status', label: 'Estado'},
          { key: 'actions', label: 'Acciones'}
        ],
        alert: {
          status: false,
          message: ''
        }
      }
    },
    components: {
      Layout,
      EditorsList,
      ModalUserEdit,
      ModalPostDelete,
      Alert
    },
    methods: {
      showModalDelete(post) {
        this.$store.commit('setObjectSelected', post)
        this.$store.commit('setModalPostDelete')
      },
      showAlert(message) {
        this.alert.status = true
        this.alert.message = message
      },
      closeAlert() {
        this.alert.status = false
        this.alert.message = ''
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../scss/variables";

  .card-index-post__title {
    font-size: 1.2em;
    font-weight: 700;
    color: $primary;
  }
</style>
