<template>
<div class="admin-login d-flex justify-content-center align-items-center">
    <div class="container admin-login__container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                  <div class="card border-0 pt-5">
                      <div class="card-body">
                        <div class="admin-login__logo-container d-flex justify-content-center">
                          <img src="/global/logo-azul.svg" alt="Logo ABR" class="admin-login__logo">
                        </div>

                        <v-form
                          ref="formLogin"
                          v-model="valid"
                          lazy-validation
                          @submit.prevent="validate"
                          class="admin-login__form"
                        >
                          <div class="form-group pb-0 mb-1">
                              <!-- Email -->
                              <v-text-field
                                  type="email"
                                  label="Correo"
                                  outlined
                                  v-model="email"
                                  :rules="emailRules"
                                  v-on:keyup.enter="validate"
                                  class="mb-0 pb-0"
                              ></v-text-field>
                          </div>

                          <div class="form-group pb-0 mb-1">
                              <!-- Email -->
                              <v-text-field
                                  :type="showPassword ? 'text' : 'password'"
                                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  label="Contraseña"
                                  outlined
                                  v-model="password"
                                  @click:append="showPassword = !showPassword"
                                  :rules="passwordRules"
                                  v-on:keyup.enter="validate"
                                  class="mb-0 pb-0"
                              ></v-text-field>
                          </div>

                          <p class="text-danger text-center" v-if="error.status">{{ error.message }}</p>

                          <div class="form-group text-center mt-3">
                              <v-btn large color="primary" :disabled="loading ? true : false" @click="validate" class="text-transform-none">{{ loading ? 'Ingresando': 'Ingresar' }}</v-btn>
                          </div>

                        </v-form>
                      </div>
                  </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  import { appConfig } from "@/env";

  // Mutations
  import login from '@/apollo/mutations/login'

export default {
  middleware: 'formLogin',
  data() {
      return {
          email: '',
          password: '',
          showPassword: false,
          valid: true,
          emailRules: [
              v => !!v || 'El correo es requerido',
              v => /.+@.+\..+/.test(v) || 'El correo debe contener @',
          ],
          passwordRules: [
              v => !!v || 'La contraseña es requerida',
          ],
          loading: false,
          error: {
            status: false,
            message: ''
          }
      }
  },
  methods: {
    validate () {
        if (this.$refs.formLogin.validate()) {
          this.login()
        }
    },
    login() {
          this.loading = true

          this.error.status = false

          let input = {
            email: this.email,
            password: this.password
          }

          // Call to the graphql mutation
          this.$apollo.mutate({
            mutation: login,
            variables: {
              input,
            },
          }).then((response) => {
            // Si es null se muestra el error
            if(response.data.login.id === "ERROR" && response.data.login.token === "ERROR") {
              this.error = {
                status: true,
                message: 'Correo o contraseña incorrectos'
              }
            } else {
              let token = response.data.login.token,
                name = response.data.login.name,
                email = response.data.login.email,
                image = response.data.login.photo,
                type = response.data.login.typeUser

              // Guarda el datos en cookies
              this.$cookies.set(appConfig.nameToken, token)
              this.$cookies.set(appConfig.nameUser, name)
              this.$cookies.set(appConfig.photoUser, image)
              this.$cookies.set(appConfig.emailUser, email)
              this.$cookies.set('type_user', type)

              this.$router.push('/admin/blog')

              // Se recarga la página para poder obtener las cookies
              this.$store.commit('reloadPage')
            }

            this.loading = false

          }).catch(() => {
            this.loading = false
          })
        }
    }
}
</script>

<style lang="scss">
.admin-login {
    width: 100vw;
    height: 100%;

    @media (min-width: 720px) {
        height: 70%;
    }

    @media (min-width: 1200px) {
        height: 100%;
    }

    &__logo {
        width: 50vw;
        max-width: 100%;

        @media (min-width: 720px) {
            width: 30vw;
        }

        @media (min-width: 1024px) {
            width: 15vw;
        }
    }

    .card {
        background-color: rgba(white, .2) !important;
    }

    &__form {
        margin: 2rem auto;

        @media (min-width: 1024px) {
            max-width: 80%;
        }
    }
}

.v-application.v-application--is-ltr.theme--light {
    background-image: url('/admin/login.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

.v-application--wrap {
    background-color: rgba(white, .5);
}
</style>
