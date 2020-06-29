<template>
<div class="container values">
    <div class="row">
        <div class="col-md-12">
            <div class="text-center">
                <h2 class="values-subtitle mb-3 text-primary">NUESTROS VALORES</h2>
            </div>
        </div>
    </div>
    <div class="row mt-md-5">
        <div class="col-md-12">
            <b-carousel
                id="values-carousel"
                v-model="slide"
                :interval="3000"
                indicators
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                class="values-carousel"
                >

                <!-- Slides with custom text -->
                <b-carousel-slide class="values-slide w-100">
                    <div class="values-container w-100 px-3">
                        <card-value :title="getTitle(0)" :description="getDescription(0)">
                            <template slot="image-front">
                                <img v-lazy="getFrontImage(0)" :alt="getTitle(0)" class="value__image">
                            </template>
                            <template slot="image-back">
                                <img v-lazy="getBackImage(0)" :alt="getTitle(0)" class="value__image">
                            </template>
                        </card-value>
                        <card-value :title="getTitle(1)" :description="getDescription(1)">
                            <template slot="image-front">
                                <img v-lazy="getFrontImage(1)" :alt="getTitle(1)" class="value__image">
                            </template>
                            <template slot="image-back">
                                <img v-lazy="getBackImage(1)" :alt="getTitle(1)" class="value__image">
                            </template>
                        </card-value>

                      <card-value :title="getTitle(2)" :description="getDescription(2)">
                        <template slot="image-front">
                          <img v-lazy="getFrontImage(2)" :alt="getTitle(2)" class="value__image">
                        </template>
                        <template slot="image-back">
                          <img v-lazy="getBackImage(2)" :alt="getTitle(2)" class="value__image">
                        </template>
                      </card-value>

                    </div>
                </b-carousel-slide>

                <b-carousel-slide class="values-slide w-100">
                    <div class="values-container w-100 px-3">

                        <card-value :title="getTitle(3)" :description="getDescription(3)">
                            <template slot="image-front">
                                <img v-lazy="getFrontImage(3)" :alt="getTitle(3)" class="value__image">
                            </template>
                            <template slot="image-back">
                                <img v-lazy="getBackImage(3)" :alt="getTitle(3)" class="value__image">
                            </template>
                        </card-value>
                        <card-value :title="getTitle(4)" :description="getDescription(4)">
                            <template slot="image-front">
                                <img v-lazy="getFrontImage(4)" :alt="getTitle(4)" class="value__image">
                            </template>
                            <template slot="image-back">
                                <img v-lazy="getBackImage(4)" :alt="getTitle(4)" class="value__image">
                            </template>
                        </card-value>

                      <card-value :title="getTitle(5)" :description="getDescription(5)">
                        <template slot="image-front">
                          <img v-lazy="getFrontImage(5)" :alt="getTitle(5)" class="value__image">
                        </template>
                        <template slot="image-back">
                          <img v-lazy="getBackImage(5)" :alt="getTitle(5)" class="value__image">
                        </template>
                      </card-value>

                    </div>
                </b-carousel-slide>

            </b-carousel>
        </div>

        <!-- Mobile -->
        <div class="col-md-12">
            <b-carousel
                id="values-carousel-mobile"
                v-model="slideMobile"
                :interval="3000"
                indicators
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                class="values-carousel--mobile"
                >

                <!-- Slides with custom text -->
                <b-carousel-slide class="values-slide w-100" v-for="(value, index) in itemsValues" :key="index">
                    <div class="values-container w-100 p-1">

                        <card-value :key="index" :title="getTitle(index)" :description="getDescription(index)">
                            <template slot="image-front">
                                <img :src="getFrontImage(index)" :alt="getTitle(index)" class="value__image">
                            </template>title
                            <template slot="image-back">
                                <img :src="getBackImage(index)" :alt="getTitle(index)" class="value__image">
                            </template>
                        </card-value>

                    </div>
                </b-carousel-slide>



            </b-carousel>
        </div>
    </div>
</div>
</template>

<script>
import CardValue from './CardValue'

export default {
    data() {
        return {
            itemsValues: [
                {
                    imageFront: '/valores/CON_FONDO/compromiso-pasion.png',
                    imageBack: '/valores/SIN_FONDO/compromiso-pasion.png',
                    title: 'Compromiso',
                    description: 'En cada trabajo que realizamos ponemos nuestro esfuerzo y dedicación.'
                },
                {
                    imageFront: '/valores/CON_FONDO/responsabilidad.png',
                    imageBack: '/valores/SIN_FONDO/responsabilidad.png',
                    title: 'Responsabilidad',
                    description: 'Hacemos nuestras actividades con eficiencia y eficacia, tomando las mejores decisiones.'
                },
                {
                    imageFront: '/valores/CON_FONDO/integridad.png',
                    imageBack: '/valores/SIN_FONDO/integridad.png',
                    title: 'Integridad y Ética',
                    description: 'Actuamos y nos relacionamos con coherencia, honestidad y respeto. Actuamos de forma responsable, acorde a nuestros principios.'
                },
                {
                    imageFront: '/valores/CON_FONDO/seguridad.png',
                    imageBack: '/valores/SIN_FONDO/seguridad.png',
                    title: 'Seguridad',
                    description: 'Operamos con seguridad, procurando las mejores condiciones en cada labor que realizamos.'
                },
                {
                    imageFront: '/valores/CON_FONDO/competancia-profesional.png',
                    imageBack: '/valores/SIN_FONDO/competencia-profesional.png',
                    title: 'Competencia Profesional',
                    description: 'Conocimiento, seriedad y efectividad en lo que hacemos.'
                },
                {
                    imageFront: '/valores/CON_FONDO/trabajo-equipo.png',
                    imageBack: '/valores/SIN_FONDO/trabajo-equipo.png',
                    title: 'Trabajo en Equipo',
                    description: 'Trabajamos en equipo, generando sinergias y logrando resultados comunes.'
                }
            ],
            slide: 0,
            slideMobile: 0,
            sliding: null
        }
    },
    props: ['textColor'],
    components: {
        CardValue
    },
    methods: {
        getFrontImage(index) {
            return this.itemsValues[index].imageFront
        },
        getBackImage(index) {
            return this.itemsValues[index].imageBack
        },
        getTitle(index) {
            return this.itemsValues[index].title
        },
        getDescription(index) {
            return this.itemsValues[index].description
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

.values {
    .values-carousel {
        display: none;

        @media (min-width: 720px) {
            display: block;
        }

        &--mobile {
            @media (min-width: 720px) {
                display: none;
            }
        }
    }

    .carousel-indicators {
        bottom: -3rem;

        li {
            background-color: $primary;
            width: .7em;
            height: .7em;
            border-radius: 50%;
            opacity: 1;
            outline: none;
        }

        .active {
            background-color: $warning;
        }
    }
}

.values-slide {
    min-height: 240px;

    .carousel-inner {
        width: 100%;
        height: 400px;
    }

    .carousel-caption {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        text-align: center;
    }
}

.value__image {
    width: 20%;
}

.values-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 200px;
    grid-gap: 1em;

    @media (min-width: 720px) {
        grid-template-columns: repeat(3, 1fr);
    }
}

.values-subtitle {
    @include subtitle;
    display: inline-block;
    padding: 0 1rem;
    border-left: 3px solid $warning;
    border-right: 3px solid $warning;
}

</style>
