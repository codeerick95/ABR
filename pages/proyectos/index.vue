<template>
<div class="projects">
    <div class="fb-customerchat"
        attribution=setup_tool
        page_id="1660616037524515"
        theme_color="#6699cc"
        logged_in_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor"
        logged_out_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor">
    </div>

    <banner></banner>

    <!-- Carousel -->
    <div class="position-relative">

        <!-- Imagen principal -->
        <div class="container">
            <div class="row project-main-image">
              <div class="active-hover w-100 h-100 text-center">
                <h1>BETTER GOLD INITIATIVE</h1>
              </div>
              <img v-lazy="'/icons/plus.svg'" alt="" class="project__btn-plus" @click="dialog = true">
            </div>
        </div>

        <!-- Actividades y descripción -->
        <section class="container projects-images" v-if="existsActivities">
            <div class="row text-center">
                <div class="col-md-12">
                    <h2 class="projects-subtitle">Nuestras actividades</h2>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-4 project__image mb-5 animate__animated animate__fadeIn" v-for="item in activities" :key="item.id" v-if="item.estado !== 0">
                    <div class="project-gradient-container">
                        <img v-lazy="item.imagenDestacada" alt="Proyecto  Yanacocha" class="img-fluid">

                        <div class="project__gradient p-2 text-center">
                            <nuxt-link :to="{name: 'proyectos-slug', params: {slug: item.slugtitleActivity}}" class="project__link">{{ item.titleActivity }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Paginación -->
            <div class="row" v-if="existsActivities && (nroTotal_items > numberPerPage)">
              <div class="col-md-12 d-flex justify-content-center">

              <pagination :totalPages="setTotalPages">

                <template slot="form">
                  <form @submit.prevent="submitByNumber()">
                    <input type="number" min="1" class="form-control pagination__field" :disabled="setTotalPages == 1" v-model="currentPage">
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

            <div class="row mt-5">
                <div class="col-md-12">
                    <p class="description">
                        ABR Grupo Consultor, viene trabajando en proyectos que brindan apoyo y benefician al sector de la pequeña minería y minería artesanal, con el objetivo de empoderar al empresario
                        minero a través de la formalización y sostenibilidad de su organización, brindando asistencia técnica y capacitación logrando el cumplimiento de la normativa del sector en las áreas
                        de gestión minera, medio ambiente, seguridad y salud ocupacional, trazabilidad, gestión empresarial, exportación, políticas sociales de recursos humanos, etc.; para el cumplimiento
                        de la normativa peruana y criterios y/o estándares de certificación.
                    </p>
                </div>
            </div>
        </section>
    </div>

    <!-- Footer -->
  <footer-app></footer-app>

    <b-modal id="modal-lg" size="lg" hide-header hide-footer centered v-model="dialog" class="position-relative">
        <div class="container-fluid p-0 h-100 modal-project">
            <div class="row h-100">
                <!-- Modal description -->
                <div class="col-md-12 d-flex justify-content-center align-items-center p-5">
                    <div class="modal-content text-left border-0">
                        <h2 class="modal-title mb-3">BETTER GOLD INITIATIVE</h2>
                        <p class="description text-justify">
                          La Iniciativa Oro Responsable - BGI, es una alianza pública privada entre el Secretaría de Estado de Economía – Seco – y la industria de oro suiza reunida en la Asociación Suiza de Oro Responsable – SBGA. La Iniciativa Oro Responsable coordina de manera oficial con los gobiernos de Bolivia, Colombia y Perú a través de sus Ministerios de Minas y de Ambiente en el caso de Perú. Además, se trabaja en colaboración con los gobiernos regionales y locales en cada país.
                        </p>

                        <p class="description text-justify">
                          La BGI facilita la articulación de los pequeños productores a los mercados internacionales y crea cadenas de valor de oro desde la mina hasta el mercado, para lo cual brinda apoyo a través de la asistencia técnica y creación de capacidades, debiendo la MAPE cumplir con los criterios SBGA, en términos técnicos, ambientales, organizacionales y sociales.
                        </p>

                        <p class="description text-justify">
                          El objeto es lograr que los pequeños productores exporten al mercado suizo un oro producido responsablemente cumpliendo con la normativa minera de cada país y garantizando la trazabilidad de su producción y las transacciones.
                        </p>

                        <p class="description text-justify">
                          Los productores de oro responsable se benefician de un acceso directo a los mercados demandantes de oro responsable y reciben de esta manera mejores condiciones por su producción y un incentivo por su producto, que le permitirá mejorar las condiciones de vida y un desarrollo sostenible en su organización y su entorno.
                        </p>

                      <p class="description text-justify">
                        BGI apoya los sistemas de certificación: Consejo de Joyería Responsable, Fairtrade y Fairmined.
                      </p>

                        <a href="https://www.abrgrupoconsultor.pe/ABR/Fact-Sheet/fact-sheet-iniciativa-oro-Responsable.pdf" download target="_blank" dark class="btn text-white btn-warning bg-warning align-self-start mt-3">DESCARGAR</a>


                    </div>

                  <!-- Close modal -->
                  <img src="../../assets/icons/close.svg" alt="" class="modal-project__icon" @click="dialog = false">

                </div>
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import { appConfig } from '@/env'

// Queries
import all from '@/apollo/queries/activities/all'

// Components
import Banner from '@/components/projects/Banner'
import FooterApp from '@/components/Footer'
import Pagination from '@/components/global/Pagination'

export default {
    data() {
        return {
            dialog: false,
            activities: [],

            currentPage: 1,
            numberPerPage: 3,
            nroTotal_items: 0, // Utilizado para la paginación
        }
    },
    mounted() {
        this.getActivities()
    },
    head () {
      // Se utiliza https://vue-meta.nuxtjs.org/

    let title = 'Proyectos ABR Grupo Consultor', // Graph
      description = 'ABR Grupo Consultor, viene trabajando en proyectos que brindan apoyo y benefician al sector de la pequeña minería y minería artesanal, con el objetivo de empoderar al empresario minero a través de la formalización y sostenibilidad de su organización, brindando asistencia técnica y capacitación logrando el cumplimiento de la normativa del sector en las áreas de gestión minera, medio ambiente, seguridad y salud ocupacional, trazabilidad, gestión empresarial, exportación, políticas sociales de recursos humanos, etc.; para el cumplimiento de la normativa peruana y criterios y/o estándares de certificación.',
      appUrl = appConfig.appUrl,
      image = 'https://api.abrgrupoconsultor.pe/storage/app/imagenes_abr/abr-proyectos.jpg',
      keywords = 'Proyectos ABR Grupo Consultor',
      url = `${appUrl}/proyectos`

    return {
      title: title,
      meta: [
        { name: "keywords", content: keywords },
        { name: "description", content: description },
        // Twitter Card
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description},
        // image must be an absolute path
        {name: 'twitter:image', content: image},

        // Facebook OpenGraph
        {property: 'og:title', content: title},
        {property: 'og:site_name', content: title},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content:  image},
        {property: 'og:description', content: description},
        {property: 'og:url', content: url},

        // Whatsapp OpenGraph
        {property: 'og:title', content: title},
        {property: 'og:site_name', content: title},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content:  image},
        {property: 'og:description', content: description},
        {property: 'og:url', content: url},
      ]
    }
  },
    components: {
        Banner,
        FooterApp,
        Pagination
    },
    methods: {
      getActivities() {
        let page = this.currentPage, // Paginación
          number_paginate = this.numberPerPage, // Items a traer
          estado = 1

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
          this.activities = response.data.actividades.data
          this.nroTotal_items = response.data.actividades.nroTotal_items
        })
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
@import '../../scss/variables';

