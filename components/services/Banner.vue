<template>
<main class="banner-service" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
    <header-app logo="white"></header-app>

    <div class="banner-title-content text-center">
        <h1 class="banner-title px-2 text-primary">{{ title }}</h1>
    </div>
</main>
</template>

<script>
// Components
import HeaderApp from '@/components/global/Header'


export default {
    components: {
        HeaderApp
    },
    props: ['title', 'image']
}
</script>

<style lang="scss">
@import '../../scss/variables';

.banner-service {
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    min-height: 70vh;
    position: relative;

    @media (min-width: 720px) {
        background-position: center;
        min-height: 50vh;
    }

    @media (min-width: 1200px) {
        min-height: 80vh;
    }

    &::before {
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

.banner-title-content {
    width: 80%;
    background-color: white;
    position: absolute;
    bottom: -10%;
    left: 10%;
    padding: 2rem 0;
    border-radius: 2rem;

    @media (min-width: 768px) {
        width: 60%;
        left: 20%;
    }

    .banner-title {
        @include subtitle;
        display: inline-block !important;
        max-width: 80%;

        @media (min-width: 1024px) {
            border-left: 3px solid $warning;
            border-right: 3px solid $warning;
        }
    }
}


</style>
