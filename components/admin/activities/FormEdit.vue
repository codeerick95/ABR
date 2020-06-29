<template>
  <v-form
    ref="updateActivity"
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
              <v-col cols="12">
                <v-text-field
                  label="Título de la actividad"
                  v-model="titleActivity"
                  :rules="requiredRule"
                ></v-text-field>
              </v-col>

              <v-row>
                <v-col cols="12">
                  <froala :tag="'textarea'" :config="config" v-model="textActivity"></froala>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    label="Descripción corta"
                    v-model="description"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Actualizando...': 'Actualizar actividad' }}</v-btn>
                </v-col>
              </v-row>
            </v-row>

          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Imagen y categoría -->
    <div class="col-md-4">
      <h3 class="dashboard__subtitle border-bottom p-3 bg-primary text-white my-0">Datos complementarios</h3>

      <v-card class="my-0 p-3">
        <!-- Estado de la actividad -->
        <section class="pt-5">
          <v-select
            :items="activityStateSelect"
            label="Estado del post"
            :rules="requiredRule"
            v-model="activityState"
          ></v-select>
        </section>

        <section class="mt-1">
          <span class="d-inline-block mb-3 text-muted" v-if="!newImagenDestacada">Imagen destacada actual</span>
          <img :src="previewImagenDestacada" alt="Vista previa de categoría" class="img-fluid" v-if="previewImagenDestacada">

          <v-file-input label="Imagen destacada" v-model="newImagenDestacada" @change="setPreviewImagenDestacada()" class="mt-5"></v-file-input>
        </section>

        <section class="mt-5">
          <!-- Se muestra si el usuario no ha elegido nuevas imágenes -->
          <template v-if="!newGallery">
            <span class="d-inline-block mb-3 text-muted">Galería actual</span>
            <v-row class="preview-gallery">
              <v-col cols="4" v-for="(image, index) in previewGallery" :key="index">
                <img :src="image" alt="Imagen previa" class="img-fluid">
              </v-col>
            </v-row>
          </template>

          <!-- Se muestra solo si el usuario eligió nuevas imágenes -->
          <v-row class="preview-gallery" v-else>
            <v-col cols="4" v-for="(image, index) in previewGallery" :key="index">
              <img :src="image.url" alt="Imagen previa" class="img-fluid">
            </v-col>
          </v-row>

          <v-file-input label="Gallería de imágenes" multiple v-model="newGallery" @change="setGallery()" class="mt-5"></v-file-input>

          <div class="mt-5">
            <div class="mt-5">
              <v-text-field
                label="Palabras clave separadas por espacio"
                v-model="keywords"
                :rules="requiredRule"
              ></v-text-field>
            </div>
          </div>
        </section>
      </v-card>
    </div>
  </v-form>
</template>

<script>
  import { mapState } from 'vuex'

  // Mutations
  import update from '@/apollo/mutations/activities/update'

  export default {
    data() {
      return {
        valid: true,
        id: '',
        titleActivity: '',
        textActivity: 'Cargando...',
        description: '',
        keywords: '',
        imagenDestacada: '',
        previewImagenDestacada: '', // Url local para mostrar vista previa de imagen
        newImagenDestacada: '',
        gallery: '',
        previewGallery: [],
        newGallery: '',
        user_id: '', // Convertir a float,
        activityStateSelect: [
          {
            value: '0',
            text: 'Borrador'
          },
          {
            value: '1',
            text: 'Publicar'
          },
        ],
        activityState: '',
        config: {
          language: 'es',
          toolbarButtons: [
            ['undo',
              'redo',
              'bold',
              'fontSize',
              'fontFamily',
              'textColor',
              'paragraphFormat',
              'backgroundColor',
              'alignLeft',
              'alignCenter',
              'alignRight',
              'quote',
              'insertImage',
              'insertVideo',
              'clearFormatting',
              'insertTable',
              'formatOLSimple',
              'fontAwesome',
              'fullscreen',
            ]
          ]
        },
        loading: false,
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ]
      }
    },
    mounted() {
      if(this.objectSelected) {
        this.id = this.objectSelected.id
        this.titleActivity = this.objectSelected.titleActivity
        this.imagenDestacada = this.objectSelected.imagenDestacada
        this.gallery = this.objectSelected.galleryActivity
        this.description = this.objectSelected.description
        this.keywords = this.objectSelected.keywords
        this.activityState = this.objectSelected.estado.toString()

        this.previewImagenDestacada = this.objectSelected.imagenDestacada
        this.previewGallery = this.objectSelected.galleryActivity

        setTimeout(() => {
          this.textActivity = this.objectSelected.textActivity
        }, 2000)
      }
    },
    methods: {
      setPreviewImagenDestacada() {
        // Esta función crea una URL para poder mostrar el voucher
        if(this.newImagenDestacada) {
          this.previewImagenDestacada = URL.createObjectURL(this.newImagenDestacada)
        } else {
          this.previewImagenDestacada = ''
        }
      },
      setGallery() {
        this.previewGallery = []

        let images = this.newGallery

        images.forEach(file => {
          let image = {
            url: URL.createObjectURL(file)
          }

          this.previewGallery.push(image)
        })
      },
      validate () {
        if (this.$refs.updateActivity.validate()) {
          this.updateActivity()
        }
      },
      updateActivity() {
        this.loading = true

        let input = {
          id: this.id,
          titleActivity: this.titleActivity,
          textActivity: this.textActivity,
          categoryActivity_id: 1, // Por el momento es estático
          description: this.description,
          keywords: this.keywords,
          estado: parseInt(this.activityState)
        }

        let imagenDestacada = ''

        // Si el usuario eligió una nueva imagen
        if(this.newImagenDestacada) {
           imagenDestacada = this.newImagenDestacada
        } else {
          imagenDestacada = null // Si no se envía null para que no de error, así está configurado el backend
        }

        // Verifica si el usuario cambió las imágenes
        let galleryActivity

        if(this.newGallery) {
          galleryActivity = this.newGallery
        } else {
          galleryActivity = null // Se envía null para que no de error, así está configurado el backend
        }

        this.$apollo.mutate({
          mutation: update,
          variables: {
            input,
            imagenDestacada,
            galleryActivity
          }
        }).then(data => {
          this.loading = false

          this.$store.commit('setModalFullScreen', false)

          this.loading = false

          let alert = {
            type: 'success',
            status: true,
            message: 'La actividad fue editada.'
          }

          this.$store.commit('setAlert', alert)
        }).catch(error => {
          this.$store.commit('setModalFullScreen', false)

          this.loading = false

          let alert = {
            type: 'success',
            status: true,
            message: 'Ocurrió un error, inténtelo nuevamente.'
          }

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
