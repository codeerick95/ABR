<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <div class="publication-create__content">
        <v-form
          ref="createPublication"
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
                  <h1 class="publication-create__card-title">Crear nueva publicación</h1>

                  <v-btn small color="primary" to="/admin/categorias-publicaciones">
                  <span class="material-icons">
                    table_view
                  </span>
                  </v-btn>
                </div>

                <div class="card-body">

                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Título de la publicación"
                        v-model="titlePublication"
                        :rules="requiredRule"
                      ></v-text-field>
                    </v-col>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          label="Descripción de la publicación"
                          v-model="descriptionPublication"
                          :rules="requiredRule"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12" class="text-right">
                        <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Creando': 'Crear publicación' }}</v-btn>
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
              <!-- Estado de la publicación -->
              <section class="pt-5">
                <v-select
                  :items="publicationStateSelect"
                  label="Estado de publicación"
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
                <v-file-input label="Archivo a descargar" :rules="requiredRule" v-model="filePublication"></v-file-input>
              </section>

              <section class="mt-5">
                <v-file-input label="Imagen destacada" :rules="requiredRule" v-model="imagePublication" @change="setPublicationImage()"></v-file-input>

                <!-- Vista previa -->
                <img :src="urlImagePublication" alt="Voucher" class="img-fluid" v-if="urlImagePublication">
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

  // Mutations
  import create from '@/apollo/mutations/publications/create'

  // Query
  import all from '@/apollo/queries/publications/categories/all'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        valid: true,
        config: {
          events: {
            'froalaEditor.initialized': function () {
              console.log('initialized')
            }
          }
        },
        loading: false,
        requiredRule: [
          v => !!v || 'La contraseña es requerida',
        ],
        categories: [],
        titlePublication: '',
        descriptionPublication: '',
        filePublication: '',
        imagePublication: '',
        urlImagePublication: '',
        categoryPublication_id: '',
        user_id: 2,
        publicationStateSelect: [
          {
            value: '0',
            text: 'Borrador'
          },
          {
            value: '1',
            text: 'Publicar'
          },
        ],
        publicationState: '',
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
        }).then(response => {
          let itemsResult = []

          response.data.categoria_publicaciones.forEach(item => {
              let itemResult = {
                value: item.id,
                text: item.nameCategoryPublication
              }

              itemsResult.push(itemResult)
          })

          this.categories = itemsResult
        })
      },
      setPublicationImage() {
        // Esta función crea una URL para poder mostrar el voucher
        if(this.imagePublication) {
          this.urlImagePublication = URL.createObjectURL(this.imagePublication)
        } else {
          this.urlImagePublication = ''
        }
      },
      validate () {
        if (this.$refs.createPublication.validate()) {
          this.createPublication()
        }
      },
      createPublication() {
        this.loading = true

        let input = {
          titlePublication: this.titlePublication,
          descriptionPublication: this.descriptionPublication,
          categoryPublication_id: parseInt(this.categoryPublication_id),
          estado: parseInt(this.publicationState)
        }

        let file1 = this.filePublication,
          file2 = this.imagePublication

        this.$apollo.mutate({
          mutation: create,
          variables: {
            input,
            file1,
            file2
          }
        }).then(() => {
          this.loading = false

          // Redirigir a lista de posts
          this.$router.push('/admin/categorias-publicaciones')
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../scss/variables";

  .publication-create__card-title {
    font-size: 1.2em;
    font-weight: 700;
    color: $dark;
  }
</style>
