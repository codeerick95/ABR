<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <div class="blog-create__content">
          <v-form
            ref="createPost"
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
                    <h1 class="card-create-post__title">Crear nuevo post</h1>

                    <v-btn small color="primary" v-b-tooltip.hover title="Ver posts" class="text-decoration-none" to="/admin/blog">
                      <span class="material-icons">
                        table_view
                      </span>
                    </v-btn>
                  </div>

                  <div class="card-body">

                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Título del post"
                            v-model="titleBlog"
                            :rules="requiredRule"
                          ></v-text-field>
                        </v-col>

                        <v-row>
                          <v-col cols="12">
                            <froala :tag="'textarea'" :config="config" v-model="textBlog"></froala>
                          </v-col>

                          <v-col cols="12">
                            <v-textarea
                              label="Descripción corta"
                              v-model="description"
                            ></v-textarea>
                          </v-col>

                          <v-col cols="12" class="text-right">
                            <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Creando': 'Crear post' }}</v-btn>
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

                <!-- Estado del post -->
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


                <section class="mt-5">
                  <div class="mt-5">
                    <v-file-input label="Imagen destacada" :rules="requiredRule" v-model="imageBlog" @change="setPreviewImageBlog()"></v-file-input>
                    <img :src="previewImageBlog" alt="Vista previa de categoría" class="img-fluid" v-if="previewImageBlog">
                  </div>

                  <div>
                    <v-file-input label="Imagen para miniatura" :rules="requiredRule" v-model="imageBlogMiniature" @change="setPreviewBlogMiniature()"></v-file-input>
                    <img :src="previewBlogMiniature" alt="Vista previa de categoría" class="img-fluid" v-if="previewBlogMiniature">
                  </div>

                  <div class="mt-5">
                    <v-text-field
                      label="Palabras clave separadas por espacio"
                      v-model="keywords"
                      :rules="requiredRule"
                    ></v-text-field>
                  </div>
                </section>
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

  // Query
  import all from '@/apollo/queries/blog/categories/all'

  // Mutations
  import create from '@/apollo/mutations/blog/create'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        valid: true,
        categories: [],
        titleBlog: '',
        textBlog: '',
        imageBlog: '',
        previewImageBlog: '', // Url local para mostrar vista previa de imagen,
        imageBlogMiniature: '',
        previewBlogMiniature: '',
        categoryBlog_id: '', // Convertir a float
        user_id: '', // Convertir a float,
        keywords: '',
        description: '',
        loading: false,
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ],
        postStateSelect: [
          {
            value: '0',
            text: 'Borrador'
          },
          {
            value: '1',
            text: 'Publicar'
          },
        ],
        postState: '',
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
        }
      }
    },
    mounted() {
      this.getCategories()
    },
    components: {
      Layout
    },
    methods: {
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

          this.categories = itemsResult
        })
      },
      setPreviewImageBlog() {
        // Esta función crea una URL para poder mostrar el voucher
        if(this.imageBlog) {
          this.previewImageBlog = URL.createObjectURL(this.imageBlog)
        } else {
          this.previewImageBlog = ''
        }
      },
      setPreviewBlogMiniature() {
        // Esta función crea una URL para poder mostrar el voucher
        if(this.imageBlogMiniature) {
          this.previewBlogMiniature = URL.createObjectURL(this.imageBlogMiniature)
        } else {
          this.previewBlogMiniature = ''
        }
      },
      validate () {
        if (this.$refs.createPost.validate()) {
          this.createPost()
        }
      },
      createPost() {
        this.loading = true

        let input = {
          titleBlog: this.titleBlog,
          textBlog: this.textBlog,
          categoryBlog_id: this.categoryBlog_id,
          keywords: this.keywords,
          description: this.description,
          estado: parseInt(this.postState)
        }

        let imageBlog = this.imageBlog,
          imageBlogMiniature = this.imageBlogMiniature

        this.$apollo.mutate({
          mutation: create,
          variables: {
            input,
            imageBlog,
            imageBlogMiniature
          }
        }).then(data => {
          this.loading = false

          // Redirigir a lista de posts
          this.$router.push('/admin/blog')

          let alert = {
            type: 'success',
            status: true,
            message: 'El post se creó correctamente'
          }

          this.$store.commit('setAlert', alert)
        }).catch(error => {
          this.loading = false
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
