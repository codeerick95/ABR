<template>
  <v-form
    ref="updatePublication"
    v-model="valid"
    lazy-validation
    @submit.prevent="validate"
    class="row"
  >
    <!-- Título y contenido -->
    <div class="col-md-8">
      <v-card outlined>
        <v-card-text>

          <div class="card-body">

            <v-row>
              <v-col cols="12" class="p-0">
                <v-text-field
                  label="Título de la publicación"
                  v-model="titlePublication"
                  :rules="requiredRule"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="p-1">
                <v-textarea
                  label="Descripción de la publicación"
                  v-model="descriptionPublication"
                  :rules="requiredRule"
                ></v-textarea>
              </v-col>

              <v-col cols="12" class="text-right">
                <!-- Botones -->
                <v-btn
                  color="error"
                  text
                  @click="cancel()"
                >
                  Cancelar
                </v-btn>

                <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Actualizando...': 'Actualizar publicación' }}</v-btn>
              </v-col>
            </v-row>

          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Imagen y categoría -->
    <div class="col-md-4">
      <h3 class="dashboard__subtitle border-bottom p-3 bg-primary text-white my-0">Datos complementarios</h3>

      <v-card class="my-0 p-3">
        <section class="pt-5">
          <v-select
            :items="publicationStateSelect"
            label="Estado del post"
            :rules="requiredRule"
            v-model="publicationState"
          ></v-select>
        </section>

        <section class="pt-5">
          <v-select
            :items="categories"
            label="Categoría"
            :rules="requiredRule"
            v-model="categoryPublication_id"
            v-if="categories"
          ></v-select>
        </section>

        <section class="mt-5">
          <a :href="publicationSelected.filePublication" target="_blank" class="d-inline-block ml-3 mb-3" v-if="!filePublication">Ver actual archivo</a>
          <v-file-input label="Archivo a descargar" v-model="filePublication"></v-file-input>
        </section>

        <section class="mt-5 w-100 ">
          <span class="update-pulication__label text-muted mb-3" v-if="!imagePublication">Imagen descatacada actual</span>

          <div class="text-center">
            <img :src="previewImagePublication" alt="Voucher" class="update-publication__preview-image" v-if="previewImagePublication">
          </div>

          <v-file-input label="Imagen destacada" v-model="imagePublication" @change="setPublicationImage()" class="mt-5"></v-file-input>
        </section>

      </v-card>
    </div>
  </v-form>
</template>

<script>
  import { mapState } from 'vuex'

  // Query
  import all from '@/apollo/queries/publications/categories/all'

  // Mutations
  import update from '@/apollo/mutations/publications/update'

  export default {
    data() {
      return {
        valid: true,
        loading: false,
        requiredRule: [
          v => !!v || 'La contraseña es requerida',
        ],
        publicationId: '',
        titlePublication: '',
        descriptionPublication: '',
        filePublication: '',
        imagePublication: '',
        previewImagePublication: '',
        categoryPublication_id: '',
        categories: [],
        publicationStateSelect: [
          {
            value: '0',
            text: 'Borrador'
          },
          {
            value: '1',
            text: 'Publicar'
          }
        ],
        publicationState: ''
      }
    },
    mounted() {
      this.getCategories()

      // Asigna datos anteriores
      this.publicationId = this.publicationSelected.id
      this.categoryPublication_id = this.publicationSelected.categoryPublication_id
      this.titlePublication = this.publicationSelected.titlePublication
      this.descriptionPublication = this.publicationSelected.descriptionPublication
      this.previewImagePublication = this.publicationSelected.imagePublication
      this.publicationState = this.publicationSelected.estado.toString()
    },
    methods: {
      setPublicationImage() {
        if(this.imagePublication) {
          this.previewImagePublication = URL.createObjectURL(this.imagePublication)
        } else {
          this.previewImagePublication = ''
        }
      },
      getCategories() {
        this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache'
        }).then(response => {
          let itemsResult = []

          response.data.categoria_publicaciones.forEach(item => {
            let itemResult = {
              value: item.id,
              text: item.nameCategoryPublication
            }

            itemsResult.push(itemResult)
          })

          // Asigna la lista transformada
          this.categories = itemsResult

          // Asigna la categoría anterior
          this.categoryPublication_id = this.publicationSelected.categoryPublication_id.toString()
        })
      },
      validate() {
        if (this.$refs.updatePublication.validate()) {
          this.update()
        }
      },
      update() {
        this.loading = true

        let input = {
          id: this.publicationId,
          titlePublication: this.titlePublication,
          descriptionPublication: this.descriptionPublication,
          categoryPublication_id: parseInt(this.categoryPublication_id),
          estado: parseInt(this.publicationState)
        }

        let filePublication,
          imagePublication

        // valida si el usuario eligió una nueva imagen
        if(this.imagePublication) {
          imagePublication = this.imagePublication
        } else {
          imagePublication = null // Enviamos null para que no actualice la publicación
        }

        // Valida si el usuario eligió un nuevo archivo
        if(this.filePublication) {
          filePublication = this.filePublication
        } else {
          filePublication = null // Enviamos null para que no actualice la publicación
        }

        this.$apollo.mutate({
          mutation: update,
          variables: {
            input,
            imagePublication,
            filePublication
          }
        })
          .then(() => {
            this.$emit('updated')
            this.$store.commit('setModalEditPublications', false)

            this.loading = false
          })
          .catch(error => {
            alert('Ocurrió un error')
            this.loading = false
          })
      },
      cancel() {
        this.$emit('cancel')
        this.$store.commit('setModalEditPublications', false)
        this.$store.commit('setPublicationSelected', {})
      }
    },
    computed: {
      ...mapState(['modalEditPublications', 'publicationSelected'])
    }
  }
</script>

<style lang="scss">
.update-pulication__label {
  display: inline-block;
  font-size: 1em;
}
  .update-publication__preview-image {
    width: 90%;
  }
</style>
