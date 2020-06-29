<template>
  <div v-model="modalFullScreen">
    <v-form
      ref="editPost"
      v-model="valid"
      lazy-validation
      @submit.prevent="validate"
      class="row">
      <div class="col-md-8">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Título del post"
              v-model="titleBlog"
              :rules="requiredRule"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <froala :tag="'textarea'" :config="config" v-model="textBlog">
            </froala>
          </v-col>

          <v-col cols="12">
            <v-textarea
              label="Descripción corta"
              v-model="description"
            ></v-textarea>
          </v-col>

          <v-col cols="12" class="text-right">
            <v-btn color="primary" :disabled="loading ?  true : false" @click="validate">{{ loading ?  'Guardando...' : 'Guardar' }}</v-btn>
          </v-col>

        </v-row>
      </div>

      <!-- Imagen y categoría -->
      <div class="col-md-4">
        <h3 class="dashboard__subtitle border-bottom p-3 bg-primary text-white my-0">Datos complementarios</h3>

        <v-card class="my-0 p-3">
          <section class="pt-5">
            <v-select
              :items="postStateSelect"
              label="Estado del post"
              :rules="requiredRule"
              v-model="postState"
            ></v-select>
          </section>

          <section class="pt-5">
            <v-select
              :items="categories"
              label="Categoría"
              :rules="requiredRule"
              v-model="categoryBlog_id"
            ></v-select>
          </section>

          <section>
            <div class="mt-5">
              <span class="d-inline-block mb-3 text-muted" v-if="!newImageBlog">Imagen destacada actual</span>
              <img :src="previewImageBlog" alt="Vista previa de categoría" class="img-fluid" v-if="previewImageBlog">

              <v-file-input label="Imagen destacada" v-model="newImageBlog" @change="setPreviewImageBlog()" class="mt-5"></v-file-input>
            </div>

            <div class="mt-5">
              <span class="d-inline-block mb-3 text-muted" v-if="!newImageBlogMiniature">Imagen para miniatura</span>
              <img :src="previewBlogMiniature" alt="Vista previa de categoría" class="img-fluid" v-if="previewBlogMiniature">

              <v-file-input label="Imagen de presentación" v-model="newImageBlogMiniature" @change="setPreviewBlogMiniature()" class="mt-5"></v-file-input>
            </div>

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
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  // Mutations
  import update from '@/apollo/mutations/blog/update'

  // Query
  import all from '@/apollo/queries/blog/categories/all'

  export default {
    data() {
      return {
        valid: true,
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ],
        loading: false,
        categoryBlog_id: '',
        titleBlog: '',
        textBlog: 'Cargando contenido...',
        imageBlog: '',
        newImageBlog: '',
        previewImageBlog: '',
        imageBlogMiniature: '',
        newImageBlogMiniature: '',
        previewBlogMiniature: '',
        description: '',
        keywords: '',
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
        categories: [],
        postStateSelect: [
          {
            value: '0',
            text: 'Borrador'
          },
          {
            value: '1',
            text: 'Publicar'
          }
        ],
        postState: '',
      }
    },
    mounted() {
      this.$refs.editPost.resetValidation()

      this.getCategories()

      if(this.objectSelected) {
        this.id = this.objectSelected.id
        this.categoryBlog_id = this.objectSelected.categoryBlog_id
        this.titleBlog = this.objectSelected.titleBlog
        this.imageBlog = this.objectSelected.imageBlog
        this.description = this.objectSelected.description
        this.keywords = this.objectSelected.keywords
        this.postState = this.objectSelected.estado.toString()

        this.previewImageBlog = this.objectSelected.imageBlog
        this.previewBlogMiniature = this.objectSelected.imageBlogMiniature

        /* El setTimeOut es importante ya que hace esperar para que se renderice la info
          de lo contrario daría error */
        setTimeout(() => {
          this.textBlog = this.objectSelected.textBlog
        }, 2000)
      }
    },
    methods: {
      setPreviewBlogMiniature() {
        // Esta función crea una URL para poder mostrar el voucher
        if(this.newImageBlogMiniature) {
          this.previewBlogMiniature = URL.createObjectURL(this.newImageBlogMiniature)
        } else {
          this.previewBlogMiniature = ''
        }
      },
      setPreviewImageBlog() {
        // Esta función crea una URL para poder mostrar el voucher
        if(this.newImageBlog) {
          this.previewImageBlog = URL.createObjectURL(this.newImageBlog)
        } else {
          this.previewImageBlog = ''
        }
      },
      validate() {
        // Valida si el formulario está completo
        if(this.$refs.editPost.validate()) {
          this.updatePost()
        }
      },
      getCategories() {
        this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache'
        })
          .then(response => {
            let itemsResult = []

            // Se recorre el array para formar uno nuevo que sea entendido por el select
            response.data.categorias_blog.forEach(item => {
              let itemResult = {
                value: item.id,
                text: item.titleCategoryBlog
              }

              itemsResult.push(itemResult)
            })

            // Asigna las categorías a mostrar
            this.categories = itemsResult

            // Se asigna la categoría anterior
            this.categoryBlog_id = this.objectSelected.categoryBlog_id.toString()
          })
      },
      updatePost() {
        this.loading = true

        let input = {
          id: this.objectSelected.id,
          titleBlog: this.titleBlog,
          textBlog: this.textBlog,
          categoryBlog_id: this.categoryBlog_id,
          description: this.description,
          keywords: this.keywords,
          estado: parseInt(this.postState)
        }

        let imageBlog = ''

        // Si el usuario eligió una nueva imagen
        if(this.newImageBlog) {
          imageBlog = this.newImageBlog
        } else {
          imageBlog = null // Si no se envía null para que no de error, así está configurado el backend
        }

        let imageBlogMiniature = ''

        // Si el usuario eligió una nueva imagen miniatura
        if(this.newImageBlogMiniature) {
          imageBlogMiniature = this.newImageBlogMiniature
        } else {
          imageBlogMiniature = null // Si no se envía null para que no de error, así está configurado el backend
        }

        this.$apollo.mutate({
          mutation: update,
          variables: {
            input,
            imageBlog,
            imageBlogMiniature
          }
        }).then((data) => {

          this.loading = false

          let alert = {
            type: 'success',
            status: true,
            message: 'Post actualizado correctamente.'
          }

          // Cierra modal
          this.$store.commit('setModalFullScreen', false)

          this.$store.commit('setAlert', alert)
        }).catch(() => {

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
      ...mapState(['modalFullScreen', 'objectSelected'])
    }
  }
</script>

<style scoped>

</style>
