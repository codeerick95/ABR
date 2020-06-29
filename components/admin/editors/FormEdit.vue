<template>
  <div>
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
              <h1 class="card-create-post__title">Editar datos de usuario</h1>

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
                    label="Número de documento"
                    v-model="numberDocumentEditor"
                    :rules="requiredRule"
                  ></v-text-field>
                </v-col>

                <v-col cols="4">
                  <v-text-field
                    label="Correo electrónico"
                    v-model="email"
                    :rules="requiredRule"
                  ></v-text-field>
                  <span class="text-danger" v-if="error.status">{{ error.message }}</span>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateBirthEditor"
                        label="Fecha de nacimiento"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateBirthEditor" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    label="Nombre de usuario"
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

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        valid: true,
        typeDocumentList: [
          { value: 1, text: 'DNI'},
          { value: 2, text: 'Pasaporte'},
          { value: 3, text: 'Carnet de extranjería'},
        ],
        menu: false,
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
        error: {
          status: false,
          message: ''
        }
      }
    },
    computed: {
      ...mapState(['modalFullScreen', 'objectSelected'])
    },
    methods: {
      setUser() {
        return this.objectSelected
      },
      closeModalCategoryEdit() {
        this.$store.commit('setModalFullScreen', false)
      },
      updated() {
        this.closeModalCategoryEdit()
        this.$emit('showAlert', 'Datos actualizados')
      },
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
    }
  }
</script>

<style scoped>
  .update-user__title {
    font-size: 2em;
    font-weight: 700;
  }
  .update-user__content {
    margin-top: 1em;
  }
</style>
