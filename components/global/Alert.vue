<template>
  <!-- Alerta de confirmación -->
  <div>
    <v-alert :type="alert.type" dense text>
      {{ alert.message }}
    </v-alert>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    mounted() {
      // Este evento se utiliza para emitir una solicitud de actualización por ejemplo
      this.$emit('event')

      setTimeout(() => {

        let alert = {
          type: '',
          status: false,
          message: ''
        }

        // Emite este evento para ocultar la alerta
        this.$store.commit('setAlert', alert)
      }, 5000)
    },
    computed: {
      ...mapState(['alert'])
    }
  }
</script>

<style scoped>

</style>
