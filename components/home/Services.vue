<template>
<div class="container home-services d-flex flex-column">
    <!-- Services description -->
    <div class="row justify-content-center">
        <div class="col-lg-10">
            <div class="d-flex justify-content-center">
                <h2 class="home-services__title text-primary mb-4 md-md-3">NUESTROS SERVICIOS</h2>
            </div>

            <p class="home-services__description">
                Abarcan desde una oferta de gestión integral hasta un asesoramiento puntual en aspectos concretos de la gestión de cada organización. Estamos enfocados en brindar acompañamiento en el cumplimiento de la gestión y la normativa del sector. ABR se adapta a las necesidades específicas de cada organización de
                <span class="d-inline-block w-100 text-center">acuerdo a la actividad que desarrolla la empresa.</span>
            </p>
        </div>
    </div>

    <!-- Services -->
    <section class="services-desktop" v-if="services.length >= 1">
        <div class="d-flex flex-column">
            <div class="row justify-content-center home-services-list mt-3">
                <div class="col-md-6 col-lg-4">
                    <card-service :service="services[0]" v-show="services[0]">
                        <slot>
                            <img v-lazy="services[0].icon" :alt="services[0].name" v-if="services[0]" class="card-home__service-image">
                        </slot>
                    </card-service>
                </div>
                <div class="col-md-6 col-lg-4">
                    <card-service :service="services[1]" v-show="services[1]">
                        <slot>
                            <img v-lazy="services[1].icon" :alt="services[1].name" v-if="services[1]" class="card-home__service-image">
                        </slot>
                    </card-service>
                </div>
            </div>

            <div class="row justify-content-center py-0 home-services-list mt-3 list-2">
                <div class="col-md-6 col-lg-4">
                    <card-service :service="services[2]" v-show="services[2]">
                        <slot>
                            <img v-lazy="services[2].icon" :alt="services[2].name" v-if="services[2]" class="card-home__service-image">
                        </slot>
                    </card-service>
                </div>
                <div class="col-md-6 col-lg-4">
                    <card-service :service="services[3]" v-show="services[3]">
                        <slot>
                            <img v-lazy="services[3].icon" :alt="services[3].name" v-if="services[3]" class="card-home__service-image">
                        </slot>
                    </card-service>
                </div>

                <div class="col-md-6 col-lg-4 mt-5 mt-md-0">
                    <card-service :service="services[4]" v-show="services[4]">
                        <slot>
                            <img v-lazy="services[4].icon" :alt="services[4].name" v-if="services[4]" class="card-home__service-image">
                        </slot>
                    </card-service>
                </div>
            </div>

            <div class="row justify-content-center home-services-list mt-3 list-3">
                <div class="col-md-6 col-lg-4">
                    <card-service :service="services[5]" v-show="services[5]">
                        <slot>
                            <img v-lazy="services[5].icon" :alt="services[5].name" v-if="services[5]" class="card-home__service-image">
                        </slot>
                    </card-service>
                </div>
                <div class="col-md-6 col-lg-4">
                    <card-service :service="services[6]" v-show="services[6]">
                        <slot>
                            <img v-lazy="services[6].icon" :alt="services[6].name" v-if="services[6]" class="card-home__service-image">
                        </slot>
                    </card-service>
                </div>
            </div>
        </div>
    </section>

    <!-- Carousel móvil -->
    <carousel-services class="home-services__carousel-mobile" v-if="showCarousel">
    </carousel-services>
</div>
</template>

<script>
import { mapState } from 'vuex'

import CardService from './CardService'
import CarouselServices from './carousel/CarouselServices'

export default {
    data() {
        return {
          showCarousel: false
        }
    },
  mounted() {
      setTimeout(() => {
        this.showCarousel = true
      }, 2000)
  },
  components: {
        CardService,
        CarouselServices
    },
    computed: {
        ...mapState(['services'])
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.home-services {
    margin-top: 5rem;

    @media (min-width: 1024px) {
        margin-top: 8rem;
    }

    &__title {
      @include subtitle;

        border-left: 3px solid $warning;
        border-right: 3px solid $warning;
        padding: 0 1rem;

        @media (min-width: 720px) {
            width: auto;
            display: inline-block;
            text-align: center;
            padding: 0 1rem;
        }
    }

    &__description {
      font-size: 1em;
      width: 90%;
      margin: 0 auto;
      text-align: center;

      @media (min-width: 768px) {
        width: 100%;

        text-align: justify;
      }
    }

  &__carousel-mobile {
    @media (min-width: 768px) {
      display: none;
    }
  }

}

.services-desktop {
    display: none;

    @media (min-width: 768px) {
        display: block;
    }

    /* &__icon {
        min-width: 80px;
    } */
}

.home-services-list {
    margin-top: 1rem;

    @media (min-width: 768px) {
        margin-top: 3rem;
    }
}

.list-2 {
    @media (min-width: 768px) {
        order: 2;
    }

    @media (min-width: 1200px) {
        order: 1;
    }
}

.list-3 {
    @media (min-width: 768px) {
        order: 1;
    }

    @media (min-width: 1200px) {
        order: 2;
    }
}
</style>
