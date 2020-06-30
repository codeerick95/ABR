<template>
<div class="container team">
    <!-- Team description -->
    <div class="row justify-content-center">
        <div class="col-9 col-lg-10">
            <div class="text-center">
                <h2 class="team__subtitle mb-3 text-primary">NUESTRO EQUIPO</h2>
            </div>
        </div>
        <div class="col-12">
            <p class="team__description mt-5 mb-0 mx-auto">
                ABR, cuenta con un equipo de profesionales multidisciplinarios altamente capacitados y con una amplia experiencia, dedicados y especializados en temas contables, laborales, tributarios y financieros; en el ámbito tecnológico, servicios especializados en ingeniería, medio ambiente, Salud y Seguridad, técnicos operativos y logísticos.
                El cual garantiza un servicio, altamente calificado basado en la planeación, implementación y soluciones integrales ante necesidades y requerimientos de nuestros clientes.
            </p>

        </div>
    </div>

    <div class="row justify-content-center team-members">
        <div class="col-md-12">
            <b-carousel
                id="carousel-2"
                v-model="slide"
                :interval="5000"
                indicators
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                class="team-carousel--desktop"
                >

                    <!-- Slides with custom text -->
                    <b-carousel-slide class="team-carousel__slide h-100">
                        <div class="row h-100">
                            <div class="col-4">
                                <card-team :item="team[0]"></card-team>
                            </div>

                            <div class="col-4">
                                <card-team :item="team[1]"></card-team>

                            </div>

                            <div class="col-4">
                                <card-team :item="team[2]"></card-team>
                            </div>
                        </div>
                    </b-carousel-slide>

                    <b-carousel-slide class="team-carousel__slide h-100">
                        <div class="row h-100">
                            <div class="col-4">
                                <card-team :item="team[3]"></card-team>
                            </div>

                            <div class="col-4">
                                <card-team :item="team[4]"></card-team>
                            </div>

                            <div class="col-4">
                                <card-team :item="team[5]"></card-team>
                            </div>
                        </div>
                    </b-carousel-slide>

                    <b-carousel-slide class="team-carousel__slide h-100">
                        <div class="row h-100">
                            <div class="col-4">
                                <card-team :item="team[6]"></card-team>
                            </div>

                            <div class="col-4">
                                <card-team :item="team[7]"></card-team>
                            </div>

                            <div class="col-4">
                                <card-team :item="team[8]"></card-team>
                            </div>
                        </div>
                    </b-carousel-slide>

                    <b-carousel-slide class="team-carousel__slide h-100">
                        <div class="row justify-content-center h-100">
                            <div class="col-4">
                                <card-team :item="team[9]"></card-team>
                            </div>

                            <div class="col-4">
                                <card-team :item="team[10]"></card-team>
                            </div>
                        </div>
                    </b-carousel-slide>
                </b-carousel>
        </div>

        <div class="col-md-12">
            <b-carousel
                id="carousel-fade"
                indicators
                :interval="5000"
                class="carousel-mobile"
            >
                <b-carousel-slide
                v-for="(item, index) in team" :key="item.id"
                >

                <!-- Card -->
                <card-team :item="item" :index="index"></card-team>

                </b-carousel-slide>
            </b-carousel>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

// Components
import CardTeam from './CardTeam'

export default {
    data() {
        return {
            slide: 0,
            sliding: null,
            items: 9
        }
    },
    mounted() {
        this.$store.commit('setTeam')
    },
    components: {
        CardTeam
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
        ...mapState(['team'])
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.team {
    margin-top: 6rem;

    &__subtitle {
        @include subtitle;
        display: inline-block;
        padding: 0 1rem;
        border-left: 3px solid $warning;
        border-right: 3px solid $warning;
    }

    &__description {
      text-align: center;

      @media (min-width: 720px) {
        text-align: justify;
        width: 80%;
      }
    }

    .carousel-mobile {

        .card {
            min-height: 360px;
        }

        .carousel-caption {
            position: static;
        }

        .carousel-fade .carousel-item {
            background-color: $primary;
            width: 95%;
            min-height: 350px;

            .card-title,
            .card-subtitle {
                font-weight: 400;
            }
        }

        .carousel-indicators {
            bottom: -2rem;

            @media (min-width: 768px) {
                bottom: -1rem;
            }

            li {
                background-color: $primary;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                opacity: 1;
            }

            li.active {
                background-color: $warning;
            }
        }

        @media (min-width: 720px) {
            display: none;
        }
    }

}


/* Este csrousel solo se muestra a partir de 720px */
.team-carousel--desktop {
    height: 420px;
    display: none;

     @media (min-width: 720px) {
        min-height: 300px;
        display: block;
    }

    .carousel-inner {
        width: 100%;
        height: 100%;
    }

    .carousel-caption {
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
    }

    .team-card__title {
        font-size: 1em;
        font-weight: 400;
        color: $secondary;

        @media (min-width: 1024px) {
            font-size: 1.2em;
        }
    }

    .team-card__description {
        font-size: .9em;
        color: $primary;
        font-weight: 700;

        @media (min-width: 1024px) {
            font-size: 1em;
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

    .carousel-indicators {
        bottom: 0;

        @media (min-width: 720px) {
            bottom: -3rem;
        }

        @media (min-width: 1024px) {
            bottom: -3rem;
        }
    }

    ol#carousel-fade___BV_indicators_ {
        display: none !important;
    }
}

.team-card {
    /* width: 90%; */
    /* min-height: 400px; */
    border: none;
    border-bottom: 3px solid $warning;
    -webkit-box-shadow: 0px 0px 12px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 12px -3px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 12px -3px rgba(0,0,0,0.75);
    height: 100%;

    /* @media (min-width: 1024px) {
        min-height: 350px;
    } */
}
</style>
