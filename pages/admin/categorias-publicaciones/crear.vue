<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <v-form
        ref="createCategoryPublication"
        v-model="valid"
        lazy-validation
        @submit.prevent="validate">

        <div class="row">
        <div class="col-md-8">
          <v-alert type="success" dense text v-if="alert.status">
            {{ alert.message }}
          </v-alert>

          <v-card outlined>
            <v-card-text>

              <div class="card-create-categories__top-action d-flex justify-content-between mb-3 py-3 border-bottom">
                <h1 class="card-create-categories__title">Crear nueva categoría para publicaciones</h1>

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
                        label="Nombre de la categoría"
                        v-model="nameCategoryPublication"
                        :rules="requiredRule"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-btn color="primary" :disabled="loading ? true : false" @click="validate">{{ loading ? 'Creando...' : 'Crear categoría' }}</v-btn>
                    </v-col>
                  </v-row>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-md-4">
          <v-card class="p-3">
            <section class="mt-5">
              <v-file-input label="Imagen destacada" :rules="requiredRule" v-model="photoCategoryPublication" @change="setCategoryImage()"></v-file-input>
              <img :src="urlImagePublication" alt="Voucher" class="img-fluid" v-if="urlImagePublication">
            </section>
          </v-card>
        </div>

      </div>

      </v-form>

    </template>
  </layout>
</template>

<script>
  import { appConfig } from "@/env";

  // Components
  import Layout from '@/components/admin/Layout'

  // Queries
  import create from '@/apollo/mutations/publications/categories/create'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        valid: true,
        nameCategoryPublication: '',
        photoCategoryPublication: '',
        urlImagePublication: '',
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ],
        loading: false,
        alert: {
          status: false,
          message: ''
        }
      }
    },
    components: {
      Layout
    },
    methods: {
      setCategoryImage() {
        this.urlImagePublication = URL.createObjectURL(this.photoCategoryPublication)
      },
      validate() {
        if (this.$refs.createCategoryPublication.validate()) {
          this.submit()
        }
      },
      submit() {
        this.loading = true

        let CategoriaBlogInput = {
          nameCategoryPublication: this.nameCategoryPublication
        }

        let photoCategoryPublication = this.photoCategoryPublication

        this.$apollo.mutate({
          mutation: create,
          variables: {
            input: CategoriaBlogInput,
            file: photoCategoryPublication
          }
        })
          .then((res) => {
            // Alerta
            this.alert.status = true
            this.alert.message = `Se creó la categoría ${res.data.createCategoriaPublicaciones.nameCategoryPublication}`

            this.nameCategoryPublication = ''
            this.photoCategoryPublication = ''
            this.urlImagePublication = ''

            // Resetea el form para no mostrar campo con error
            this.$refs.createCategoryPublication.resetValidation()

            this.loading = false
          }).catch(() => {
            this.loading = false

            // Alerta
            this.alert.status = true
            this.alert.message = `Ocurrió un error, inténtelo nuevamente.`
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../scss/variables";

  .card-create-categories__title {
    font-size: 1.2em;
    font-weight: 700;
    color: $dark;
  }

  .dashboard-categories__subtitle {
    font-size: 1em;
    color: $dark;
  }
</style>
