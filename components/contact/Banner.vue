<template>
<main class="banner-contact">
    <div class="banner-gradient">
        <div class="container banner-contact-info h-100">
            <!-- Header -->
            <header-app></header-app>

            <div class="d-flex align-items-center h-100 banner-contact-title-container">
                <h1 class="banner-contact-title text-white pl-3">CONTÁCTANOS</h1>
            </div>
        </div>
    </div>
</main>
</template>

<script>
// Components
import HeaderApp from '@/components/global/Header'


export default {
    components: {
        HeaderApp
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.banner-contact {
    background-image: url('/contact/banner.jpg');
    background-size: cover;
    background-position: center;
    min-height: 60vh;
    position: relative;

    .banner-gradient {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgb(39,72,133);
        background: linear-gradient(90deg, rgba(39,72,133,1) 0%, rgba(39,72,133,0.13769257703081228) 100%);
    }

    @media (min-width: 720px) {
        min-height: 50vh;
    }

    @media (min-width: 1200px) {
        min-height: 70vh;
    }

    .banner-contact-info {
        z-index: 1000 !important;
    }

    &-title-container {
        width: 90%;
        margin: 4rem 0;
    }

    &-title {
        @include subtitle;
        border-left: 3px solid $warning;
        z-index: 10;
    }
}
</style>
