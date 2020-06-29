<template>
<banner class="banner-blog">
    <template slot="description">
        <slot name="title">
        </slot>
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
.banner-blog {
    height: 60vh;
    background-image: url('/blog/abr-blog-portada.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    color: white;

    @media (min-width: 728px) {
        height: 50vh;
    }

    @media (min-width: 1200px) {
        height: 80vh;
    }

    &__title {
        @include subtitle;
        font-size: 1em;
        line-height: 1em;
        position: relative;

        &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 100%;
            position: absolute;
            top: 0;
            left: -3%;

            @media (min-width: 1200px) {
                left: -2%;
            }
        }

        &--index {
            
            @media (min-width: 1200px) {
                font-size: 3em;
            }

            &::before {
                content: '';
                background-color: $warning;
                width: 3px;
                height: 100%;
                position: absolute;
                top: 0;
                left: -10%;
            }
        }
    }
}
</style>
