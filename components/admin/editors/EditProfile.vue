<!-- Solo administradores -->
<template>
  <div v-if="this.isAdmin">
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
              <h1 class="card-edit-post__title">{{ info.name }}</h1>
            </div>

            <div class="card-body">
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="Nombre"
                    v-model="nameEditor"
                  ></v-text-field>
                </v-col>

                <v-col cols="4">
                  <v-text-field
                    label="Correo electrónico"
                    v-model="email"
                    disabled
                  ></v-text-field>
                  <span class="text-danger" v-if="error.status">{{ error.message }}</span>
                </v-col>
              </v-row>

              <v-row>
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

            <template v-if="!previewPhoto && info">
              <span class="d-inline-block mb-3 text-muted">Imagen de usuario actual</span>
              <div class="d-flex justify-content-center">
                <img :src="info.photo" alt="" class="img-rounded">
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
  import { appConfig } from "../../../env";
  import { mapState } from 'vuex'

  // Mutations
  import update from '@/apollo/mutations/editors/updateProfile'

  export default {
    data() {
      return {
        valid: true,
        menu: false,
        id: '',
        email:  '',
        nameEditor: '',
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
      this.nameEditor = this.info.name
    },
    props: ['info'],
    computed: {
      ...mapState(['modalFullScreen']),
      isAdmin: function () {
        return this.$cookies.get('type_user') == 1 ? true : false
      }
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
      update() {
        this.loading = true

        let input = {
          id: parseInt(this.id),
          email: this.email,
          name: this.nameEditor,
        }

        let file1 = ''

        let variables = {
          input
        }

        if(this.photoEditor) {
          variables.file1 = this.photoEditor
        }

        this.$apollo.mutate({
          mutation: update,
          variables
        })
          .then(response => {

            // Actualiza datos en cookies
            this.$cookies.set(appConfig.emailUser, response.data.UpdateAdmin.email)
            this.$cookies.set(appConfig.nameUser, response.data.UpdateAdmin.name)
            this.$cookies.set(appConfig.photoUser, response.data.UpdateAdmin.photo)

            this.$emit('updated', response.data)

            this.loading = false
          })
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
