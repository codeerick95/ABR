<template>
<v-form
  ref="formContact"
  v-model="valid"
  lazy-validation
  class="container contact">

    <!-- Contact description -->
    <div class="row">
        <div class="col-md-12">
            <h2 class="contact__subtitle text-primary mt-lg-5">CONTACTO</h2>
        </div>
    </div>

    <span class="small">* Requerido</span>

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

    <!-- Form -->
    <div class="contact__info">
      <div>
        <div class="form-row justify-content-between">
          <div class="col-md-6 pb-0 mb-0">
            <div class="form-group pb-0 mb-0">
              <!-- Nombre -->
              <v-text-field
                label="Nombre y apellidos *"
                outlined
                v-model="name"
                :rules="requiredRule"
                v-if="typeUser === 1"
                class="mb-0 pb-0"
              ></v-text-field>

              <!-- Razón social -->
              <v-text-field
                label="Razón social *"
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
                label="DNI *"
                outlined
                v-model="documentNumber"
                :rules="requiredRule"
                v-if="typeUser === 1"
                class="mb-0 pb-0"
              ></v-text-field>

              <!-- RUC -->
              <v-text-field
                type="number"
                label="RUC *"
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
                label="Correo *"
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
                label="Teléfono/Celular *"
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
                label="Horario de contacto *"
                outlined
                v-model="schedule"
                :rules="requiredRule"
              ></v-select>
            </div>
          </div>

          <div class="col-md-6 pb-0 mb-0">
            <div class="form-group pb-0 mb-0">
              <v-text-field
                label="Asunto *"
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
                label="Solicitud *"
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
      </div>

      <!-- Contact info -->
      <div class="contact__sidebar">
        <div class="contact__sidebar-item mb-4">
          <!-- Icon -->
          <div class="py-0">
            <img src="../../assets/icons/ubication-blue.svg" alt="Ubicación ABR" class="contact__sidebar-icon">
          </div>

          <!-- Info -->
          <div>
            <h3 class="contact-info-subtitle">UBICACIÓN</h3>
            <p class="description mb-0">
              JR. Lloque Yupanqui #977 int. C - Jesús María, Lima
            </p>

            <p class="description my-0">
              Jr. Loreto 533 (alt. Parque Grau) – Juliaca, Puno
            </p>
          </div>
        </div>

        <div class="contact__sidebar-item mb-4">
          <!-- Icon -->
          <div class="py-0">
            <img src="../../assets/icons/phone-blue.svg" alt="Ubicación ABR" class="contact__sidebar-icon">
          </div>

          <!-- Info -->
          <div>
            <h3 class="contact-info-subtitle">TELEFONO / CELL</h3>
            <p class="description my-0">
              [01] 373 7948
            </p>
            <p class="description my-0">
              991 239 977
            </p>
          </div>
        </div>

        <div class="contact__sidebar-item mb-4">
          <!-- Icon -->
          <div class="py-0">
            <img src="../../assets/icons/contact-email.svg" alt="Ubicación ABR" class="contact__sidebar-icon">
          </div>

          <!-- Info -->
          <div>
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
</v-form>
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

    @media (min-width: 1024px) {
      margin-top: 8rem;
    }

  &__info {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;

    @media (min-width: 1024px) {
      grid-template-columns: 2fr 1fr;
      grid-gap: 1rem;
    }
  }

  &__form {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    @media (min-width: 1024px) {
      grid-template-columns: 2fr 1fr;
      grid-gap: 1rem;
    }
  }

    &__subtitle {
        @include subtitle;
        display: inline-block;
        padding-left: .5rem;
        border-left: 4px solid $warning;
        border-right: none;

        @media (min-width: 1024px) {
          padding: 0 1rem;
        }
    }

    .v-text-field.v-text-field--enclosed .v-text-field__details {
        display: none !important;
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
        margin: 0;

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
        margin: 0;

        @media (min-width: 360px) {
            font-size: .95em;
        }
    }
}

.contact__sidebar {
  grid-row: 2 / 3;

  @media (min-width: 1024px) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }

  &-item {
    display: grid;
    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: 15% 1fr;
    }
  }

  &-icon {
    width: 40px;
    margin-bottom: 1rem;
  }
}
</style>
