<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <v-card outlined class="border-0">
        <div class="card-body">

          <div class="card-create-post__top-action d-flex justify-content-between mb-3">
            <h1 class="card-index-activities__title">Lista de Actividades</h1>

            <v-btn small color="primary" v-b-tooltip.hover title="Ver actividades" to="/admin/actividades/crear">
                <span class="material-icons">
                  post_add
                </span>
            </v-btn>
          </div>

          <!-- Lista -->
          <table-activities class="admin-categories__table">
          </table-activities>
        </div>
      </v-card>

      <!-- Los siguientes componentes emiten el evento showAlert cuando se actualizó la categoría
      y así se pueda mostrar una alerta en esta vista -->

      <!-- Modal edit -->
      <edit-activity></edit-activity>

      <!-- Modal delete -->
      <delete-category></delete-category>

    </template>
  </layout>
</template>

<script>
  import { mapState } from 'vuex'

  // Components
  import Layout from '@/components/admin/Layout'
  import TableActivities from '@/components/admin/activities/Table'
  import EditActivity from '@/components/admin/activities/Edit'
  import DeleteCategory from '@/components/admin/activities/Delete'
  import Alert from '@/components/admin/categories-blog/Alert'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        fields: [ 'id', {key: 'titleActivity', label: 'Título'} , { key: 'actions', label: 'Acciones'} ],
        dialog: false,
        alert: {
          status: false,
          message: ''
        },
        activities: []
      }
    },
    mounted() {
      this.$store.commit('setModalFullScreen', false)
      this.$store.commit('setModalCategoryDelete', false)
    },
    components: {
      Layout,
      TableActivities,
      EditActivity,
      DeleteCategory,
      Alert
    },
    methods: {
      showAlert(message) {
        this.alert.status = true
        this.alert.message = message
      },
      closeAlert() {
        this.alert.status = false
        this.alert.message = ''
      }
    },
    computed: {
      ...mapState(['modalCategoryDelete']),
      existsActivities: function () {
        return this.activities.length >= 1 ? true : false
      },
      setTotalPages: function () {
        return Math.ceil(this.nroTotal_items / 3)
      }
    }
  }
</script>

<style lang="scss">
  .card-index-activities__title {
    font-size: 1.2em;
    font-weight: 700;
  }
</style>
