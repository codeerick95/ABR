<template>
<div>
  <img src="../assets/icons/LOGO-01.svg" alt="" class="logo__image" v-if="logo === 'white'">
</div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['logo']
}
</script>

<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