.project-main-image {
    background-image: url('/slide-home/abr-bgi-proyecto-d.jpg');
    background-size: cover;
    height: 50vh;
    position: relative;
    top: -4rem;
    left: 0;
    right: 0;
    border-radius: 3rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    @media (min-width: 720px) {
        min-height: 50vh;
    }

    @media (min-width: 1200px) {
        min-height: 100vh;
    }

    .project__btn-plus {
        width: 10%;
        margin: 2rem;
        cursor: pointer;
        position: absolute;
        bottom: 1rem;
        right: 1rem;

        @media (min-width: 720px) {
            width: 5%;
        }
    }

    &:hover .active-hover{
      opacity: 1;
    }

    .active-hover {
      background-color: rgba($primary, .7);
      color: white;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3rem;
      transition: opacity .7s;
    }

}

.projects-images {

    .projects-subtitle {
        font-size: 2em;
        font-weight: 800;
        color: $primary;
        padding: 0 1rem;
        display: inline-block;
        border-left: 4px solid $warning;
        border-right: 4px solid $warning;
    }

    .project__gradient {
        background-color: rgba($primary, .7);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        height: 0;
        opacity: 0;
        transition: height 0ms 400ms, opacity 400ms 0ms;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .project-gradient-container {
        position: relative;

        &:hover {
            .project__gradient {
                height: 100%; opacity: 1;
                transition: height 0ms 0ms, opacity 600ms 0ms;
            }
        }

    }

    .project__image,
    .project-gradient-container,
    .project__gradient,
    .img-fluid {
        border-radius: 1rem;
    }

    .project__image {

        .img-fluid {
            object-fit: cover;
            height: 250px;
            position: relative;
            display: block;
        }
    }

    .project__link {
        font-size: 1.1em;
        color: white;
    }
}

.projects-description {
    .description {
        font-size: 1em;
    }
}

.modal-project {
    .modal-title {
        font-size: 2em;
        font-weight: 800;
        color: $primary;
        line-height: 1em;
        position: relative;

        &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 100%;
            position: absolute;
            top: 0;
            left: -3%;

            @media (min-width: 1024px) {
                left: -1.5%;
            }
        }
    }

    .modal-project__icon {
        width: 7%;
        position: absolute;
        top: -.5rem;
        right: 0;
        margin-right: .5rem;
        cursor: pointer;

        @media (min-width: 728px) {
            width: 5%;
        }


    }

    .v-btn,
    .v-btn:before {
        border-radius: 1rem;
    }
}

  .project-main__gradient {
    background-color: $primary;

    width: 100%;
    height: 100%;
  }
</style>
