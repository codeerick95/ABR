<template>
  <div class="comments mt-1">

    <v-form ref="formResponses" @submit.prevent="validate()" class="form-comments">
      <div class="form-row">
        <div class="col-md-12 py-0 my-0">
          <div class="form-group pb-0 mb-0">
            <v-textarea
              outlined
              label="Comenta"
              v-model="textComent"
              :rules="requiredRule"
            ></v-textarea>
          </div>
        </div>
      </div>
      <div class="form-row py-0 my-0">
        <div class="col-md-4 py-0 mb-0">
          <div class="form-group pb-0 mb-0">
            <v-text-field
              label="Nombre"
              outlined
              v-model="nombreComent"
              :rules="requiredRule"
              v-if="!adminLogged"
              class="mb-0 pb-0"
            ></v-text-field>
          </div>
        </div>

        <div class="col-md-4 py-0 mb-0">
          <div class="form-group pb-0 mb-0">
            <v-text-field
              type="email"
              label="Correo"
              outlined
              v-model="emailComent"
              :rules="emailRules"
              v-if="!adminLogged"
              class="mb-0 pb-0"
            ></v-text-field>
          </div>
        </div>

        <div class="py-0 mb-0" :class="adminLogged ? 'col-md-12' : 'col-md-4'">
          <div class="form-group pb-0 mb-0">
            <v-text-field
              type="text"
              label="Sitio web"
              outlined
              v-model="sitioComent"
              :rules="requiredRule"
              class="mb-0 pb-0"
            ></v-text-field>
          </div>
        </div>
      </div>

      <!-- Submit -->
      <div class="form-group text-center text-lg-left">
        <v-btn color="warning" :disabled="loading ? true : false" @click="validate()">{{ loading ? 'Enviando...' : 'Enviar' }}</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
  import { appConfig } from "@/env";

  import create from '@/apollo/mutations/blog/comments/responses/create'

  export default {
    data() {
      return {
        textComent: '',
        nombreComent: '',
        emailComent: '',
        sitioComent: '',
        emailRules: [
          v => !!v || 'El correo es requerido',
          v => /.+@.+\..+/.test(v) || 'El correo debe contener @',
        ],
        requiredRule: [
          v => !!v || 'Este campo es requerido',
        ],
        loading: false
      }
    },
    props: ['commentId'],
    methods: {
      validate () {
        if (this.$refs.formResponses.validate()) {
          this.submit()
        }
      },
      submit() {
        this.loading = true

        let input = {
          textComent: this.textComent,
          nombreComent: this.nombreComent,
          emailComent: this.emailComent,
          sitioComent: this.sitioComent,
          coment_blog_id: this.commentId
        }

        this.$apollo.mutate({
          mutation: create,
          variables: {
            input
          }
        })
          .then(response => {
            this.loading = false
            this.clearFields()

            this.$refs.formResponses.resetValidation()

            this.$store.commit('setFormResponseToCommentStatus')

            // Se envía este evento para actualizar la lista de comentarios
            this.$emit('commentSent')
          })
          .catch(error => this.loading = false)
      },
      clearFields() {
        this.textComent= ''
        this.nombreComent= ''
        this.emailComent= ''
        this.sitioComent= ''
      }
    },
    computed: {
      adminLogged: function () {
        return this.$cookies.get(appConfig.nameToken) ? true : false
      }
    }
  }
</script>

<style lang="scss">
  .form-comments {
    margin-top: 1rem;
  }

  .comments {
    margin-top: 5rem;

    .v-input__slot {
      background-color: $light !important;
    }
  }

  .comments-title {
    font-size: 1.2em;
    font-weight: 800;
  }
</style>
