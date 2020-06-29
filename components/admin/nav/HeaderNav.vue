<template>
  <div>
    <v-app-bar
      color="primary accent-4"
      dense
      dark
      app
    >
      <!--<v-app-bar-nav-icon @click="$emit('toggleSidebar')"></v-app-bar-nav-icon>-->

      <v-toolbar-title>Panel de administración</v-toolbar-title>

      <v-spacer></v-spacer>

      <notifications class="mr-5"></notifications>
    </v-app-bar>
  </div>
</template>

<script>
  import Notifications from "../notifications/Notifications";

  export default {
    components: {
      Notifications
    }
  }
</script>

<style lang="scss" scoped>
  /* Sobreeescribe clase de Vuetify */
  header.v-sheet.v-sheet--tile.theme--dark {
    position: relative !important;
    z-index: 100;
  }
</style>
