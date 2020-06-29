<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <div class="blog-create__content">
        <v-form
          ref="createEditor"
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
                  <h1 class="card-create-post__title">Crear nuevo editor</h1>

                  <v-btn small color="primary" to="/admin/editores">
                  <span class="material-icons">
                    table_view
                  </span>
                  </v-btn>
                </div>

                <div class="card-body">

                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        label="Nombre"
                        v-model="nameEditor"
                        :rules="requiredRule"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                      <v-text-field
                        label="Apellido paterno"
                        v-model="fatherSurnameEditor"
                        :rules="requiredRule"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                      <v-text-field
                        label="Apellido materno"
                        v-model="motherSurnameEditor"
                        :rules="requiredRule"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-select
                        :items="typeDocumentList"
                        label="Tipo de documento"
                        :rules="requiredRule"
                        v-model="typeDocumentEditor"
                      ></v-select>
                    </v-col>

                    <v-col cols="4">
                      <v-text-field
                        label="Nro. de documento"
                        v-model="numberDocumentEditor"
                        :rules="requiredRule"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                      <v-text-field
                        label="Correo electrónico"
                        v-model="email"
                        :rules="emailRules"
                      ></v-text-field>
                      <span class="text-danger" v-if="error.status">{{ error.message }}</span>
                    </v-col>
                  </v-row>

                    <v-row>
                      <v-col cols="6">
                        <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="dateBirthEditor"
                                    label="Birthday date"
                                    prepend-icon="event"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                                  ref="picker"
                                  v-model="dateBirthEditor"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  min="1950-01-01"
                                  @change="save"
                          ></v-date-picker>
                        </v-menu>

                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          label="Alias"
                          v-model="alias"
                          :rules="requiredRule"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" class="text-right">
                        <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Creando': 'Crear editor' }}</v-btn>
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
              <section class="mt-5">
                <v-file-input label="Foto para perfil" :rules="requiredRule" v-model="photoEditor" @change="setUserImage()"></v-file-input>
                <img :src="previewPhoto" alt="Vista previa de categoría" class="img-fluid" v-if="previewPhoto">
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
  import create from '@/apollo/mutations/editors/create'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        valid: true,
        typeDocumentList: [
          { value: 1, text: 'DNI'},
          { value: 2, text: 'Pasaporte'},
          { value: 3, text: 'Carnet de extranjería'},
        ],
        menu: false, // Datepicker
        email:  '',
        typeDocumentEditor: '',
        numberDocumentEditor: '',
        nameEditor:  '',
        fatherSurnameEditor:  '',
        motherSurnameEditor:  '',
        dateBirthEditor: '',
        alias: '',
        photoEditor: '',
        previewPhoto: '', // Url local para mostrar vista previa de imagen
        loading: false,
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ],
        emailRules: [
          v => !!v || 'El correo es requerido',
          v => /.+@.+\..+/.test(v) || 'El correo debe contener @',
        ],
        error: {
          status: false,
          message: ''
        }
      }
    },
    components: {
      Layout
    },
    methods: {
      setUserImage() {
        // Esta función crea una URL para poder mostrar el voucher
        if(this.photoEditor) {
          this.previewPhoto = URL.createObjectURL(this.photoEditor)
        } else {
          this.previewPhoto = ''
        }
      },
      validate () {
        if (this.$refs.createEditor.validate()) {
          this.createEditor()
        }
      },
      createEditor() {
        this.loading = true

        // Limia el error anterior
        this.error.message = ''

        let input = {
          email:  this.email,
          typeDocumentEditor: this.typeDocumentEditor,
          numberDocumentEditor: parseInt(this.numberDocumentEditor),
          nameEditor:  this.nameEditor,
          fatherSurnameEditor:  this.fatherSurnameEditor,
          motherSurnameEditor:  this.motherSurnameEditor,
          dateBirthEditor: this.dateBirthEditor,
          alias: this.alias
        }

        let photoEditor = this.photoEditor

        this.$apollo.mutate({
          mutation: create,
          variables: {
            input,
            photoEditor
          }
        }).then(data => {
          this.loading = false

          // Redirigir a lista de editores
          this.$router.push('/admin/editores')
        }).catch(error => {
          this.loading = false

          if(error.message === 'GraphQL error: Internal server error') {
            this.error.status = true
            this.error.message = 'El correo electrónico ya está registrado.'
          }
        })
      },
      clearFields() {
        this.email =  ''
        this.typeDocumentEditor = ''
        this.numberDocumentEditor = ''
        this.nameEditor =  ''
        this.fatherSurnameEditor =  ''
        this.motherSurnameEditor =  ''
        this.dateBirthEditor = ''
        this.alias = ''
        this.photoEditor = ''
        this.previewPhoto = ''
      },
      save (date) { // Para Datepicker
        this.$refs.menu.save(date)
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
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
