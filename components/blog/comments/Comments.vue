<template>
<div class="comments">
    <!-- Comments -->
    <section class="comments-list mb-5">
      <h3 class="comments-title">Comentarios</h3>

      
      <p class="lead" v-if="loadingComments">Cargando comentarios...</p>

      <p class="text-muted" v-if="commentsList.length <= 0 && !loadingComments">Se el primero en comentar</p>

      <template v-else>
        <v-card v-for="(comment, index) in commentsList" :key="index" class="animate__animated animate__fadeIn">
          <comment v-if="comment.stateComent === 2" :comment="comment"></comment>
        </v-card>
      </template>
    </section>

    <h3 class="comments-title">Déjanos tu comentario</h3>

    <!-- Alerta de confirmación -->
    <alert-custom @closeAlert="closeAlert()" v-if="alert.status" :message="alert.message"></alert-custom>

    <!-- Formulario para comentarios -->
    <v-form ref="formComments" @submit.prevent="validate()" class="form-comments">
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
            <v-btn color="warning" @click="validate()">{{ loading ? 'Enviando...' : 'Enviar' }}</v-btn>
        </div>
    </v-form>
</div>
</template>

<script>
  import { appConfig } from "@/env";

  import { mapState } from 'vuex'

  // Components
  import AlertCustom from '@/components/global/Alert'
  import Comment from '@/components/blog/comments/Comment'

  // Mutations
  import create from '@/apollo/mutations/blog/comments/create'

  // Queries
  import comments from '@/apollo/queries/blog/comments/all'

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
          loading: false, // Se utiliza para el form
          loadingComments: false, // Se utiliza para mostrar mensaje de cargando
          commentsList: []
        }
    },
    mounted() {
      setTimeout(() => {
        this.getComments()
      }, 2000)
    },
    props: ['postId'],
    components: {
      AlertCustom,
      Comment
    },
    methods: {
    validate () {
      if (this.$refs.formComments.validate()) {
        this.submit()
      }
    },
    getComments() {
      this.loadingComments = true

      let id_blog = parseInt(this.postId)

      this.$apollo.query({
        query: comments,
        fetchPolicy: 'no-cache',
        variables: {
          id_blog
        }
      })
      .then(response => {
        this.commentsList = response.data.coment_blog

        this.loadingComments = false
      })
    },
    submit() {
      this.loading = true

      let input = {
        textComent: this.textComent,
        nombreComent: this.nombreComent,
        emailComent: this.emailComent,
        sitioComent: this.sitioComent,
        blog_id: parseInt(this.postId)
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

        this.$refs.formComments.resetValidation()

        // Alerta
        let alert = {
          type: 'success',
          status: true,
          message: 'Su comentario fue enviado, posteriormente será publicado.'
        }

        this.$store.commit('setAlert', alert)
      })
      .catch(() => {
        this.loading = false
      })
    },
    showFormResponseStatus() {
      this.$store.commit('setFormResponseToCommentStatus')
    },
    clearFields() {
      this.textComent= ''
      this.nombreComent= ''
      this.emailComent= ''
      this.sitioComent= ''
    },
    closeAlert() {
      this.alert.status = false
      this.alert.message = ''
    }
  },
  computed: {
    ...mapState(['alert', 'formResponseToCommentStatus']),
    adminLogged: function () {
      // Verifica que esté logueado como admin
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

  .comment__image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
</style>
