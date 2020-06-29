<template>
  <v-dialog v-model="modalCategoryDelete" persistent max-width="300">
    <v-card v-if="objectSelected">
      <v-card-title class="headline">{{ objectSelected.titleActivity }}</v-card-title>

      <div class="p-3">
        <p class="lead text-muted">¿Está seguro de eliminar?</p>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text :disabled="loading ?  true : false" @click="closeModal()">Cancelar</v-btn>
        <v-btn color="red darken-1" text :disabled="loading ?  true : false" @click="deleteCategory()">{{ loading ?  'Eliminando...' : 'Eliminar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  import deleteActivity from '@/apollo/mutations/activities/delete'

  export default {
    data() {
      return {
        loading: false
      }
    },
    methods: {
      closeModal() {
        this.$store.commit('setModalCategoryDelete', false)
      },
      deleteCategory() {
        this.loading = true

        let input = {
          id: this.objectSelected.id,
          titleActivity: this.objectSelected.titleActivity,
          textActivity: this.objectSelected.textActivity,
          galleryActivity: toString(this.objectSelected.galleryActivity),
          categoryActivity_id: this.objectSelected.categoryActivity_id
        }

        this.$apollo.mutate({
          mutation: deleteActivity,
          variables: {
            input
          }
        }).then((data) => {
          this.loading = false

          this.$store.commit('setModalCategoryDelete', false)

          let alert = {
            type: 'success',
            status: true,
            message: 'La actividad fue eliminada.'
          }

          this.$store.commit('setAlert', alert)
        }).catch(() => {
          this.loading = false

          this.$store.commit('setModalCategoryDelete', false)

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
      ...mapState(['modalCategoryDelete', 'objectSelected'])
    },
  }
</script>

<style scoped>

</style>
