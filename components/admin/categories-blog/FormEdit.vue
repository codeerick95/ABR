<template>
  <v-form
    ref="editCategoryBlog"
    v-model="valid"
    lazy-validation
    @submit.prevent="validate">
    <section class="container update-category__content">
      <div class="row">
        <div class="col-md-8">
          <h3 class="update-category__title mt-5">{{ objectSelected.titleCategoryBlog }}</h3>

          <v-text-field
            label="Nuevo nombre"
            v-model="titleCategoryBlog"
            :rules="requiredRule"
          ></v-text-field>

          <v-col cols="12">
            <v-textarea
              label="Descripción corta"
              v-model="description"
            ></v-textarea>

            <v-col cols="12" class="text-right">
              <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Actualizando': 'Actualizar' }}</v-btn>
            </v-col>
          </v-col>
        </div>

        <div class="col-md-4">
          <v-card class="p-3">
            <h3 class="dashboard-categories__subtitle border-bottom pb-1">Datos adicionales</h3>

            <div class="mt-5">
              <v-text-field
                label="Palabras clave separadas por espacio"
                v-model="keywords"
                :rules="requiredRule"
              ></v-text-field>
            </div>
          </v-card>
        </div>
      </div>
    </section>
  </v-form>
</template>

<script>
  import { mapState } from 'vuex'

  import update from '@/apollo/mutations/categories/update' // Pendiente a cambiar ruta

  export default {
    data() {
      return {
        valid: true,
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ],
        loading: false,
        titleCategoryBlog: '',
        description: '',
        keywords: ''
      }
    },
    mounted() {
      this.titleCategoryBlog = this.objectSelected.titleCategoryBlog
      this.description = this.objectSelected.description
      this.keywords = this.objectSelected.keywords
    },
    methods: {
      validate() {
        if(this.$refs.editCategoryBlog.validate()) {
          this.updateCategory()
        }
      },
      updateCategory() {
        this.loading = true

        let input = {
          id: this.objectSelected.id,
          titleCategoryBlog: this.titleCategoryBlog,
          description: this.description,
          keywords: this.keywords
        }

        this.$apollo.mutate({
          mutation: update,
          variables: {
            input
          }
        }).then((data) => {
          this.loading = false

          this.newCategoryName = ''

          this.$refs.editCategoryBlog.resetValidation()

          let alert = {
            type: 'success',
            status: true,
            message: 'Categoría actualizada.'
          }

          // Cierra modal
          this.$store.commit('setModalFullScreen', false)

          this.$store.commit('setAlert', alert)
        }).catch(error => {
          let alert = {
            type: 'error',
            status: true,
            message: 'Error al actualizar el post.'
          }

          // Cierra modal
          this.$store.commit('setModalFullScreen', false)

          this.$store.commit('setAlert', alert)
        })
      }
    },
    computed: {
      ...mapState(['objectSelected'])
    }
  }
</script>

<style scoped>

</style>
