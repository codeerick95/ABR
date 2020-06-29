<template>
  <v-form
    ref="editCategoryBlog"
    v-model="valid"
    lazy-validation
    @submit.prevent="validate"
    class="form-update-category-publication"
    >
    <v-row>
      <v-col cols="8" class="d-flex align-items-center">
        <v-text-field
          label="Nuevo nombre"
          v-model="newCategoryName"
          :rules="requiredRule"
        ></v-text-field>
      </v-col>

      <v-col cols="4">
        <section class="mt-5 d-flex flex-column justify-content-center">
          <span class="d-inline-block mb-3 text-muted">Imagen destacada actual</span>
          <img :src="previewImage" alt="Imagen previa" class="form-update-category-publication__image" v-if="previewImage">

          <v-file-input label="Nueva imagen destacada" v-model="newImageBlog" @change="setImage()" class="mt-5"></v-file-input>
        </section>
      </v-col>

      <v-col cols="12" class="text-right">
        <v-btn color="primary" :disabled="loading ?  true : false" @click="validate">{{ loading ?  'Guardando...' : 'Guardar' }}</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  import { mapState } from 'vuex'

  import update from '@/apollo/mutations/publications/categories/update'

  export default {
    data() {
      return {
        valid: true,
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ],
        loading: false,
        newCategoryName: '',
        newImageBlog: '',
        previewImage: ''
      }
    },
    mounted() {
      this.newCategoryName = this.objectSelected.nameCategoryPublication
      this.previewImage = this.objectSelected.photoCategoryPublication
    },
    methods: {
      setImage() {
        this.previewImage = URL.createObjectURL(this.newImageBlog)
      },
      validate() {
        if(this.$refs.editCategoryBlog.validate()) {
          this.updateCategory()
        }
      },
      updateCategory() {
        this.loading = true

        let input = {
          id: this.objectSelected.id,
          nameCategoryPublication: this.newCategoryName
        }

        let photoCategoryPublication = ''

        // Si el usuario eligió una nueva imagen
        if(this.newImageBlog) {
          photoCategoryPublication = this.newImageBlog
        } else {
          photoCategoryPublication = null // Si no se envía null para que no de error, así está configurado el backend
        }

        this.$apollo.mutate({
          mutation: update,
          variables: {
            input,
            photoCategoryPublication
          }
        }).then(data => {
          this.loading = false

          this.newCategoryName = ''

          this.$refs.editCategoryBlog.resetValidation()

          // Se emite este evento para cerrar el modal
          this.$emit('updated')
        }).catch(error => this.loading = false)
      }
    },
    computed: {
      ...mapState(['objectSelected'])
    }
  }
</script>

<style lang="scss">
.form-update-category-publication {
  &__image {
    width: 90%;
    height: 200px;

    display: inline-block;

    margin: 0 auto;

  }
}
</style>
