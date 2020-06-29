<template>
  <div>
    <!-- Alert -->
    <alert-custom v-if="alert.status === true" @event="getPosts"></alert-custom>

    <v-card class="admin__blog-table">
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
        <tr v-for="(post, index) in posts" :key="index" class="animate__animated animate__fadeIn">

          <!-- Si el editor no tiene nombre se muestra el alias -->
          <th scope="row">
            <span class="small">{{ post.alias ? post.alias : post.Name }}</span>
            </th>

          <td>
            <!-- Título del post con filtro -->
            <span class="d-block small">{{ post.titleBlog | postTitle }}</span>

            <!-- Fecha de publicación -->
            <span class="admin__blog-date">
              <i class="far fa-calendar-alt mr-1"></i>
              {{ $moment(post.created_at).format('L') }}
            </span>
          </td>

          <!-- Estado -->
          <td>
            <v-chip
              :color="post.estado === 0 ? 'warning' : 'success'"
              text-color="white"
              label
              small
              class="mr-3"
            >
              {{ post.estado === 0 ? 'Borrador' : 'Publicado' }}
            </v-chip>
          <td>



          <!-- Acciones -->
            <!-- Ver comentarios -->
            <v-btn small color="primary" v-b-tooltip.hover title="Ver comentarios" @click="$router.push(`/admin/comentarios/${post.slugTitleBlog}`)">
                <span class="material-icons">
                  comment
                </span>
            </v-btn>

            <!-- Editar post -->
            <v-btn small color="primary" v-b-tooltip.hover title="Editar" @click="showModalPostEdit(post)">
                <span class="material-icons">
                  create
                </span>
            </v-btn>

            <!-- Eliminar post -->
            <v-btn small color="error" v-b-tooltip.hover title="Eliminar" @click="showModalPostDelete(post)">
              <span class="material-icons">
                delete
              </span>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </table>
    </v-card>

    <div class="row" v-if="existsPosts && (nroTotal_items > numberPerPage)">
      <div class="col-md-12 d-flex justify-content-center">

        <!-- Paginación -->
        <pagination :totalPages="setTotalPages">

          <!-- Slot -->
          <template slot="form">
            <form @submit.prevent="submitByNumber()">
              <input type="number" min="1" class="form-control pagination__field" :disabled="setTotalPages == 1" v-model="currentPage">
            </form>
          </template>

          <template slot="buttons">
            <button class="pagination__button pagination__button&#45;&#45;prev" :disabled="currentPage == 1" v-if="currentPage != 1" @click="prev">
                  <span class="material-icons">
                    arrow_back_ios
                  </span>
            </button>
            <button class="pagination__button pagination__button&#45;&#45;next" :disabled="currentPage == setTotalPages" v-if="currentPage != setTotalPages" @click="next">
                  <span class="material-icons">
                    arrow_forward_ios
                  </span>
            </button>
          </template>

        </pagination>

      </div>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import all from '@/apollo/queries/blog/all'

  // Components
  import Post from '@/components/admin/blog/Post'
  import Pagination from '@/components/global/Pagination'
  import AlertCustom from '@/components/global/Alert'

  export default {
    data() {
      return {
        posts: [],
        currentPage: 1,
        numberPerPage: 5,
        nroTotal_items: 0, // Utilizado para la paginación
        estado: 2 // El estado es un pa´rametro a la query 1 = posts con etsado 1, 2 = todos los posts
      }
    },
    mounted() {
      this.getPosts()
    },
    components: {
      Post,
      Pagination,
      AlertCustom
    },
    methods: {
      prev() {
        if(this.currentPage > 1) {
          this.currentPage--
          this.getPosts()

          window.scrollTo(0, 400)
        }
      },
      next() {
        if(this.currentPage < this.setTotalPages) {
          this.currentPage++
          this.getPosts()

          window.scrollTo(0, 400)
        }
      },
      submitByNumber() {
        // Si la el número de página que quiere buscar es >= 1 y es menor al total de páginas
        if(this.currentPage >= 1 && this.currentPage <= this.setTotalPages) {
          this.getPosts()
        } else {
          // Se envía a buscar la página nro 1
          this.currentPage = 1
          this.getPosts()
        }
      },
      getPosts() {
        let page = this.currentPage, // Paginación
          number_paginate = 5, // Items a traer,
          estado = this.estado

        this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache',
          variables: {
            page,
            number_paginate,
            estado
          }
        })
          .then(response => {
            this.posts = response.data.blogs_get.data

            this.nroTotal_items = response.data.blogs_get.nroTotal_items
          })
      },
      showModalComments(post) {
        this.$store.commit('setModalComments', true)
        this.$store.commit('setObjectSelected', post)
      },
      showModalPostEdit(post) {
        this.$store.commit('setModalFullScreen', true)
        this.$store.commit('setObjectSelected', post)
      },
      showModalPostDelete(post) {
        this.$store.commit('setModalPostDelete', true)
        this.$store.commit('setObjectSelected', post)
      }
    },
    computed: {
      ...mapState(['alert', 'objectSelected']),
      setTotalPages: function () {
        return Math.ceil(this.nroTotal_items / this.numberPerPage)
      },
      existsPosts: function() {
        return this.posts.length >= 1 ? true : false
      }
    },
    filters: {
      postTitle: function (value) {
        if(value) {
          return value.length >= 81 ? value.substring(0, 80) + '...' : value
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
