<template>
  <v-list-item class="position-relative">
    <v-list-item-content class="d-flex">
      <div class="logo-container d-flex justify-content-center">
        <img src="/logo-azul.png" alt="Logo ABR Grupo consultor" class="dashboard__logo">
      </div>

      <div class="d-inline-block text-center mt-3">
        <v-list-item-subtitle>
          <span class="nav-head__title">Administrador</span>
        </v-list-item-subtitle>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @import '../../../scss/variables';

  .nav-head__title {
    font-size: 1.3em;
    font-weight: 700;
    color: rgba($dark, .7);
  }
</style>
