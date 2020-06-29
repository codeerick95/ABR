<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <div class="row">
        <div class="col-md-8">
          <v-alert type="success" dense text v-if="alert.status">
            {{ alert.message }}
          </v-alert>

          <v-card outlined>
            <v-card-text>

              <div class="card-create-categories__top-action d-flex justify-content-between mb-3 py-3 border-bottom">
                <h1 class="card-create-categories__title">Crear nueva categoría para blog</h1>
              </div>

              <div class="card-body">

                <v-form
                ref="createCategoryBlog"
                v-model="valid"
                lazy-validation
                @submit.prevent="validate">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nombre de la categoría"
                        v-model="titleCategoryBlog"
                        :rules="requiredRule"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        label="Descripción corta"
                        v-model="description"
                        :rules="requiredRule"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12">
                      <v-btn color="primary" :disabled="loading ? true : false" @click="validate">{{ loading ? 'Creando...' : 'Crear categoría' }}</v-btn>
                    </v-col>
                  </v-row>
                </v-form>

              </div>
            </v-card-text>
          </v-card>
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

    </template>
  </layout>
</template>

<script>
  import { appConfig } from "@/env";

  // Components
  import Layout from '@/components/admin/Layout'

  // Queries
  import create from '@/apollo/mutations/categories/create'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        valid: true,
        titleCategoryBlog: '',
        description: '',
        keywords: '',
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
      validate() {
        if (this.$refs.createCategoryBlog.validate()) {
          this.submit()
        }
      },
      submit() {
        this.loading = true

        let CategoriaBlogInput = {
          titleCategoryBlog: this.titleCategoryBlog,
          description: this.description,
          keywords: this.keywords
        }

        this.$apollo.mutate({
          mutation: create,
          variables: {
            input: CategoriaBlogInput
          }
        })
        .then((res) => {
          // Alerta
          this.alert.status = true
          this.alert.message = `Se creó la categoría ${res.data.createCategoriaBlog.titleCategoryBlog}`

          this.titleCategoryBlog = ''
          this.description = ''

          // Resetea el form para no mostrar campo con error
          this.$refs.createCategoryBlog.resetValidation()

          this.loading = false

          this.$router.push('/admin/categorias')
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
