<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <v-card outlined class="border-0">
        <div class="card-body">

          <div class="card-create-post__top-action d-flex justify-content-between mb-3">
            <h1 class="card-index-post__title">Lista de posts</h1>

            <v-btn small color="primary" class="text-decoration-none" v-b-tooltip.hover title="Crear post" to="/admin/blog/crear">
                <span class="material-icons">
                  post_add
                </span>
            </v-btn>
          </div>

          <!-- Lista -->
          <posts-table>
          </posts-table>
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
  import { mapState } from 'vuex'

  // Components
  import Layout from '@/components/admin/Layout'
  import PostsTable from '@/components/admin/blog/Table'
  import ModalUserEdit  from '@/components/admin/blog/Edit'
  import ModalPostDelete from '@/components/admin/blog/Delete'
  import ModalComments from '@/components/admin/blog/comments/list'
  import Post from '@/components/admin/blog/Post'


  import { appConfig } from '@/env'

  import all from '@/apollo/queries/blog/all'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        items: []
      }
    },
    mounted() {
      this.getPosts()
    },
    components: {
      Layout,
      PostsTable,
      ModalUserEdit,
      ModalPostDelete,
      ModalComments,
      Post
    },
    methods: {
      showModalDelete(post) {
        this.$store.commit('setPostSelected', post)
        this.$store.commit('setModalPostDelete')
      },
      showAlert(alert) {
        this.alert.status = true
        this.alert.message = alert.message
      },
      getPosts() {
        let page = this.currentPage, // Paginación
          number_paginate = 5 // Items a traer

        this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache',
          variables: {
            page,
            number_paginate
          }
        })
          .then(response => {
            this.items = response.data.blogs_get.data

            this.nroTotal_items = response.data.blogs_get.nroTotal_items
          })
      },
      showModalComments(post) {
        this.$store.commit('setModalComments', true)
        this.$store.commit('setObjectSelected', post)
      },
      showModalPostEdit(post) {
        this.$store.commit('setModalFullScreen', true)
        this.$store.commit('setObjectSelected', post)
      },
      showModalPostDelete(post) {
        this.$store.commit('setModalPostDelete', true)
        this.$store.commit('setObjectSelected', post)
      }
    },
    computed: {
      ...mapState(['objectSelected']),
      setTotalPages: function () {
        return Math.ceil(this.nroTotal_items / this.numberPerPage)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../scss/variables";

  .card-index-post__title {
    font-size: 1.2em;
    font-weight: 700;
  }
</style>
