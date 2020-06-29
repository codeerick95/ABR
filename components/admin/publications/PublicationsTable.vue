<template>
  <div>
    <!-- Alert -->
    <alert-custom v-if="alert.status" @event="getPublications"></alert-custom>

    <!-- Si existen publicaciones -->
    <v-card class="admin__blog-table" v-if="publications.length">
      <table class="table">
        <thead>
        <tr class="text-white">
          <th scope="col">Por</th>
          <th scope="col">Título</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody class="text-white">
        <tr v-for="(item, index) in publications" :key="index" class="animate__animated animate__fadeIn">

          <!-- Si el editor no tiene nombre se muestra el alias -->
          <th scope="row">
            <span class="small">{{ item.alias ? item.alias : item.Name }}</span>
          </th>

          <td>
            <!-- Título del post con filtro -->
            <span class="d-block small">{{ item.titlePublication | postTitle }}</span>

            <!-- Fecha de publicación -->
            <span class="admin__blog-date">
              <i class="far fa-calendar-alt mr-1"></i>
              {{ $moment(item.created_at).format('L') }}
            </span>
          </td>

          <!-- Estado -->
          <td>
            <v-chip
              :color="item.estado === 0 ? 'warning' : 'success'"
              text-color="white"
              label
              small
              class="mr-3"
            >
              {{ item.estado === 0 ? 'Borrador' : 'Publicado' }}
            </v-chip>
          <td>



            <!-- Acciones -->

            <v-btn small color="primary" v-b-tooltip.hover title="Editar" @click="showModal(item)">
                <span class="material-icons">
                  create
                </span>
            </v-btn>

            <!-- Eliminar post -->
            <v-btn small color="error" v-b-tooltip.hover title="Eliminar" @click="modalDelete(item)">
              <span class="material-icons">
                delete
              </span>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </table>
    </v-card>

    <!-- Si no existen publicaciones -->
    <div class="text-center" v-else>
      <p class="lead">Aún no existen publicaciones para esta categoría.</p>
      <v-btn color="primary" to="/admin/publicaciones/crear" class="text-decoration-none">Crear publicación</v-btn>
    </div>


    <!-- Paginación -->
    <div class="row" v-if="existsPublications && (nroTotal_items > numberPerPage)">
      <div class="col-md-12 d-flex justify-content-center">

        <!-- Paginación -->
        <pagination :totalPages="setTotalPages">

          <!-- Slot -->
          <template slot="form">
            <form @submit.prevent="submitByNumber()">
              <input type="number" min="1" class="form-control pagination__field" :disabled="currentPage == setTotalPages" v-model="currentPage">
            </form>
          </template>

          <template slot="buttons">
            <button class="pagination__button pagination__button prev" :disabled="currentPage == 1" v-if="currentPage != 1" @click="prev">
                  <span class="material-icons">
                    arrow_back_ios
                  </span>
            </button>
            <button class="pagination__button pagination__button next" :disabled="currentPage == setTotalPages" v-if="currentPage != setTotalPages" @click="next">
                  <span class="material-icons">
                    arrow_forward_ios
                  </span>
            </button>
          </template>

        </pagination>

      </div>
    </div>

    <!-- Modal edit -->
    <edit-publication @updatedPublication="showAlert('updated')"></edit-publication>

    <!-- Modal Delete -->
    <delete-publication @deleted="showAlert('deleted')"></delete-publication>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import all from '@/apollo/queries/publications/all'

  // Components
  import Post from '@/components/admin/blog/Post'
  import Pagination from '@/components/global/Pagination'
  import AlertCustom from '@/components/global/Alert'
  import EditPublication from './Edit'
  import DeletePublication from "./Delete";

  export default {
    data() {
      return {
        publications: [],
        currentPage: 1,
        numberPerPage: 5,
        nroTotal_items: 0, // Utilizado para la paginación
      }
    },
    mounted() {
      this.getPublications()
    },
    components: {
      Post,
      Pagination,
      AlertCustom,
      EditPublication,
      DeletePublication
    },
    methods: {
      prev() {
        if(this.currentPage > 1) {
          this.currentPage--
          this.getPublications()

          window.scrollTo(0, 400)
        }
      },
      next() {
        if(this.currentPage < this.setTotalPages) {
          this.currentPage++
          this.getPublications()

          window.scrollTo(0, 400)
        }
      },
      submitByNumber() {
        // Si la el número de página que quiere buscar es >= 1 y es menor al total de páginas
        if(this.currentPage >= 1 && this.currentPage <= this.setTotalPages) {
          this.getPublications()
        } else {
          // Se envía a buscar la página nro 1
          this.currentPage = 1
          this.getPublications()
        }
      },
      getPublications() {
        let page = this.currentPage, // Paginación
          number_paginate = 5, // Items a traer
          categoria_id = parseInt(this.objectSelected.id),
          estado = 2

        this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache',
          variables: {
            categoria_id,
            page,
            number_paginate,
            estado
          }
        })
          .then(response => {
            this.publications = response.data.publicaciones_categorias.data

            this.nroTotal_items = response.data.publicaciones_categorias.nroTotal_items
          })
      },
      showModal(publication) {
        this.$store.commit('setPublicationSelected', publication)

        // Muestra modal
        this.$store.commit('setModalEditPublications', true)
      },
      modalDelete(publication) {
        this.$store.commit('setPublicationSelected', publication)

        // Muestra modal
        this.$store.commit('setModalCategoryDelete', true)
      },
      showAlert(type) {
        // Escucha el evento emitido por Edit.vue y muestra alerta
        let alert = {
          type: 'success',
          status: true
        }

        if(type === 'updated') {
          alert.message = 'Publicación actualizada.'
        } else {
          alert.message = 'Publicación eliminada.'
        }

        this.$store.commit('setAlert', alert)

        // Escucha el evento emitido por Edit.vue y actualiza la tabla
        this.getPublications()

        // Asegura que se cierren los modales anteriores
        this.$store.commit('setModalEditPublications', false)
        this.$store.commit('setModalCategoryDelete', false)
      }
    },
    computed: {
      ...mapState(['alert', 'objectSelected']),
      setTotalPages: function () {
        return Math.ceil(this.nroTotal_items / this.numberPerPage)
      },
      existsPublications: function() {
        return this.publications.length >= 1 ? true : false
      }
    },
    filters: {
      postTitle: function (value) {
        if(value) {
          return value.length >= 85 ? value.substring(0, 80) + '...' : value
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../scss/variables";

  .posts-list {
    width: 90%;
    margin: 0 auto;
  }

  .admin__blog-table {
    background-color: rgba(#222538, .9) !important;
    color: white !important;
    transition: background-color .7s;
    z-index: 10 !important;

    &:hover {
      background-color: rgba(#222538, .95) !important;
    }
  }

  .admin__blog-date {
    font-size: .8em;
    color: rgba(white, .7);
  }
</style>
