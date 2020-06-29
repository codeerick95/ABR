<template>
  <div class="error" v-if="object">
    <div class="error__content">
      <h1 class="error__title">{{ message }}</h1>
      <nuxt-link :to="object.url" class="btn btn-warning text-white">Ir a {{ object.url === '/blog' ? 'blog' : 'proyectos' }}</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Cargando...'
      }
    },
    props: ['object'],
    mounted() {
      setTimeout(() => {
          this.message = `No existe ${ this.object.title }.`
      }, 2500)
    }
  }
</script>

<style lang="scss">
  @import '../../scss/variables';

  .error {
    width: 100%;
    height: 100vh;

    background-image: url('/slide-home/SOBRE_NOSOTROS-d.jpg');

    &__content {
      width: 100%;
      height: 100%;

      background-color: rgba($primary, .9);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__title {
      font-size: 2em;
      font-weight: 700;

      color: white;
    }
  }
</style>
