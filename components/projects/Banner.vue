<template>
<banner class="banner-projects">
    <template slot="description">
        <h1 class="banner-projects__title mb-3">Proyectos</h1>
        <p class="banner-projects__description banner-projects__description--mobile">
            ABR Grupo Consultor, somos especialistas en proyectos de índole social
            que apoyen al sector de la Pequeña Minería y Minería Artesanal – MAPE.
        </p>

        <p class="banner-projects__description banner-projects__description--desktop text-md-justify">
            ABR Grupo Consultor, somos especialistas en proyectos de índole social
            que apoyen al sector de la Pequeña Minería y Minería Artesanal – MAPE,
            a implementar estándares de certificación y buenas prácticas para la
            producción de un Oro Responsable.
        </p>
    </template>
</banner>
</template>

<script>
// Components
import Banner from '@/components/templates/Banner'


export default {
    components: {
        Banner
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.banner-projects {
    height: 60vh;
    background-image: url('/proyectos/banner.jpg');
    background-size: cover;
    color: white;
    position: relative;

    @media (min-width: 720px) {
        height: 40vh;
    }

    @media (min-width: 1200px) {
        height: 90vh;
    }

    .main-banner__gradient {
        &::before {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }


    @media (min-width: 720px) {
        max-height: 50vh;

        background-position: 0 0;

        .main-banner__gradient {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgb(39,72,133);
            background: linear-gradient(90deg, rgba(39,72,133,1) 0%, rgba(39,72,133,0.13769257703081228) 100%);
        }
    }

    @media (min-width: 1024px) {
        max-height: 90vh;

        background-position: 0 0;

        .main-banner__gradient {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgb(39,72,133);
            background: linear-gradient(90deg, rgba(39,72,133,1) 0%, rgba(39,72,133,0.13769257703081228) 100%);
        }
    }

    &__title {
        @include subtitle;
        line-height: 1em;
        position: relative;

        &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 100%;
            position: absolute;
            top: 0;
            left: -2%;
        }
    }

    &__description {
        font-size: 1em;

        @media (min-width: 1024px) {
            width: 50%;
        }

        &--mobile {
            @media (min-width: 768px) {
                display: none;
            }
        }

        &--desktop {
            display: none;

            @media (min-width: 768px) {
                display: block;
            }
        }
    }
}
</style>
