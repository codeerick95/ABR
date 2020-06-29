<template>
  <layout>
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <v-card outlined class="border-0">
        <div class="card-body">

          <div class="card-create-post__top-action d-flex justify-content-between mb-3">
            <h1 class="card-index-post__title">Lista de publicacioness</h1>

            <v-btn small color="primary" to="/admin/blog/crear">
                  <span class="material-icons">
                    post_add
                  </span>
            </v-btn>
          </div>

          <!-- Lista -->
          <publications-table class="admin-categories__table">
          </publications-table>
        </div>
      </v-card>

      <!-- Los siguientes componentes emiten el evento showAlert cuando se actualizó el post
      y así se pueda mostrar una alerta en esta vista -->

      <!-- Modal edit -->
      <modal-user-edit @showAlert="showAlert($event)"></modal-user-edit>

      <!-- Modal delete -->
      <modal-post-delete @showAlert="showAlert($event)"></modal-post-delete>

      <modal-comments></modal-comments>
    </template>
  </layout>
</template>

<script>
  // Components
  import Layout from '@/components/admin/Layout'
  import PublicationsTable from '@/components/admin/publications/PublicationsTable'
  import ModalPublicationEdit  from '@/components/admin/blog/Edit'
  // import ModalPostDelete from '@/components/admin/publications/Delete'
  import Alert from '@/components/admin/blog/Alert'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        fields: [
          'id',
          { key: 'titleBlog', label: 'Título'},
          { key: 'actions', label: 'Acciones'}
        ],
        currentPage: 1
      }
    },
    components: {
      Layout,
      PublicationsTable,
      ModalPublicationEdit,
      // ModalPostDelete,
      Alert
    },
    methods: {
      showModalDelete(post) {
        this.$store.commit('setPostSelected', post)
        this.$store.commit('setModalPostDelete')
      },
      showAlert(message) {
        this.alert.status = true
        this.alert.message = message

        // Actualiza la tabla
        this.getPublications()
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
