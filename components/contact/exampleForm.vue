<template>
  <div class="container contact">
    <!-- Contact description -->
    <div class="row">
      <div class="col-md-12">
        <h2 class="subtitle">CONTACTO</h2>
      </div>
    </div>

    <div class="row mt-5 d-flex justify-content-between">

      <!-- Form -->
      <div class="col-lg-7 px-5">
        <v-form
          ref="formContact"
          v-model="valid"
          lazy-validation>

          <div class="row py-0">
            <div class="col-md-12 py-0 my-0">
              <v-radio-group row v-model="typeUser">
                <v-radio
                  label="Persona natural"
                  :value="1"
                ></v-radio>

                <v-radio
                  label="Represento a una empresa"
                  :value="2"
                ></v-radio>
              </v-radio-group>
            </div>
          </div>
          <div class="form-row justify-content-between">
            <div class="col-md-6 pb-0 mb-0">
              <div class="form-group pb-0 mb-0">
                <!-- Nombre -->
                <v-text-field
                  label="Nombre y apellidos"
                  outlined
                  v-model="name"
                  :rules="requiredRule"
                  v-if="typeUser === 'person'"
                  class="mb-0 pb-0"
                ></v-text-field>

                <!-- Razón social -->
                <v-text-field
                  label="Razón social"
                  outlined
                  v-model="name"
                  :rules="requiredRule"
                  v-else
                  class="mb-0 pb-0"
                ></v-text-field>
              </div>
            </div>

            <div class="col-md-6 pb-0 mb-0">
              <div class="form-group pb-0 mb-0">
                <!-- DNI -->
                <v-text-field
                  type="number"
                  label="DNI"
                  outlined
                  v-model="documentNumber"
                  :rules="requiredRule"
                  v-if="typeUser === 'person'"
                  class="mb-0 pb-0"
                ></v-text-field>

                <!-- RUC -->
                <v-text-field
                  type="number"
                  label="RUC"
                  outlined
                  v-model="documentNumber"
                  :rules="requiredRule"
                  v-else
                  class="mb-0 pb-0"
                ></v-text-field>
              </div>
            </div>
          </div>

          <div class="form-row justify-content-between">
            <div class="col-md-6 pb-0 mb-0">
              <div class="form-group pb-0 mb-0">
                <!-- Email -->
                <v-text-field
                  type="email"
                  label="Correo"
                  outlined
                  v-model="email"
                  :rules="emailRules"
                  class="mb-0 pb-0"
                ></v-text-field>
              </div>
            </div>

            <div class="col-md-6 pb-0 mb-0">
              <div class="form-group pb-0 mb-0">
                <!-- Teléfono -->
                <v-text-field
                  type="number"
                  label="Teléfono/Celular"
                  outlined
                  v-model="phone"
                  :rules="requiredRule"
                ></v-text-field>
              </div>
            </div>
          </div>

          <!-- Horario y Asunto -->
          <div class="form-row">
            <div class="col-md-6 pb-0 mb-0">
              <div class="form-group pb-0 mb-0">
                <v-select
                  :items="contactItems"
                  label="Horario de contacto"
                  outlined
                  v-model="schedule"
                  :rules="requiredRule"
                ></v-select>
              </div>
            </div>

            <div class="col-md-6 pb-0 mb-0">
              <div class="form-group pb-0 mb-0">
                <v-text-field
                  label="Asunto"
                  outlined
                  v-model="subject"
                  :rules="requiredRule"
                ></v-text-field>
              </div>
            </div>
          </div>

          <!-- Asunto y solicitud -->
          <div class="form-row">
            <div class="col-md-12">
              <div class="form-group pb-0 mb-0">
                <v-textarea
                  outlined
                  label="Solicitud"
                  v-model="message"
                  :rules="requiredRule"
                ></v-textarea>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="form-group text-center text-lg-left">
            <v-btn large color="primary" class="text-transform-none" :disabled="loading ? true : false" @click="validate">
              {{ loading ? 'Enviando' : 'Envíe su mensaje' }}
            </v-btn>
          </div>

          <!-- Alerta de mensaje enviado -->
          <v-alert type="success" dense text v-if="alert.status">
            {{ alert.message }}
          </v-alert>
        </v-form>

      </div>

      <!-- Contact info -->
      <div class="col-lg-5 text-center text-md-left p-0">
        <div class="row w-100 h-100 justify-content-center justify-content-lg-start">
          <div class="col-md-12 py-0 contact-info">
            <div class="row py-0 no-gutters">
              <!-- Icon -->
              <div class="col-lg-2 py-0">
                <img src="../../assets/icons/ubication-blue.svg" alt="Ubicación ABR" class="img-fluid">
              </div>

              <!-- Info -->
              <div class="col-lg-10">
                <h3 class="contact-info-subtitle">UBICACIÓN</h3>
                <p class="description">
                  JR. Lloque Yupanqui #977 int. C - Jesús María - Lima
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-12 py-0">
            <div class="row no-gutters">
              <!-- Icon -->
              <div class="col-lg-2 py-0">
                <img src="../../assets/icons/phone-blue.svg" alt="Ubicación ABR" class="img-fluid">
              </div>

              <!-- Info -->
              <div class="col-lg-10">
                <h3 class="contact-info-subtitle">TELEFONO / CELL</h3>
                <p class="description my-0">
                  [01] 373 7948
                </p>
                <p class="description my-0">
                  991 239 977
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-12 py-0 mt-5">
            <div class="row no-gutters">
              <!-- Icon -->
              <div class="col-lg-2 py-0">
                <img src="../../assets/icons/contact-email.svg" alt="Ubicación ABR" class="img-fluid">
              </div>

              <!-- Info -->
              <div class="col-lg-7">
                <h3 class="contact-info-subtitle">CORREO</h3>
                <p class="description email my-0">
                </p>
                <p class="description admin-email my-0">
                  administracion@abrgrupoconsultor.pe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import createContact from '@/apollo/mutations/createContact'

  export default {
    data() {
      return {
        valid: true,
        emailRules: [
          v => !!v || 'El correo es requerido',
          v => /.+@.+\..+/.test(v) || 'El correo debe contener @',
        ],
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ],
        typeUser: 1,
        name: '',
        documentNumber: '',
        email: '',
        phone: '',
        contactItems: [
          { value: '8:00 am - 10:00 am', text: '8:00 am - 10:00 am' },
          { value: '10:00 am - 12:00 pm', text: '10:00 am - 12:00 pm' },
          { value: '12:00 pm - 2:00 pm', text: '12:00 pm - 2:00 pm' },
          { value: '2:00 pm - 4:00 pm', text: '2:00pm - 4:00 pm' },
          { value: '4:00 pm - 6:00 pm', text: '4:00 pm - 6:00 pm' }
        ],
        schedule: '',
        subject: '',
        message: '',
        alert: {
          status: false,
          message: ''
        },
        loading: false
      }
    },
    methods: {
      validate () {
        if (this.$refs.formContact.validate()) {
          this.submit()
        }
      },
      submit() {
        this.loading = true

        // We save the user input in case of an error
        const ContactoInput = {
          typeContact: this.typeUser,
          name: this.name,
          numberDocument: this.documentNumber,
          email: this.email,
          phone: this.phone,
          schedule: this.schedule,
          subject: this.typeUser,
          bodyMessage: this.message
        }


        // Call to the graphql mutation
        this.$apollo.mutate({
          // Query
          mutation: createContact,
          // Parameters
          variables: {
            input: ContactoInput,
          },
        }).then(() => {
          // Result

          this.clearFields()

          this.alert = {
            status: true,
            message: 'Gracias por escribirnos, su mensaje ha sido enviado.'
          }

          this.loading = false

        }).catch(() => {
          this.loading = false
        })
      },
      clearFields() {
        // Clear fieds
        this.typeUser = 1
        this.name = ''
        this.documentNumber = ''
        this.email = ''
        this.phone = ''
        this.schedule = ''
        this.subject = ''
        this.message = ''

        // Hace que al limpiarse el form no se vea con campos obligatorios
        this.$refs.formContact.resetValidation()
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/variables';

  .contact {
    margin-top: 3rem;

    @media (min-width: 720px) {
      margin-top: 6rem;
    }

    .subtitle {
      display: inline-block;
      padding: 0 1rem;
      border-left: 4px solid $warning;
      border-right: none;
    }

    .v-text-field.v-text-field--enclosed .v-text-field__details {
      display: none !important;
    }

    .img-fluid {
      width: 45px;

      @media (min-width: 720px) {
        width: 10%;
      }

      @media (min-width: 1024px) {
        width: 80%;
      }
    }

    .contact-info {
      margin-top: 1rem;

      @media (min-width: 1024px) {
        margin-top: 4.3rem;
      }
    }

    .contact-info-subtitle {
      font-size: 1.2em;
      font-weight: 700;
      color: $primary;
    }

    .email::before {
      content: 'abrconsultores@abrgrupoconsultor.pe';
      font-size: .9em;
      display: block;
      margin: .5rem 0;

      @media (min-width: 360px) {
        font-size: .95em;
      }
    }

    .admin-email {
      font-size: .9em;

      @media (min-width: 360px) {
        font-size: .95em;
      }
    }

    .admin-email::after {
      content: 'cbazan@abrgrupoconsultor.pe';
      font-size: .9em;
      display: block;
      margin: .5rem 0;

      @media (min-width: 360px) {
        font-size: .95em;
      }
    }
  }
</style>
