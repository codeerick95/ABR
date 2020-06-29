<template>
  <v-dialog v-model="modalFullScreen" v-if="modalFullScreen" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title v-if="objectSelected">Editando actividad</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn icon dark @click="closeModalCategoryEdit()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>

      <section class="container update-activity__content">
        <div class="row">
          <div class="col-md-12">
            <form-edit-activity @updated="updated()" class="mt-5"></form-edit-activity>
          </div>
        </div>
      </section>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  // Components
  import FormEditActivity from './FormEdit'

  export default {
    components: {
      FormEditActivity
    },
    computed: {
      ...mapState(['modalFullScreen', 'objectSelected'])
    },
    methods: {
      closeModalCategoryEdit() {
        this.$store.commit('setModalFullScreen', false)
      },
      updated() {
        this.closeModalCategoryEdit()
        this.$emit('showAlert', 'Actividad actualizada actualizada')
      }
    }
  }
</script>

<style lang="scss">
  .update-activity__content {
    margin-top: 1rem;
  }

  .update-activity__title {
    font-size: 2em;
    font-weight: 700;
  }
</style>
