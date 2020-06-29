<template>
  <div class="admin-responses">

    <template v-if="items.length >= 1">
      <h2 class="admin-responses__title">Respuestas: </h2>

      <v-card v-for="(item, index) in items" :key="index" class="bg-light animate__animated animate__fadeIn mb-5">
        <div class="card-body mb-3">
          <div class="row">

            <section class="col-md-12">

              <div class="row">
                <div class="col-md-2">
                  <span class="text-muted">Por:</span>
                </div>

                <div class="col-md-10">
                  {{ item.nombreComent ? item.nombreComent : 'Visitante' }}
                </div>
              </div>

              <div class="row">
                <div class="col-md-2">
                  <span class="text-muted">Email:</span>
                </div>

                <div class="col-md-10">
                  {{ item.emailComent }}
                </div>
              </div>

              <div class="row">
                <div class="col-md-2">
                  <span class="text-muted">Sitio web:</span>
                </div>

                <div class="col-md-10">
                  {{ item.sitioComent }}
                </div>
              </div>

              <div class="row">
                <div class="col-md-2">
                  <span class="text-muted">Comentario:</span>
                </div>

                <div class="col-md-10">
                  {{ item.textComent }}
                </div>
              </div>

            </section>
          </div>
        </div>

        <!-- Botones -->
        <div class="card-footer">
          <!-- Botones -->
          <div class="row justify-content-end">
            <div class="col-md-10 commer__footer d-flex justify-content-between align-items-center py-3">
              <div>
                <v-chip
                  :color="item.stateComent === 1 ? 'red' : 'primary'"
                  text-color="white"
                  label
                  class="mr-3"
                >
                  {{ item.stateComent === 1 ? 'Pendiente' : 'Aprobado' }}
                </v-chip>

                <v-btn small color="primary" @click="editResponse(item)">
                  <span class="material-icons">
                    create
                  </span>
                </v-btn>

                <v-btn small color="error" @click="openDialogResponseDelete(item)">
                  <span class="material-icons">
                    delete
                  </span>
                </v-btn>
              </div>

              <span class="text-muted">{{ $moment(item.created_at).startOf('day').fromNow() }}</span>
            </div>
          </div>
        </div>
      </v-card>
    </template>

    <!-- Edit -->
    <v-dialog
      v-model="dialogResponseEdit"
      max-width="500"
      persistent
      v-if="responseSelected"
    >
      <v-card>
        <v-card-title class="headline">Cambiar estado de la respuesta</v-card-title>

        <v-card-text>
          <span class="text-muted">
            {{ responseSelected.textComent }}
          </span>

          <v-select
            :items="itemsSelect"
            label="Estado del comentario"
            solo
            v-model="responseSelected.stateComent"
            class="mt-5"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialogResponseEdit = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary darken-1"
            @click="updateResponse()"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete -->
    <v-dialog
      v-model="dialogResponseDelete"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Eliminar respuesta</v-card-title>

        <v-card-text>
          <span class="text-muted">
            {{ responseSelected.textComent }}
          </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialogResponseDelete = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary darken-1"
            @click="deleteResponse()"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  // Queries
  import responses from '@/apollo/queries/blog/comments/get_answer_coment'

  // Mutations
  import update from '@/apollo/mutations/blog/comments/responses/update'
  import deleteResponse from '@/apollo/mutations/blog/comments/responses/delete'

  export default {
    data() {
      return {
        items: [],
        dialogResponseEdit: false,
        responseSelected: {},
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
        dialogResponseDelete: false
      }
    },
    props: ['commentId'],
    mounted() {
      this.getResponses()
    },
    methods: {
      getResponses() {
        let id_coment = this.commentId

        this.$apollo.query({
          prefetch: true,
          query: responses,
          fetchPolicy: 'no-cache',
          variables: {
            id_coment
          }
        })
          .then(response => {
            this.items = response.data.answer_coments
          })
      },
      editResponse(response) {
        this.dialogResponseEdit = true

        this.responseSelected = response
      },
      openDialogResponseDelete(comment) {
        this.responseSelected = comment

        this.dialogResponseDelete = true
      },
      updateResponse() {
        let input = {
          id: this.responseSelected.id,
          textComent: this.responseSelected.textComent,
          nombreComent: this.responseSelected.nombreComent,
          emailComent: this.responseSelected.emailComent,
          sitioComent: this.responseSelected.sitioComent,
          stateComent: this.responseSelected.stateComent,
          blog_id: this.responseSelected.blog_id
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
              message: 'Estado de la respuesta actualizado.'
            }

            this.$store.commit('setAlert', alert)

            this.getResponses()
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
      deleteResponse() {
        let input = {
          id: this.responseSelected.id,
          textComent: this.responseSelected.textComent,
          nombreComent: this.responseSelected.nombreComent,
          emailComent: this.responseSelected.emailComent,
          sitioComent: this.responseSelected.sitioComent,
          stateComent: this.responseSelected.stateComent,
          blog_id: this.responseSelected.blog_id,
        }

        this.$apollo.mutate({
          mutation: deleteResponse,
          variables: {
            input
          }
        })
          .then(response => {
            this.dialogDelete = false

            let alert = {
              type: 'success',
              status: true,
              message: 'Respuesta eliminada.'
            }

            this.$store.commit('setAlert', alert)

            this.getResponses()
          })
          .catch(() => {
            this.dialogEdit = false

            let alert = {
              type: 'error',
              status: true,
              message: 'Ocurrió un error, inténtelo nuevamente.'
            }

            this.$store.commit('setAlert', alert)
          })
      }
    }
  }
</script>

<style scoped>

</style>
