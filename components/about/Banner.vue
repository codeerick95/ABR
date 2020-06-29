<template>
<banner class="banner-about">
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

.banner-about {
    height: 60vh;
    background-image: url('/about/PORTADA.jpg');
    background-size: cover;
    position: relative;

    @media (min-width: 728px) {
        background-position: center;
        height: 50vh;
    }

    @media (min-width: 1200px) {
        min-height: 80vh;
    }
}
</style>
