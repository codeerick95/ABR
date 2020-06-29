<template>
  <div class="project-show" v-if="project">
    <banner :image="project.imagenDestacada" :title="project.titleActivity">
    </banner>

    <section class="container project-show__container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <article class="card border-0">
            <div v-if="project">
              <img :src="project.imagenDestacada" :alt="project.name" class="project-show__main-image">
            </div>

            <div class="project-show__container-content">
              <!-- Título del proyecto -->
              <h2 class="project-show__subtitle text-warning">{{ project.titleActivity }}</h2>

              <!-- Contenido del proyecto -->
              <div class="project-show__content">
                <div v-html="project.textActivity"></div>
              </div>
            </div>
          </article>
        </div>
      </div>

    </section>

    <!-- Images -->
    <section class="container project-show__gallery">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2 class="gallery__title">Galería del proyecto {{ project.name }}</h2>
        </div>
      </div>
      <div class="row gallery__images mt-5">
        <!-- Desktop -->
        <div class="col-md-4 gallery__desktop" v-for="(image, index) in project.galleryActivity" :key="index">
          <div class="gallery-gradient-container" @click="openModal(image)">

            <img v-lazy="image" alt="" class="img-fluid gallery__image">

            <div class="gallery__gradient">
            </div>
          </div>
        </div>

        <!-- Mobile -->
        <div class="col-md-12">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="40000000"
            indicators
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            class="project-show__carousel-mobile"
          >

            <!-- Slides with custom text -->
            <b-carousel-slide :img-src="image" class="project-show__carousel-mobile-image" v-for="(image, index) in project.galleryActivity" :key="index">
              <div @click="openModal(image)" class="w-100 h-100 shadow-mobile"></div>
            </b-carousel-slide>

          </b-carousel>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer-app></footer-app>

    <b-modal id="modal-project-image" size="lg" hide-header hide-footer centered v-model="dialog" class="position-relative">
      <div class="container-fluid p-0 h-100 modal-gallery">
        <div class="row h-100">
          <!-- Modal description -->
          <div class="col-md-12 d-flex justify-content-center align-items-center p-4">
            <img :src="modalImage" alt="" class="img-fluid">
          </div>
        </div>
      </div>
      <!-- Close modal -->
      <img src="../../assets/icons/close.svg" alt="" class="modal-gallery__icon" @click="dialog = false">
    </b-modal>

    <!-- Facebook messenger -->
    <div class="fb-customerchat"
         attribution=setup_tool
         page_id="1660616037524515"
         theme_color="#6699cc"
         logged_in_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor"
         logged_out_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor">
    </div>
  </div>
  <not-found :object="{title: 'Proyecto', url: '/proyectos'}" v-else></not-found>
</template>

