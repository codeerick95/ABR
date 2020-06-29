<template>
  <v-dialog v-model="modalCategoryDelete" persistent max-width="500">
    <v-card v-if="publicationSelected">
      <v-card-title class="headline">{{ publicationSelected.titlePublication }}</v-card-title>

      <div class="p-3">
        <p class="lead text-muted">¿Está seguro de eliminar?</p>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>

        <!-- Cancelar -->
        <v-btn color="primary darken-1" text :disabled="loading ?  true : false" @click="closeModal()">Cancelar</v-btn>

        <!-- Eliminar -->
        <v-btn color="red darken-1" text :disabled="loading ?  true : false" @click="deleteCategory()">{{ loading ?  'Eliminando...' : 'Eliminar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  import deletePublication from '@/apollo/mutations/publications/delete'

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

        // Objeto a enviar para eliminar
        let input = {
          categoryPublication_id: this.publicationSelected.categoryPublication_id,
          descriptionPublication:  this.publicationSelected.descriptionPublication,
          filePublication: this.publicationSelected.filePublication,
          id: this.publicationSelected.id,
          imagePublication: this.publicationSelected.imagePublication,
          titlePublication: this.publicationSelected.titlePublication,
          estado: this.publicationSelected.estado
        }

        this.$apollo.mutate({
          mutation: deletePublication,
          variables: {
            input
          }
        }).then(() => {
          this.loading = false

          this.$store.commit('setModalCategoryDelete', false)

          this.loading = false

          this.$emit('deleted')
        })
        .catch(error => this.loading = false)

      }
    },
    computed: {
      ...mapState(['modalCategoryDelete', 'publicationSelected'])
    },
  }
</script>

<style scoped>

</style>
