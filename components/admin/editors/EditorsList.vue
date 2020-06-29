<template>
  <div class="editors-list" v-if="users">
    <!-- Alerta -->
    <div class="row">
      <div class="col-md-12">
        <!--<alert v-if="alert.status" :message="alert.message"></alert>-->
      </div>
    </div>

    <div class="row justify-content-center" v-if="users">
      <!-- Editors -->
      <div class="col-md-6 col-lg-4 animate__animated animate__fadeIn" v-for="(user, index) in users" :key="index">

        <!-- Información de usuario -->
        <card-editor :info="user">
          <template slot="buttons">

            <!-- Se pasa al usuario y el tipo de información que se mostrará -->
            <v-btn small color="primary" v-b-tooltip.hover title="Ver información" @click="showModalFullScreen(user, 'viewData')">
              <span class="material-icons">
                receipt_long
              </span>
            </v-btn>

            <v-btn small color="primary" v-b-tooltip.hover title="Editar datos" @click="showModalFullScreen(user, 'editData')">
              <span class="material-icons">
                create
              </span>
            </v-btn>

            <v-btn small color="error" v-b-tooltip.hover title="Eliminar editor" @click="showModalDeleteEditor(user)">
              <span class="material-icons">
                delete
              </span>
            </v-btn>
          </template>
        </card-editor>

      </div>

      <div class="col-md-12">
        <!-- Paginación -->
        <div class="row" v-if="existsUsers">
          <div class="col-md-12 d-flex justify-content-center">

            <pagination :totalPages="setTotalPages">

              <template slot="form">
                <form @submit.prevent="submitByNumber()">
                  <input type="number" class="form-control pagination__field" :disabled="currentPage == setTotalPages" v-model="currentPage">
                </form>
              </template>

              <template slot="buttons">
                <button class="pagination__button pagination__button--prev" :disabled="currentPage == 1" v-if="currentPage != 1" @click="prev">
                  <span class="material-icons">
                    arrow_back_ios
                  </span>
                </button>
                <button class="pagination__button pagination__button--next" :disabled="currentPage == setTotalPages" v-if="currentPage != setTotalPages" @click="next">
                  <span class="material-icons">
                    arrow_forward_ios
                  </span>
                </button>
              </template>
            </pagination>

          </div>
        </div>
      </div>
    </div>

    <!-- Editar datos -->
    <v-dialog v-model="modalFullScreen.status" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card v-if="objectSelected">
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            {{ modalFullScreen.type === 'viewData' ? 'Datos de usuario' : 'Editando datos de usuario' }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <!-- Cierra modalFullScreen -->
            <v-btn icon dark @click="closeModalFullScreen()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>

        </v-toolbar>

        <!--  Sección principal -->
        <section class="container update-activity__content">

          <!-- Ver infomación de editor -->
          <editor-info :info="objectSelected" v-if="modalFullScreen.type === 'viewData'"></editor-info>


          <!-- Editar información de editor -->
          <edit-editor v-if="modalFullScreen.type === 'editData'" @updated="updated()"></edit-editor>

        </section>

      </v-card>
    </v-dialog>

    <!-- Modal delete editor -->
    <v-dialog v-model="modalDeleteEditor" persistent max-width="500">
      <v-form
        ref="formDeleteUser"
        v-model="valid"
        lazy-validation
        @submit.prevent="deleteEditor"
        class="admin-login__form"
      >

        <v-card>

        <div class="card-body">
          <v-card-title class="headline p-0">{{ objectSelected.nameEditor }} {{ objectSelected.fatherSurnameEditor }}</v-card-title>

          <div>
            <p class="lead text-muted my-5">¿Está seguro de eliminar al editor?</p>
          </div>

          <!-- Si existen otros editores -->
          <template v-if="usersItems.length >= 1">
            <p class="text-muted">
              Seleccione al nuevo editor encargado de los posts publicados por
              <span class="font-weight-bold">{{ objectSelected.nameEditor }} {{ objectSelected.fatherSurnameEditor }}.</span>
            </p>
            <v-select
              :items="usersItems"
              label="Nuevo usuario"
              :rules="requiredRule"
              v-model="userSelected"
            ></v-select>
          </template>

          <!-- Si no existen todos los posts pasan al admin -->
          <p v-else>
            Los posts del editor <span class="font-weight-bold">{{ objectSelected.nameEditor }} {{ objectSelected.fatherSurnameEditor }}</span>
            serán encargados al administrador.
          </p>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text :disabled="loading ?  true : false" @click="closeModalDelete()">Cancelar</v-btn>
          <v-btn type="submit" color="red darken-1" text :disabled="loading ?  true : false">{{ loading ?  'Eliminando...' : 'Eliminar editor' }}</v-btn>
        </v-card-actions>
      </v-card>

      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  // Components
  import CardEditor from '@/components/admin/editors/Card'
  import EditEditor from './Edit'
  import DeleteUser from './Delete'
  import EditorInfo from './EditorInfo'
  import Alert from '@/components/global/Alert'
  import Pagination from '@/components/global/Pagination'

  // Queries
  import users from '@/apollo/queries/editors/editores'

  // Mutations
  import deleteEditor from '@/apollo/mutations/editors/delete'

  export default {
    data() {
      return {
        users: [],
        currentPage: 1,
        number_paginate: 5,
        nroTotal_items: 0,
        modalFullScreen: {
          status: false,
          type: '' // viewData o editData
        },
        modalDeleteEditor: false,
        loading: false,
        userSelected: '',
        valid: true,
        requiredRule: [
          v => !!v || 'Debe seleccionar un editor'
        ]
      }
    },
    components: {
      CardEditor,
      EditEditor,
      DeleteUser,
      EditorInfo,
      Alert,
      Pagination
    },
    mounted() {
      this.getUsers()
    },
    props: ['fields', 'items'],
    methods: {
      getUsers() {
        let page = this.currentPage,
          number_paginate = this.number_paginate

        this.$apollo.query({
          query: users,
          fetchPolicy: 'no-cache',
          variables: {
            page,
            number_paginate
          }
        })
          .then(response => {
            this.nroTotal_items = response.data.Getusers.nroTotal_items
            this.users = response.data.Getusers.data
          })
      },
      showModalFullScreen(user, type) {
        // Guarda el objeto completo en vuex
        this.$store.commit('setObjectSelected', user)

        this.modalFullScreen.status = true
        this.modalFullScreen.type = type
      },
      closeModalFullScreen() {
        // Limpia el estado en vuex
        this.$store.commit('setObjectSelected', {})

        this.modalFullScreen = {
          status: false,
          type: ''
        }
      },
      showModalDeleteEditor(user) {
        this.modalDeleteEditor = true
        this.$store.commit('setObjectSelected', user)
      },
      closeModalDelete() {
        this.modalDeleteEditor = false
        this.$store.commit('setObjectSelected', {})
      },
      deleteEditor() {
        if(this.$refs.formDeleteUser.validate()) {

          this.loading = true

          let date = this.$moment().format('YYYY-MM-DD')

          let user = this.objectSelected

          let input = {
            id: parseInt(user.id),
            email: user.email,
            typeDocumentEditor: parseInt(user.typeDocumentEditor),
            numberDocumentEditor: parseInt(user.numberDocumentEditor),
            nameEditor: user.nameEditor,
            fatherSurnameEditor: user.fatherSurnameEditor,
            motherSurnameEditor: user.motherSurnameEditor,
            dateBirthEditor: date,
            alias: user.alias
          }

          if(this.userSelected) {
            // Id del nuevo usuario encargado de los posts
            input.id_destino = parseInt(this.userSelected)
          } else {
            // Si no existen usuarios se pasará el ID del admin
            input.id_destino = 1
          }

          this.$apollo.mutate({
            mutation: deleteEditor,
            variables: {
              input
            }
          })
          .then(() => {
            // Limpia datos y formulario
            this.$refs.formDeleteUser.resetValidation()
            this.userSelected = ''

            this.loading = false

            this.getUsers()

            this.closeModalDelete()
          })

        }
      },
      updated() {
        this.modalFullScreen.status = false
        this.modalFullScreen.type = ''

        this.getUsers()
      },
      prev() {
        if(this.currentPage > 1) {
          this.currentPage--
          this.getUsers()

          window.scrollTo(0, 400)
        }
      },
      next() {
        if(this.currentPage < this.setTotalPages) {
          this.currentPage++
          this.getUsers()

          window.scrollTo(0, 400)
        }
      },
      submitByNumber() {
        // Si la el número de página que quiere buscar es >= 1 y es menor al total de páginas
        if(this.currentPage >= 1 && this.currentPage <= this.setTotalPages) {
          this.getUsers()
        } else {
          // Se envía a buscar la página nro 1
          this.currentPage = 1
          this.getUsers()
        }
      }
    },
    computed: {
      ...mapState(['objectSelected']),
      setTotalPages: function () {
        return Math.ceil(this.nroTotal_items / this.number_paginate)
      },
      existsUsers: function () {
        return this.users.length >= 1 ? true : false
      },
      usersItems: function () {
        let list = []


        if(this.users) {
          // Recorre la lista original de usuarios y selecciona a todos los restantes
          this.users.forEach(item => {

            // Se organiza el objeto para que pueda ser entendido por el select de Vuetify
            let itemForSelect = {
              text: `${item.nameEditor} ${item.fatherSurnameEditor}`,
              value: item.id
            }

            // Si el objeto anterior es distinto al usuario a eliminar, se añade a la lista
            if(item.id !== this.objectSelected.id) {
              list.push(itemForSelect)
            }

          })

        }

        return list
      }
    }
  }
</script>

<style lang="scss" scoped>
.editors-list {
  width: 90%;
  margin: 0 auto;
}
</style>