<script>
  import { appConfig } from '@/env'
  import NotFound from '@/components/blog/NotFound'

  //Components
  import Banner from '@/components/projects/BannerProjectShow'
  import ListIcons from '@/components/global/ListIcons'
  import FooterApp from '@/components/Footer'

  // Queries
  import actividad_slug from '@/apollo/queries/activities/actividad_slug'

  export default {
    data() {
      return {
        slug: this.$route.params.slug,
        dialog: false,
        modalImage: '',
        slide: 0,
        sliding: null,
        currentPage: 1,
        numberPerPage: 5,
        nroTotal_items: 0, // Utilizado para la paginación
      }
    },
    components: {
      Banner,
      ListIcons,
      FooterApp,
      NotFound
    },
    apollo: {
      actividad_slug: {
        prefetch: true,
        query: actividad_slug,
        variables() {
          return {
            slugTitle: this.slug,
            page: this.currentPage, // Paginación
            number_paginate: this.numberPerPage, // Items a traer
            estado: 1 // El estado de la publicación
          }
        }
      }
    },
    computed: {
      project() {
        if(this.actividad_slug) {
          return this.actividad_slug.data[0]
        }
      }
    },
    head () {
      // Se utiliza https://vue-meta.nuxtjs.org/

      let title = 'Publicaciones ABR', // Graph
        description = appConfig.description, // env
        appUrl = appConfig.appUrl,
        image = 'https://abrgrupoconsultor.pe/Imagen/logo-azul.png',
        slug = this.slug,
        keywords = 'ABR Grupo consultor Publicaciones, Libros, Fact Sheet, Calendario.'

      if(this.actividad_slug && this.project) {
        description = this.project.description
        title = this.project.titleActivity // Graph
        image = this.project.imagenDestacada
        keywords = this.project.keywords
      }

      return {
        title: title,
        meta: [
          {vmid: 'abrpk', name: "keywords", content: keywords },
          {vmid: 'abrpd', name: "description", content: description },
          // Twitter Card
          {vmid: 'tcp', name: 'twitter:card', content: 'summary'},
          {vmid: 'ttp', name: 'twitter:title', content: title},
          {vmid: 'tdp', name: 'twitter:description', content: description},
          // image must be an absolute path
          {vmid: 'tip', name: 'twitter:image', content: image},

          // Facebook OpenGraph
          {vmid: 'otp', property: 'og:title', content: title},
          {vmid: 'osp', property: 'og:site_name', content: title},
          {vmid: 'otp', property: 'og:type', content: 'website'},
          {vmid: 'oip', property: 'og:image', content:  image},
          {vmid: 'odp', property: 'og:description', content: description},
          {vmid: 'oup', property: 'og:url', content: `${appUrl}/proyectos/${slug}`},

          // Whatsapp OpenGraph
          {vmid: 'wtp', property: 'og:title', content: title},
          {vmid: 'wsp', property: 'og:site_name', content: title},
          {vmid: 'wtp', property: 'og:type', content: 'website'},
          {vmid: 'wip', property: 'og:image', content:  image},
          {vmid: 'wdp', property: 'og:description', content: description},
          {vmid: 'wup', property: 'og:url', content: `${appUrl}/proyectos/${slug}`},
        ]
      }
    },
    methods: {
      openModal(image) {
        this.dialog = true
        this.modalImage = image
      },
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/variables';

  .project-show {
    .project-show__title {
      font-size: 3em;
      font-weight: 800;
      line-height: 1em;
      position: relative;

      &::before {
        content: '';
        background-color: $warning;
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -5%;
      }

      @media (min-width: 1024px) {
        font-size: 2.5em;
      }
    }

    &__container {
      margin-top: 5rem;
    }

    &__main-image {
      width: 100%;
      max-width: 100%;
      max-height: 600px;
      border-radius: 1rem;
      object-position: center;
    }

    &__subtitle {
      font-size: 2em;
    }

  }

  .project-show__subtitle {
    margin: 2rem 0;
  }

  .gallery__desktop {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }

  .project-show__gallery {
    @media (min-width: 720px) {
      margin-top: 3rem;
    }
  }

  .gallery__title {
    font-size: 1.5em;
    font-weight: 800;
    color: $primary;
    padding: 0 1rem;
    display: inline-block;
    border-left: 4px solid $warning;
    border-right: 4px solid $warning;

    @media (min-width: 768px) {
      font-size: 2em;
    }
  }

  .gallery__image {
    width: 100%;
    min-height: 300px;
    object-fit: cover;
    border-radius: .5rem;

    @media (min-width: 768px) {
      min-height: 250px;
    }
  }

  .gallery-gradient-container {
    position: relative;

    &:hover {
      .gallery__gradient {
        height: 100%; opacity: 1;
        transition: height 0ms 0ms, opacity 600ms 0ms;
      }
    }
  }

  .gallery__gradient {
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
    cursor: pointer;
  }

  .project-show__carousel-mobile {
    height: 240px;

    @media (min-width: 720px) {
      display: none;
    }

    .carousel-inner {
      width: 100%;
      height: 100%;
    }

    .carousel-caption {
      width: 100%;
      height: 240px;
      padding-top: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .carousel-item.project-show__carousel-mobile-image {
      height: 220px;

      .img-fluid {
        height: 100%;
      }
    }

    .carousel-indicators {
      bottom: -3rem;

      @media (min-width: 720px) {
        bottom: -3rem;
      }

      @media (min-width: 1024px) {
        bottom: -3rem;
      }
    }

    .carousel-indicators li {
      background-color: $primary;
      width: .7em;
      height: .7em;
      border-radius: 50%;
      opacity: 1;
      outline: none;
    }

    .carousel-indicators .active {
      background-color: $warning;
    }

    .shadow-mobile {
      background-color: rgba($primary, .3);
    }
  }

  .project-show__carousel-mobile-image {
    object-position: center;
  }

  .modal-gallery__icon {
    max-width: 5%;
    position: absolute;
    top: -1rem;
    right: -1rem;
    cursor: pointer;
  }
</style>
