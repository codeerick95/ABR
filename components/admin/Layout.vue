<template>
<div class="container-fluid dashboard position-relative px-0">
  <div class="dashboard__menu">
    <v-card
      class="overflow-hidden dashboard__menu-card"
    >
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :right="right"
        :permanent="permanent"
        absolute
        dark
        width="300px"
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <div class="logo-container d-flex justify-content-center">
            <img src="/global/logo-blanco.svg" alt="Logo ABR Grupo consultor" class="dashboard__logo">
          </div>
          <v-list-item two-line class="mt-5">
            <v-list-item-avatar>
              <img :src="userData.photo">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>ABR Grupo consultor</v-list-item-title>
              <v-list-item-subtitle>{{ userData.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <!-- Primer Link -->
          <v-list-item
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <nuxt-link to="/" class="text-decoration-none" target="_blank">
                <v-list-item-title class="text-white">Visitar sitio web</v-list-item-title>
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>

          <!-- Blog -->
          <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-item-icon class="text-white">
                <span class="material-icons">
                  dynamic_feed
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="text-white">Blog</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons">
                  table_view
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/blog" class="text-decoration-none">
                  <v-list-item-title class="text-white">Ver todos</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons">
                  post_add
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/blog/crear" class="text-decoration-none">
                  <v-list-item-title class="text-white">Crear</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

            <!-- Categorías del blog -->
            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons">
                  local_offer
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/categorias">
                  <v-list-item-title class="text-white">Ver categorías</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>

          <!-- Publicaciones -->
          <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <span class="material-icons text-white">
                  dynamic_feed
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="text-white">Publicaciones</v-list-item-title>
              </v-list-item-content>
            </template>

            <!-- Categoría de publicaciones -->
            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons">
                  table_view
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/categorias-publicaciones" class="text-decoration-none">
                  <v-list-item-title class="text-white">Ver publicaciones</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons">
                  post_add
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/publicaciones/crear" class="text-decoration-none">
                  <v-list-item-title class="text-white">Crear</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>


          <!-- Proyectos -->
          <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <span class="material-icons text-white">
                  dynamic_feed
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="text-white">Actividades</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons text-white">
                  table_view
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/actividades" class="text-decoration-none">
                  <v-list-item-title class="text-white">Ver todos</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons text-white">
                  post_add
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/actividades/crear" class="text-decoration-none">
                  <v-list-item-title class="text-white">Crear</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>


          <!-- Editores -->
          <v-list-group
            no-action
            v-if="isAdmin"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <span class="material-icons text-white">
                  account_circle
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="text-white">Editores</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons">
                  table_view
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/editores" class="text-decoration-none">
                  <v-list-item-title class="text-white">Ver todos</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <span class="material-icons text-white">
                  post_add
                </span>
              </v-list-item-icon>

              <v-list-item-content>
                <nuxt-link to="/admin/editores/crear" class="text-decoration-none">
                  <v-list-item-title class="text-white">Crear</v-list-item-title>
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>

          <v-list-item
            link
            @click="showModalFullScreen()"
            v-if="isAdmin"
          >
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="text-white">Editar perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Logout -->
          <logout class="m-auto"></logout>

        </v-list>
      </v-navigation-drawer>
    </v-card>

  </div>

  <!-- Contenido principal -->
  <div class="admin-content position-relative">
    <!-- Header -->
    <header-nav @toggleSidebar="sidenav = !sidenav"></header-nav>


    <main class="admin-content__main">

      <!-- Contenido que cambiará -->
      <slot name="content">
      </slot>

    </main>
  </div>

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

        <edit-editor :info="userData" @updated="closeModalFullScreen()"></edit-editor>

      </section>

    </v-card>
  </v-dialog>
</div>
</template>

<script>
  import { appConfig } from "@/env";

  import { mapState } from 'vuex'

  // Components
  // Components
  import HeaderNav from '@/components/admin/nav/HeaderNav'
  import NavHead from './nav/NavHead'
  import Logout from './nav/Logout'

  import EditorInfo from '@/components/admin/editors/EditorInfo'
  import EditEditor from '@/components/admin/editors/EditProfile'

export default {
    data() {
        return {
            admins: [
                ['Management', 'people_outline'],
                ['Settings', 'settings'],
            ],
            sidenav: false,
          drawer: true,
          items: [
            { title: 'Categorías de publicaciones', icon: 'mdi-view-dashboard' },
            { title: 'Photos', icon: 'mdi-image' },
            { title: 'About', icon: 'mdi-help-box' },
          ],
          color: 'primary',
          right: false,
          permanent: true,
          expandOnHover: false,
          modalFullScreen: {
            status: false,
            type: '' // viewData o editData
          },
          infoEdit: {}
        }
    },
    components: {
      NavHead,
      HeaderNav,
      Logout,
      EditorInfo,
      EditEditor
    },
    methods: {
      showModalFullScreen(user, type) {
        // Guarda el objeto completo en vuex
        this.infoEdit = {
          email: this.$cookies.get(appConfig.nameUser),
          name: this.$cookies.get(appConfig.nameUser),
          photoUser: this.$cookies.get(appConfig.photoUser)
        }

        this.modalFullScreen.status = true
        this.modalFullScreen.type = type
      },
      closeModalFullScreen(response) {
        this.modalFullScreen = {
          status: false,
          type: ''
        }
      }
    },
    computed: {
      ...mapState(['objectSelected']),
      userData: function () {
        return {
          name: this.$cookies.get(appConfig.nameUser),
          photo: this.$cookies.get(appConfig.photoUser)
        }
      },
      isAdmin: function () {
        return this.$cookies.get('type_user') == 1 ? true : false
      }
    }
}
</script>

<style lang="scss">
  @import '../../scss/variables';

.dashboard {
    display: grid;
    grid-template-columns: minmax(max-content, 270px) 1fr;
    grid-template-rows: 1fr;

    &__menu {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    &__subtitle {
      font-size: 1em;
      font-weight: 500;
      color: rgba($primary, .9);
    }

    &__menu-card {
      min-height: 100vh;
      height: 100%;
    }
}

  .admin-content {
    &__main {
      padding: 1rem;
    }
  }
</style>
