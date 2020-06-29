<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <div class="blog-create__content">
        <v-form
          ref="createActivity"
          v-model="valid"
          lazy-validation
          @submit.prevent="validate"
          class="row"
        >
          <!-- Título y contenido -->
          <div class="col-md-8">
            <v-card outlined>
              <v-card-text>

                <div class="card-create-post__top-action d-flex justify-content-between mb-3 py-3 border-bottom">
                  <h1 class="card-create-post__title">Crear nueva actividad</h1>

                  <v-btn small color="primary" to="/admin/blog">
                      <span class="material-icons">
                        table_view
                      </span>
                  </v-btn>
                </div>

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
                        <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Creando': 'Crear actividad' }}</v-btn>
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
                  label="Estado de actividad"
                  :rules="requiredRule"
                  v-model="activityState"
                ></v-select>
              </section>

              <section class="mt-5">
                <v-file-input label="Imagen destacada" :rules="requiredRule" v-model="imagenDestacada" @change="setPreviewImagenDestacada()"></v-file-input>
                <img :src="previewImagenDestacada" alt="Vista previa de categoría" class="img-fluid" v-if="previewImagenDestacada">
              </section>

              <section class="mt-5">
                <v-file-input label="Gallería de imágenes" multiple :rules="requiredRule" v-model="gallery" @change="setGallery()"></v-file-input>
                <v-row class="preview-gallery" v-if="previewGallery.length">
                  <v-col cols="4" v-for="(image, index) in previewGallery" :key="index">
                    <img :src="image.url" alt="Imagen previa" class="img-fluid">
                  </v-col>
                </v-row>
              </section>

              <div class="mt-5">
                <div class="mt-5">
                  <v-text-field
                    label="Palabras clave separadas por espacio"
                    v-model="keywords"
                    :rules="requiredRule"
                  ></v-text-field>
                </div>
              </div>
            </v-card>
          </div>
        </v-form>
      </div>
    </template>
  </layout>
</template>

<script>
  // Components
  import Layout from '@/components/admin/Layout'

  // Mutations
  import create from '@/apollo/mutations/activities/create'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        valid: true,
        titleActivity: '',
        textActivity: '',
        imagenDestacada: '',
        previewImagenDestacada: '', // Url local para mostrar vista previa de imagen
        gallery: '',
        previewGallery: [],
        user_id: '', // Convertir a float,
        description: '',
        keywords: '',
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
        config: { // Configuración del textarea editor
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
    components: {
      Layout
    },
    methods: {
      setPreviewImagenDestacada() {
        // Esta función crea una URL para poder mostrar el voucher
        if(this.imagenDestacada) {
          this.previewImagenDestacada = URL.createObjectURL(this.imagenDestacada)
        } else {
          this.previewImagenDestacada = ''
        }
      },
      setGallery() {
        this.previewGallery = []

        let images = this.gallery

        images.forEach(file => {
          let image = {
            url: URL.createObjectURL(file)
          }

          this.previewGallery.push(image)
        })
      },
      validate () {
        if (this.$refs.createActivity.validate()) {
          this.createActivity()
        }
      },
      createActivity() {
        this.loading = true

        let input = {
          titleActivity: this.titleActivity,
          textActivity: this.textActivity,
          categoryActivity_id: 1, // Por el momento es estático
          description: this.description,
          keywords: this.keywords,
          estado: this.activityState
        }

        let imagenDestacada = this.imagenDestacada,
            galleryActivity = this.gallery

        this.$apollo.mutate({
          mutation: create,
          variables: {
            input,
            imagenDestacada,
            galleryActivity
          }
        }).then(data => {
          this.loading = false

          // Redirigir a lista de posts
          this.$router.push('/admin/actividades')
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../scss/variables";

  .card-create-post__title {
    font-size: 1.2em;
    font-weight: 700;
    color: $dark;
  }
</style>
