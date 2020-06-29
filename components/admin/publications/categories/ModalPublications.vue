<template>
  <!-- Este componente muestra la tabla de publicaciones de la categoría selecionada -->
  <v-dialog v-model="modalPublications" v-if="modalPublications" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title v-if="objectSelected">Publicaciones de la categoría {{ objectSelected.nameCategoryPublication }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn icon dark @click="closeModalPublications()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>

      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <publications-table></publications-table>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  // Components
  import PublicationsTable from '../PublicationsTable'

  export default {
    components: {
      PublicationsTable
    },
    methods: {
      closeModalPublications() {
        this.$store.commit('setModalPublications', false)
      }
    },
    computed: {
      ...mapState(['modalPublications', 'objectSelected'])
    }
  }
</script>

<style scoped>

</style>
