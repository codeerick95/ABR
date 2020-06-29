<!-- Formulario para editar datos de editores -->

<template>
<div>
  <v-form
    ref="updateEditor"
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
            <h1 class="card-edit-post__title">{{ objectSelected.nameEditor }}</h1>
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
                  disabled
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
                <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Actualizando': 'Actualizar' }}</v-btn>
              </v-col>
            </v-row>

          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Imagen -->
    <div class="col-md-4">
      <h3 class="dashboard__subtitle border-bottom p-3 bg-primary text-white my-0">Datos complementarios</h3>

      <v-card class="my-0 p-3">
        <section class="mt-5">

          <template v-if="!previewPhoto">
            <span class="d-inline-block mb-3 text-muted">Imagen destacada actual</span>
            {{ photoEditor }}
            <div class="d-flex justify-content-center">
              <img :src="photoEditor" alt="" class="img-rounded">
            </div>
          </template>

          <v-file-input label="Foto para perfil" v-model="photoEditor" @change="setUserImage()"></v-file-input>
          <img :src="previewPhoto" alt="Vista previa de categoría" class="img-fluid" v-if="previewPhoto">
        </section>
      </v-card>
    </div>
  </v-form>
</div>
</template>

<script>
  import { mapState } from 'vuex'

  // Mutations
  import update from '@/apollo/mutations/editors/update'

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
        id: '',
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
    mounted() {
      this.setData()
    },
    computed: {
      ...mapState(['modalFullScreen', 'objectSelected'])
    },
    methods: {
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
        if (this.$refs.updateEditor.validate()) {
          this.update()
        }
      },
      setData() {
          this.id = this.objectSelected.id
          this.email = this.objectSelected.email
          this.typeDocumentEditor = this.objectSelected.typeDocumentEditor
          this.numberDocumentEditor = this.objectSelected.numberDocumentEditor
          this.nameEditor = this.objectSelected.nameEditor
          this.fatherSurnameEditor= this.objectSelected.fatherSurnameEditor
          this.motherSurnameEditor= this.objectSelected.motherSurnameEditor
          this.dateBirthEditor= this.objectSelected.dateBirthEditor
          this.alias= this.objectSelected.alias
          this.previewPhoto = this.objectSelected.photoEditor
      },
      update() {
        this.loading = true

        let date = this.$moment(this.dateBirthEditor).format('YYYY-MM-DD')

        let input = {
          id: parseInt(this.id),
          email: this.email,
          typeDocumentEditor: this.typeDocumentEditor,
          numberDocumentEditor: this.numberDocumentEditor,
          nameEditor: this.nameEditor,
          fatherSurnameEditor: this.fatherSurnameEditor,
          motherSurnameEditor: this.motherSurnameEditor,
          dateBirthEditor: date,
          alias: this.alias
        }

        let photoEditor

        if(this.photoEditor) {
          photoEditor = this.photoEditor
        } else {
          photoEditor = null
        }

        this.$apollo.mutate({
          mutation: update,
          variables: {
            input,
            photoEditor
          }
        })
        .then(response => {
          this.$emit('updated')

          this.loading = false
        })
        .catch(error => this.loading = false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../scss/variables';

  .img-rounded {
    width: 150px;
    height: 150px;
    display: inline-block;
    margin-bottom: 2rem;
    border-radius: .3rem;
  }

  .card-edit-post__title {
    font-size: 1.5em;
    font-weight: 700;
    color: $dark;
  }
</style>
