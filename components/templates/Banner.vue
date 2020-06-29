<template>
<!-- La idea de este template es no tener muchos estilos para luego ser usado en otro scomponente con estilos propios -->
<main class="main-banner">
    <div class="main-banner__gradient h-100">
        <header-app logo="white"></header-app>
        
        <div class="container h-100">
            <div class="main-banner__content h-100 d-flex align-items-end">
                <div class="main-banner__slot">
                    <slot name="description">
                    </slot>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
// Components 
import HeaderApp from '@/components/global/Header'

export default {
    props: ['content'],
    components: {
        HeaderApp
    }
}
</script>

<style lang="scss">
.main-banner {
    .container {
        z-index: 1000;
    }

    &__slot {
        z-index: 10;
        padding: 5rem 0;
    }
}

.main-banner__gradient {
    width: 100%;
    height: 100%;
    position: relative;

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

.main-banner__content {
    width: 95%;
    height: 100% !important;
    margin: 0 auto;
}
</style>