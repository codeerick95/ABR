<template>
  <v-dialog v-model="modalFullScreen" v-if="modalFullScreen" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title v-if="objectSelected">Editando categoría</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn icon dark @click="closeModalCategoryEdit()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>

      <section class="container update-category-publication__content">
        <div class="row">
          <div class="col-md-12">
            <h3 class="update-category__title mt-5">{{ objectSelected.nameCategoryPublication }}</h3>

            <form-edit-category @updated="updated()" class="mt-5"></form-edit-category>
          </div>
        </div>
      </section>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  // Components
  import FormEditCategory from './FormEdit'

  export default {
    components: {
      FormEditCategory
    },
    computed: {
      ...mapState(['modalFullScreen', 'objectSelected'])
    },
    methods: {
      closeModalCategoryEdit() {
        this.$store.commit('setModalFullScreen', false)
      },
      setCategoryName() {
        this.categoryName = this.categorySelected.name
      },
      updated() {
        this.closeModalCategoryEdit()
        this.$emit('showAlert', 'Categoría actualizada')
      }
    }
  }
</script>

<style scoped>
  .update-category__title {
    font-size: 2em;
    font-weight: 700;
  }
  .update-category-publication__content {
    margin-top: 1rem;
  }
</style>
