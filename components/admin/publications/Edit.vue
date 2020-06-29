<template>
  <v-dialog
    v-model="modalEditPublications"
    persistent
  >
    <v-card>
      <v-card-title>
        <h2 class="edit-publication__title">
          <span class="text-muted">Editando publicación</span>
        </h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <div class="form-edit__publication-container">
        <!-- El v-if es importante para que se vuelva a montar el componente -->
        <form-edit-publication @updated="updated()" v-if="modalEditPublications"></form-edit-publication>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  // Components
  import FormEditPublication from "./FormEditPublication";

  export default {
    data() {
      return {

      }
    },
    components: {
      FormEditPublication
    },
    methods: {
      updated() {
        // Recibe el evento de actualización del formulario para enviar otro evento a la tabla
        this.$emit('updatedPublication', 'Publicación actualizada')
      }
    },
    computed: {
      ...mapState(['modalEditPublications', 'publicationSelected'])
    }
  }
</script>

<style lang="scss" scoped>
.edit-publication__title {
  font-size: 1em;
}

  .form-edit__publication-container {
    width: 90%;
    margin: 0 auto;
  }
</style>
