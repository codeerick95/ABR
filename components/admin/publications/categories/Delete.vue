<template>
  <v-dialog v-model="modalCategoryDelete" persistent max-width="300">
    <v-card v-if="objectSelected">
      <v-card-title class="headline">{{ objectSelected.nameCategoryPublication }}</v-card-title>

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

  import deleteCategory from '@/apollo/mutations/publications/categories/delete'

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

        let input = this.objectSelected

        this.$apollo.mutate({
          mutation: deleteCategory,
          variables: {
            input
          }
        }).then(() => {
          this.loading = false

          this.$store.commit('setModalCategoryDelete', false)

          this.loading = false

          this.$emit('showAlert', 'Categoría eliminada')
        }).catch(error => {
          this.loading = false
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
