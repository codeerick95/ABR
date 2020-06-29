<template>
<main class="main-banner banner-projects-show">
    <!-- v-bind:style="{ background: 'url(' + image + ')' }" v-if="image && title" -->
    <div class="main-banner__gradient h-100">
        <header-app logo="white"></header-app>
        
        <div class="container h-100">
            <div class="main-banner__content h-100 d-flex align-items-end">
                <div class="main-banner__slot">
                    <h1 class="banner-projects-show__title" v-if="title">{{ title }}</h1>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import HeaderApp from '@/components/global/Header'

export default {
    props: ['image', 'title'],
    components: {
        HeaderApp
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.banner-projects-show {
    background-image: url('/proyectos/banner.jpg');
    height: 80vh;
    background-size: cover;
    color: white;
    background-position: center;
    position: relative;

    @media (min-width: 720px) {
        height: 50vh;
    }

    @media (min-width: 1200px) {
        height: 80vh;
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

    &__title {
        font-size: 1.4em;
        font-weight: 800;
        position: relative;

        @media (min-width: 720px) {
          font-size: 2.5em;
        }

        &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 100%;
            position: absolute;
            top: 0;
            left: -5%;
        }
    }

    &__description {
        font-size: 1em;

        @media (min-width: 1024px) {
            width: 50%;
        }
    }
}
</style>
