<template>
  <div>
    <b-table
      :items="comments"
      :fields="fields"
      outlined
      hover
      no-border-collapse
      head-variant="light"
      v-if="comments.length >= 0"
      :class="comments.length <= 0 ? 'd-none' : 'table-admin-comments'"
    >
      <template v-slot:cell(stateComent)="row">
        <v-chip
          :color="row.item.stateComent === 0 ? 'red' : 'primary'"
          text-color="white"
          label
        >
          {{ row.item.stateComent === 0 ? 'Pendiente' : 'Aprobado' }}
        </v-chip>
      </template>

      <template v-slot:cell(actions)="row">

        <v-btn small color="primary" @click="openDialogEdit(row.item)">
          <span class="material-icons">
            create
          </span>
        </v-btn>

        <v-btn small color="error" @click="openDialogDelete(row.item)">
          <span class="material-icons">
            delete
          </span>
        </v-btn>
      </template>
    </b-table>

    <p class="lead" v-if="comments.length <= 0">Aún no hay comentarios para este post.</p>

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
  import all from '@/apollo/queries/blog/comments/all'

  import update from '@/apollo/mutations/blog/comments/update'
  import deleteComment from '@/apollo/mutations/blog/comments/delete'

  export default {
    data() {
      return {
        fields: [
          { key: 'nombreComent', label: 'Enviado por'},
          { key: 'textComent', label: 'Comentario'},
          { key: 'stateComent', label: 'Estado'},
          { key: 'actions', label: 'Acciones'}
        ],
        comments: [],
        dialogEdit: false,
        dialogDelete: false,
        commentSelected: {}, // Indica que comentario fue seleccionado para editar
        itemsSelect: [
          {
            value: 0,
            text: 'Pendiente'
          },
          {
            value: 1,
            text: 'Aprobado'
          }
        ]
      }
    },
    mounted() {
      this.getComments()
    },
    props: ['idBlog'],
    methods: {
      getComments() {
        let id_blog = this.idBlog

        this.$apollo.query({
          query: all,
          variables: {
            id_blog
          },
          fetchPolicy: 'no-cache'
        })
        .then(response => {
          this.comments = response.data.coment_blog
        })
      },
      openDialogEdit(comment) {
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
        .then(response => {
          this.dialogEdit = false

          this.getComments()
        })
        .catch(error => this.dialogEdit = false)
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

            this.getComments()
          })
          .catch(error => this.dialogDelete = false)
      }
    }
  }
</script>

<style lang="scss" scoped>
.table-admin-comments {
  margin-top: 3rem;
}
</style>
