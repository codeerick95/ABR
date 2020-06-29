<template>
  <div>
    <section class="row admin-publications-list">
      <div class="col-md-6 col-lg-4 mb-5" v-for="(item, index) in items" :key="index">
        <div class="card" v-bind:style="{ backgroundImage: 'url(' + item.photoCategoryPublication + ')' }">
          <div class="card-body d-flex align-items-end h-100">
            <div class="card-content text-left w-100">
              <h2 class="card-title">{{ item.nameCategoryPublication }}</h2>

              <div class="d-flex justify-content-between w-100">
                <!-- Ver publicaciones -->
                <v-btn small color="warning" v-b-tooltip.hover title="Ver publicaciones" @click="showPublications(item)">
                  <span class="material-icons">
                    dynamic_feed
                  </span>
                </v-btn>

                <div>
                  <!-- Editar -->
                  <v-btn small color="primary" v-b-tooltip.hover title="Editar categoría" @click="showModalCategoryEdit(item)">
                  <span class="material-icons">
                    create
                  </span>
                  </v-btn>

                  <!-- Eliminar -->
                  <v-btn small color="error" v-b-tooltip.hover title="Eliminar categoría" @click="showModalCategoryDelete(item)">
                  <span class="material-icons">
                    delete
                  </span>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: ['fields', 'items'],
    methods: {
      showModalCategoryEdit(category) {
        this.$store.commit('setModalFullScreen', true)
        this.$store.commit('setObjectSelected', category)
      },
      showModalCategoryDelete(category) {
        this.$store.commit('setModalCategoryDelete', true)
        this.$store.commit('setObjectSelected', category)
      },
      showPublications(category) {
        this.$store.commit('setModalPublications', true)
        this.$store.commit('setObjectSelected', category)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .admin-publications-list,
  .carousel-publications {
    margin-top: 3rem;

  .card {
    /* background-image: url('../../assets/images/publications.jpg'); */
    background-size: cover;
    height: 250px;
    border: none;

  &::before {
     content: '';
     /* background: rgb(39,72,133);
     background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0.1881127450980392) 100%); */
     background: rgb(39,72,133);
     background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0) 90%);
     width: 100%;
     height: 100%;
     position: absolute;
     top: 0;
     left: 0;
   }
  }

  .card-content {
    z-index: 10;
  }

  .card-title {
    font-size: 1.5em;
    color: white;
  }

  .link {
    color: white;
    min-width: 120px;
    z-index: 10;
  }

  .btn--icon {
    max-width: 10px;
  }
  }
</style>
