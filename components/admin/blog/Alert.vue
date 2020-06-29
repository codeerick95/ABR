<template>
  <v-alert type="success" dense text>
    {{ message }}
  </v-alert>
</template>

<script>
  export default {
    mounted() {
      setTimeout(() => {

        // Emite este evento para ocultar la alerta
        this.$emit('closeAlert')
      }, 3000)
    },
    props: ['message']
  }
</script>

<style scoped>

</style>
