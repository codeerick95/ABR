<template>
  <v-dialog v-model="modalFullScreen" v-if="modalFullScreen" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card class="update-post">
      <v-toolbar dark color="primary">
        <v-toolbar-title v-if="objectSelected">Editando post</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn icon dark @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>

      <section class="container update-post__content">

        <!-- Formulario de edición -->
        <form-edit-post class="mt-5"></form-edit-post>

      </section>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  // Queries
  import update from '@/apollo/mutations/categories/update'
  import FormEditPost from './FormEdit'

  export default {
    data() {
      return {
        loading: false
      }
    },
    components: {
      FormEditPost
    },
    computed: {
      ...mapState(['modalFullScreen', 'objectSelected'])
    },
    methods: {
      closeModal() {
        this.$store.commit('setModalFullScreen', false)
      },
      updated() {
        this.closeModal()
      }
    }
  }
</script>

<style lang="scss">
  .update-post {
    &__title {
       font-size: 2em;
       font-weight: 700;
     }

    &__content {
      margin-top: 1rem;
    }
  }
</style>
