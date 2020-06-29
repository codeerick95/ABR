<template>
<div class="container home-about">
    <div class="row">
        <div class="col-xl-5 pt-0 pl-xl-5 home-about__description">
            <h2 class="home-about__title text-primary mb-3 mt-0 pt-0">
                <span class="home-about__title--break">QUIENES</span>
                SOMOS
            </h2>

            <p class="home-about__description">
                ABR Grupo Consultor y Asociados S.A.C. es una consultora privada con más de 10 años de experiencia en el mercado, creada con el propósito de ofrecer servicios empresariales integrales orientados en brindar asesorías, asistencia técnica, capacitación, alternativas de soluciones hacia la mejora empresarial.
                Ofrecemos servicios a diversos sectores como minería, industria, comercio, servicios y demás actividades económicas.
            </p>


        </div>

        <div class="col-xl-7 home-about__image d-flex justify-content-end align-items-end p-3">
            <v-btn to="/sobre-nosotros" class="mx-2 px-5 btn-primary text-decoration-none" small outlined color="white">
                <span class="d-inline-block mt-1">
                    Leer más
                </span>
                <img src="../../assets/icons/arrow-right.svg" alt="" class="btn--icon mt-1 ml-3">
            </v-btn>
        </div>
    </div>
</div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
@import '../../scss/variables';

.home-about {
    margin-top: 3rem;

    @media (min-width: 1024px) {
      margin-top: 10rem;
    }

    &__title {
        @include subtitle;
        width: 100%;
        display: inline-block;

        &--break {
            display: inline-block;
            position: relative;
            padding-left: 1rem;

            @media (min-width: 1200px) {
                display: block;
                padding-left: 0;
            }

            &::before {
                content: '';
                background-color: $warning;
                width: 3px;
                height: 80%;
                position: absolute;
                top: .2rem;
                left: 0;

              @media (min-width: 768px) {
                top: .5rem;
              }

                @media (min-width: 1200px) {
                    left: -5%;
                }
            }
        }
    }

    &__description {
      text-align: center;

      @media (min-width: 768px) {
        max-width: 90%;
        text-align: justify;
      }
    }

    .btn-info {
        text-decoration: none;
        transition: background-color .7s;

        &:hover {
            border: 1px solid $primary;
            background-color: $primary;
        }
    }

    &__image {
        background-image: url('/slide-home/SOBRE_NOSOTROS-d.jpg');
        background-size: cover;
        background-position: center;
        border-radius: .1rem;
        min-height: 300px;

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
            border-radius: .1rem;
        }
    }
}
</style>
