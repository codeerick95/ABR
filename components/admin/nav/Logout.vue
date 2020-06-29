<template>
  <v-list-item
    link
    @click="logout()"
  >
    <v-list-item-icon>
              <span class="material-icons">
                exit_to_app
              </span>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ loading ? 'Saliendo...' : 'Salir' }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import { appConfig } from "@/env";

  // Components
  import NavHead from './NavHead'

export default {
  data() {
    return {
      loading: false
    }
  },
  components: {
    NavHead
  },
  methods: {
    logout() {
      this.loading = true

      setTimeout(() => {
        // Elimina la cookie que guarda el token
        this.$cookies.remove(appConfig.nameToken)
        this.$cookies.remove(appConfig.nameUser)
        this.$cookies.remove(appConfig.photoUser)
        this.$cookies.remove(appConfig.emailUser)
        this.$cookies.remove('type_user')

        this.loading = false

        this.$router.push('/')
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &__logo {
    width: 140px;
  }
}
</style>
