<template>
  <v-dialog v-model="modalPostDelete" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">{{ objectSelected.titleBlog }}</v-card-title>

      <div class="p-3">
        <p class="lead text-muted">¿Está seguro de eliminar?</p>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text :disabled="loading ?  true : false" @click="closeModal()">Cancelar</v-btn>
        <v-btn color="red darken-1" text :disabled="loading ?  true : false" @click="deletePost()">{{ loading ?  'Eliminando...' : 'Eliminar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  // Queries
  import deletePost from '@/apollo/mutations/blog/delete'

  export default {
    data() {
      return {
        loading: false
      }
    },
    methods: {
      closeModal() {
        this.$store.commit('setModalPostDelete', false)
      },
      deletePost() {
        this.loading = true

        let input = {
          id: this.objectSelected.id,
          titleBlog: this.objectSelected.titleBlog,
          textBlog: this.objectSelected.textBlog,
          categoryBlog_id: this.objectSelected.categoryBlog_id
        }

        this.$apollo.mutate({
          mutation: deletePost,
          variables: {
            input
          }
        }).then(() => {
          this.loading = false

          // Oculta el modal
          this.$store.commit('setModalPostDelete', false)

          this.loading = false

          let alert = {
            type: 'success',
            status: true,
            message: 'El post fue eliminado.'
          }

          this.$store.commit('setAlert', alert)
        }).catch(error => {
          this.$store.commit('setModalPostDelete', false)

          let alert = {
            type: 'error',
            status: true,
            message: 'Ocurrió un error, inténtelo nuevamente.'
          }

          this.$store.commit('setAlert', alert)

          this.loading = false
        })

      }
    },
    computed: {
      ...mapState(['modalPostDelete', 'objectSelected'])
    },
  }
</script>

<style scoped>

</style>
