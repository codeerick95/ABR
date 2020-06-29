<template>
<div class="container home-projects">
    <!-- Projects description -->
    <div class="row justify-content-center text-center">
        <div class="col-lg-10">
            <div class="text-center">
                <h2 class="home-projects__subtitle text-primary mb-3">NUESTROS PROYECTOS</h2>
            </div>

            <p class="description mt-3">
                ABR Grupo Consultor, somos especialistas en proyectos de índole social que apoyen
                al sector de la Pequeña Minería y Minería Artesanal - MAPE, a implementar
                estándares de certificación y buenas prácticas para la producción de un Oro Responsable.
            </p>
        </div>
    </div>

    <!-- Projects images -->
    <div class="row mt-5 home-projects-desktop">
        <div class="col-md-3 px-0 px-lg-1">
            <div class="home-projects__image-container">
                <img v-lazy="'/home/proyectos/abr-actividades-fidami.jpg'" alt="Proyecto Fidami" class="img-fluid">
            </div>
        </div>

        <div class="col-md-3 px-0 px-lg-1">
            <div class="home-projects__image-container">
                <img v-lazy="'/home/proyectos/abr-actividades-minero.jpg'" alt="Actividades minería" class="img-fluid">
            </div>
        </div>

        <div class="col-md-3 px-0 px-lg-1">
            <div class="home-projects__image-container">
                <img v-lazy="'/home/proyectos/proyecto-mineria.jpg'" alt="Proyecto minería" class="img-fluid">
            </div>
        </div>


        <div class="col-md-3 px-0 px-lg-1">
            <div class="home-projects__image-container">
                <img v-lazy="'/home/proyectos/abr-actividades-cencomit.jpg'" alt="Actividades cencomit" class="img-fluid">
            </div>
        </div>
    </div>

    <!-- Carousel mobile -->
    <carousel-projects v-if="showSliders"></carousel-projects>

    <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
            <v-btn to="/proyectos" color="primary" min-width="150px" class="text-transform-none text-decoration-none mt-3 px-5">
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
import CarouselProjects from './carousel/CarouselProjects'

export default {
  data() {
    return {
      showSliders: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.showSliders = true
    }, 2000)
  },
  components: {
      CarouselProjects
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.home-projects {
    margin-top: 3rem;

    @media (min-width: 1024px) {
        margin-top: 8rem;
    }

    &__subtitle {
        @include subtitle;
        width: 100%;
        display: inline-block;
        padding: 0;
        border-left: 3px solid $warning;
        border-right: 3px solid $warning;

        @media (min-width: 768px) {
            width: auto;
            padding: 0 1rem;
        }
    }

    .btn {
        background-color: $primary !important;
        color: white;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
    }

    &-desktop {
        display: none;

        @media (min-width: 1024px) {
            display: flex;
        }
    }
}

.home-projects__image-container {
    background-color: $primary;
    height: 180px;
    border-radius: .1rem;
    position: relative;

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

        &:hover {
            background-color: $primary;
        }
    }

    .img-fluid {
        width: 100%;
        height: 100% !important;
        border-radius: .1rem;
    }
}
</style>
