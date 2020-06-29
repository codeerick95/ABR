<template>
  <div class="comments comments--admin">
    <!-- Comments -->
    <section class="comments-list mb-5">

      <!-- Alerta -->
      <alert-custom v-if="alert.status === true" @event="getComments"></alert-custom>

      <h3 class="comments-title">Comentarios</h3>

      <p class="lead" v-if="loadingComments">Cargando comentarios...</p>

      <template v-else>
        <v-card v-for="(comment, index) in commentsList" :key="index" class="comments--admin__comment animate__animated animate__fadeIn">
          <div class="card-body mb-3">

            <span class="badge badge-primary">{{ comment.id }}</span>

            <div class="row">
              <!-- Imagen de usuario -->
              <div class="col-md-2">
                <img
                  :src="comment.photo ? comment.photo : '/admin/comment-user.png'"
                  :alt="comment.nombreComent"
                  class="admin-comment__image">
              </div>

              <section class="col-md-9">

                <div class="row">
                 <div class="col-md-2">
                   <span class="text-muted">Por:</span>
                 </div>

                  <div class="10">
                    {{ comment.nombreComent ? comment.nombreComent : 'Visitante' }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2">
                    <span class="text-muted">Email:</span>
                  </div>

                  <div class="col-md-10">
                    {{ comment.emailComent }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2">
                    <span class="text-muted">Sitio web:</span>
                  </div>

                  <div class="col-md-10">
                    {{ comment.sitioComent }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2">
                    <span class="text-muted">Comentario:</span>
                  </div>

                  <div class="col-md-10">
                    {{ comment.textComent }}
                  </div>
                </div>

              </section>
            </div>

            <!-- Botones -->
            <div class="row justify-content-end">
              <div class="col-md-10 commer__footer d-flex justify-content-between align-items-center py-3">
                <div>
                  <v-chip
                    :color="comment.stateComent === 1 ? 'red' : 'primary'"
                    text-color="white"
                    label
                    class="mr-3"
                  >
                    {{ comment.stateComent === 1 ? 'Pendiente' : 'Aprobado' }}
                  </v-chip>

                  <v-btn small color="primary" @click="editComment(comment)">
                  <span class="material-icons">
                    create
                  </span>
                  </v-btn>

                  <v-btn small color="error" @click="openDialogDelete(comment)">
                  <span class="material-icons">
                    delete
                  </span>
                  </v-btn>
                </div>

                <span class="text-muted">{{ $moment(comment.created_at).startOf('day').fromNow() }}</span>
              </div>
            </div>

            <hr>

            <!-- Respuestas -->
            <div class="row justify-content-end">
              <div class="col-md-10">
                <responses :commentId="comment.id"></responses>
              </div>
            </div>
          </div>
        </v-card>
      </template>
    </section>

    <!-- Edit -->
    <v-dialog
      v-model="dialogEdit"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Cambiar estado del comentario</v-card-title>

        <v-card-text>
          <span class="text-muted">
            {{ commentSelected.textComent }}
          </span>

          <v-select
            :items="itemsSelect"
            label="Estado del comentario"
            solo
            v-model="commentSelected.stateComent"
            class="mt-5"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialogEdit = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary darken-1"
            @click="updateComment()"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete -->
    <v-dialog
      v-model="dialogDelete"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Eliminar comentario</v-card-title>

        <v-card-text>
          <span class="text-muted">
            {{ commentSelected.textComent }}
          </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialogDelete = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary darken-1"
            @click="deleteComment()"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { appConfig } from "@/env";

  import { mapState } from 'vuex'

  // Components
  import AlertCustom from '@/components/global/Alert'

  // Components
  import Responses from '@/components/admin/blog/comments/Responses'

  // Mutations
  import update from '@/apollo/mutations/blog/comments/update'
  import deleteComment from '@/apollo/mutations/blog/comments/delete'

  // Queries
  import comments from '@/apollo/queries/blog/comments/all'

  export default {
    data() {
      return {
        loading: false, // Se utiliza para el form
        loadingComments: false, // Se utiliza para mostrar mensaje de cargando
        commentsList: [],
        dialogEdit: false,
        commentSelected: {},
        itemsSelect: [
          {
            value: 1,
            text: 'Pendiente'
          },
          {
            value: 2,
            text: 'Aprobado'
          }
        ],
        dialogDelete: false
      }
    },
    mounted() {
      setTimeout(() => {
        this.getComments()
      }, 2000)
    },
    props: ['postId'],
    components: {
      Responses,
      AlertCustom
    },
    methods: {
      getComments() {
        this.loadingComments = true

        let id_blog = parseInt(this.postId)

        this.$apollo.query({
          query: comments,
          fetchPolicy: 'no-cache',
          variables: {
            id_blog
          }
        })
          .then(response => {
            this.commentsList = response.data.coment_blog

            this.loadingComments = false
          })
      },
      showFormResponseStatus() {
        this.$store.commit('setFormResponseToCommentStatus')
      },
      closeAlert() {
        this.alert.status = false
        this.alert.message = ''
      },
      editComment(comment) {
        this.dialogEdit = true

        this.commentSelected = comment
      },
      updateComment() {
        let input = {
          id: this.commentSelected.id,
          textComent: this.commentSelected.textComent,
          nombreComent: this.commentSelected.nombreComent,
          emailComent: this.commentSelected.emailComent,
          sitioComent: this.commentSelected.sitioComent,
          stateComent: this.commentSelected.stateComent,
          blog_id: this.commentSelected.blog_id
        }

        this.$apollo.mutate({
          mutation: update,
          variables: {
            input
          }
        })
          .then(() => {
            this.dialogEdit = false

            let alert = {
              type: 'success',
              status: true,
              message: 'Estado de comentario actualizado.'
            }

            this.$store.commit('setAlert', alert)

            this.getComments()
          })
          .catch(() => {
            this.dialogEdit = false

            let alert = {
              type: 'error',
              status: true,
              message: 'Ocurrió un error, inténtelo nuevamente.'
            }
          })
      },
      openDialogDelete(comment) {
        this.commentSelected = comment

        this.dialogDelete = true
      },
      deleteComment() {
        let input = {
          id: this.commentSelected.id,
          textComent: this.commentSelected.textComent,
          nombreComent: this.commentSelected.nombreComent,
          emailComent: this.commentSelected.emailComent,
          sitioComent: this.commentSelected.sitioComent,
          stateComent: this.commentSelected.stateComent,
          blog_id: this.commentSelected.blog_id,
        }

        this.$apollo.mutate({
          mutation: deleteComment,
          variables: {
            input
          }
        })
          .then(response => {
            this.dialogDelete = false

            let alert = {
              type: 'success',
              status: true,
              message: 'Comentario eliminado.'
            }

            this.$store.commit('setAlert', alert)

            this.getComments()
          })
          .catch(error => {
            this.dialogEdit = false

            let alert = {
              type: 'error',
              status: true,
              message: 'Ocurrió un error, inténtelo nuevamente.'
            }

            this.$store.commit('setAlert', alert)
          })
      }
    },
    computed: {
      ...mapState(['alert', 'formResponseToCommentStatus']),
      adminLogged: function () {
        // Verifica que esté logueado como admin
        return this.$cookies.get(appConfig.nameToken) ? true : false
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../../scss/variables";

  .form-comments {
    margin-top: 1rem;
  }

  .comments {
    margin-top: 5rem;

    .v-input__slot {
      background-color: $light !important;
    }
  }

  .comments--admin {
    margin-top: 2rem;

    &__comment {
      margin-bottom: 3rem;
      border-bottom: 3px solid $primary !important;
    }
  }

  .comments-title {
    font-size: 1.2em;
    font-weight: 800;
  }

  .admin-comment__image {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }

  .admin-responses__title {
    font-size: 1em;
  }
</style>
