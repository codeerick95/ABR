<template>
  <div class="error-page">
    <div class="error-page__content">
      <h1 class="error-page__title text-white">Página no encontrada</h1>
      <v-btn color="warning" to="/">Inicio</v-btn>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @import '../scss/variables';

.error-page {
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

    color: $primary;
  }
}
</style>
