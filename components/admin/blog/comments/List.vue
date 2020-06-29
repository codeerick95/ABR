<template>
  <div>
    <v-dialog v-model="modalComments" v-if="modalComments" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="admin-comments">
        <v-toolbar dark color="primary">
          <v-toolbar-title v-if="objectSelected">Comentarios</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn icon dark @click="closeModal()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>

        </v-toolbar>



        <section class="container admin-comments__content">

          <h3 class="admin-comments__title">{{ objectSelected.titleBlog }}</h3>

          <table-comments :idBlog="objectSelected.id"></table-comments>
        </section>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import TableComments from './Table'

  export default {
    components: {
      TableComments
    },
    computed: {
      ...mapState(['modalComments', 'objectSelected'])
    },
    methods: {
      closeModal() {
        this.$store.commit('setModalComments', false)
        this.$store.commit('setObjectSelected', {})
      }
    }
  }
</script>

<style lang="scss" scoped>
.admin-comments {

  &__content {
    margin-top: 5rem;
  }

  &__title {
    font-size: 1.5em;
    font-weight: 700;
  }
}
</style>
