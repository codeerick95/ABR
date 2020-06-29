<template>
  <div>
    <!-- Alert -->
    <alert-custom v-if="alert.status === true" @event="getActivities"></alert-custom>

    <v-card class="admin__activities-table">
      <table class="table">
        <thead>
        <tr class="text-white">
          <th scope="col">#</th>
          <th scope="col">Título</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody class="text-white">
        <tr v-for="(item, index) in items" :key="index" class="animate__animated animate__fadeIn">
          <th scope="row">
            <span class="small">{{ item.id }}</span>
          </th>

          <td>
            <span class="small">
              {{ item.titleActivity | publicationTitle }}
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

            <!-- Editar post -->
            
              <v-btn small color="primary" v-b-tooltip.hover title="Editar" @click="showModalActivityEdit(item)">
                  <span class="material-icons">
                    create
                  </span>
              </v-btn>
            

            <!-- Eliminar post -->
            <v-btn small color="error" v-b-tooltip.hover title="Eliminar" @click="showModalCategoryDelete(item)">
              <span class="material-icons">
                delete
              </span>
            </v-btn>
          </td>

        </tr>
        </tbody>
      </table>
    </v-card>

    <div class="row" v-if="existsActivities && (nroTotal_items > numberPerPage)">
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

  // Queries
  import all from '@/apollo/queries/activities/all'

  import AlertCustom from '@/components/global/Alert'

  import Pagination from '@/components/global/Pagination'

  export default {
    data() {
      return {
        items: [],
        currentPage: 1,
        numberPerPage: 5,
        nroTotal_items: 0, // Utilizado para la paginación
      }
    },
    mounted() {
      this.getActivities()
    },
    components: {
      AlertCustom,
      Pagination
    },
    methods: {
      getActivities() {
        let page = this.currentPage, // Paginación
          number_paginate = this.numberPerPage, // Items a traer
          estado = 2

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
            this.items = response.data.actividades.data
            this.nroTotal_items = response.data.actividades.nroTotal_items
          })
      },
      showModalActivityEdit(activity) {
        this.$store.commit('setModalFullScreen', true)
        this.$store.commit('setObjectSelected', activity)
      },
      showModalCategoryDelete(activity) {
        this.$store.commit('setModalCategoryDelete', true)
        this.$store.commit('setObjectSelected', activity)
      },
      prev() {
        if(this.currentPage > 1) {
          this.currentPage--
          this.getActivities()

          // window.scrollTo(0, 400)
        }
      },
      next() {
        if(this.currentPage < this.setTotalPages) {
          this.currentPage++
          this.getActivities()

          // window.scrollTo(0, 400)
        }
      },
      submitByNumber() {
        // Si la el número de página que quiere buscar es >= 1 y es menor al total de páginas
        if(this.currentPage >= 1 && this.currentPage <= this.setTotalPages) {
          this.getActivities()
        } else {
          // Se envía a buscar la página nro 1
          this.currentPage = 1
          this.getActivities()
        }
      }
    },
    computed: {
      ...mapState(['alert']),
      setTotalPages: function () {
        return Math.ceil(this.nroTotal_items / this.numberPerPage)
      },
      existsActivities: function() {
        return this.items.length >= 1 ? true : false
      }
    },
    filters: {
      publicationTitle: function (value) {
        if(value) {
          return value.length >= 80 ? value.substring(0, 80) + '...' : value
        }
      }
    }
  }
</script>

<style lang="scss">
  .admin__activities-table {
    background-color: rgba(#222538, .9) !important;
    color: white !important;
    transition: background-color .7s;
    z-index: 10 !important;

  &:hover {
     background-color: rgba(#222538, .95) !important;
   }
  }
</style>
