<template>
<div>
    <banner-service :title="service.name" :image="service.mainImage" v-if="service"></banner-service>

    <div class="container service-info" v-if="service">
        <div class="row">
            <div class="col-xl-6">
                <p class="service-info__description mb-5 pl-3 pl-md-0 text-justify" v-for="(value, index) in service.descriptions" :key="index" v-if="service.descriptions">
                  {{ value }}
                </p>

                <p v-if="service.name === 'Alerta Minero'">
                  Para más información
                  <a href="http://www.alertaminero.pe/" target="_blank">https://www.alertaminero.pe/</a>
                </p>

                <list-icons :items="service.benefits" class="services-list"></list-icons>

                <!-- Botones para compartir -->
                <share-buttons :title="service.name" :description="service.summary" :slug="service.slug"></share-buttons>

            </div>

            <div class="col-xl-6">
                <div class="row">
                    <div class="col-md-12 service-image-container gradient p-0">
                      <img :src="currentImage" class="service-image" />
                    </div>
                </div>
                <div class="row service-images">
                    <!-- Desktop -->
                    <div class="col-4 service-images__desktop mb-5" v-for="(image, index) in service.images" :key="index" @click="currentImage = image">
                        <div class="mini-image" @click="currentImage = image">
                            <img v-lazy="image" alt="Imagen de servicio" class="img-fluid">
                        </div>
                    </div>

                    <!-- Mobile -->
                    <div class="col-md-12" v-if="loadCarousel">
                        <b-carousel
                            id="carousel-1"
                            v-model="slide"
                            :interval="5000"
                            indicators
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                            class="service-carousel-mobile"
                            >

                            <!-- Slides with custom text -->
                            <b-carousel-slide :img-src="image" v-for="(image, index) in service.images" :key="index">
                            </b-carousel-slide>

                        </b-carousel>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer-app class="mt-5"></footer-app>
</div>
</template>

<script>
import { mapState } from 'vuex'

// Components
import BannerService from '@/components/services/Banner'
import ListIcons from '@/components/global/ListIcons'
import ShareButtons from '@/components/global/ShareButtons'
import FooterApp from '@/components/Footer'

import { services } from "../../utilities/api/services";
import {appConfig} from "../../env";

export default {
  data() {
    return {
      slug: this.$route.params.slug,
      services,
      service: {},
      currentImage: '',
      slide: 0,
      sliding: null,
      loadCarousel: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadCarousel = true
    }, 1200)
  },
  components: {
    BannerService,
    ListIcons,
    ShareButtons,
    FooterApp
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
  computed: {
    // ...mapState(['services']),
    setCurrentImage: function () {
      // Se utliza para cambiar la imagen del slider
      return {
        backgroundImage: `url(${this.currentImage})`
      }
    },
  },
  head() {
    // Asingna el servicio comparandolo con el slug
    this.services.forEach(item => {
      if (item.slug === this.slug) {
        this.service = item

        // Asigna la imagen principal para el slider
        this.currentImage = this.service.images[0]
      }
    })

    let title = this.service.name, // Graph
      description = this.service.summary,
      image = this.service.mainImage,
      keywords = 'Contacto ABR Grupo Consultor - Teléfono Correo ABR',
      url = `${appConfig.appUrl}/servicios/${this.slug}`

    return {
      title: title,
      meta: [
        {name: "keywords", content: keywords},
        {name: "description", content: description},
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
        {property: 'og:image', content: image},
        {property: 'og:description', content: description},
        {property: 'og:url', content: url},

        // Whatsapp OpenGraph
        {property: 'og:title', content: title},
        {property: 'og:site_name', content: title},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content: image},
        {property: 'og:description', content: description},
        {property: 'og:url', content: url},
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.service-info {
    margin-top: 2rem;

    @media (min-width: 720px) {
      margin-top: 3rem;
    }

    @media (min-width: 1024px) {
        margin-top: 5rem;
    }

  &__description {
    @media (min-width: 720px) {
      width: 90%;
    }
  }
}

.service-subtitle {
    display: none;

    @media (min-width: 720px) {
        display: inline-block;
        font-size: 1.8em;
        font-size: 1.2em;
        font-weight: 700;
        color: $primary;
        position: relative;
    }

    &::before {
        content: '';
        background-color: $warning;
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -.5rem;

        @media (min-width: 720px) {
            left: -1rem;
        }
    }
}

.services-list {
    .list-icon {
        width: .7rem;
    }

    .lead {
        font-size: .9em;
    }
}

.gradient {
    &::before {
        content: '';
        width: 100%;
        height: 100%;
        background: rgb(39,72,133);
        background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0) 90%);
        position: absolute;
        top: 0;
        left: 0;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
    }
}

.service-image-container {
    display: none;
    height: 340px;
    position: relative;
    border-radius: 2rem;
    margin-top: 3rem;

    @media (min-width: 720px) {
        display: block;
    }

    @media (min-width: 1024px) {
        margin-top: 0;
    }
}

.service-image {
  width: 100%;
  height: 100%;

  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
}

.service-images {
    margin-top: 1.5rem;

    .service-images__desktop {
        display: none;

        @media (min-width: 720px) {
            display: block;
        }
    }

    .mini-image {
        background-color: $primary;
        height: 150px;
        border-radius: .1rem;
        position: relative;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        cursor: pointer;

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
            z-index: 10;
            border-bottom-left-radius: 1rem;
            border-bottom-right-radius: 1rem;

            &:hover {
                background-color: $primary;
            }
        }
    }

    .img-fluid {
        width: 100%;
        height: 150px;
        object-fit: cover !important;
        object-position: center;
        position: relative;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }
}

.service-carousel-mobile {
    @media (min-width: 720px) {
        display: none;
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

    .carousel-item {
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
}
</style>
