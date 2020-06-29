<template>
<div class="home">
  <!-- Load Facebook SDK for JavaScript -->
  <div id="fb-root" class="m-0"></div>

  <div class="fb-customerchat"
    attribution=setup_tool
    page_id="1660616037524515"
    theme_color="#6699cc"
    logged_in_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor"
    logged_out_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor">
  </div>

  <!-- Banner -->
  <main-carousel></main-carousel>

  <!-- About -->
  <home-about></home-about>

  <template v-if="loadingComponents">
    <!-- Services -->
    <home-services></home-services>

    <!-- Projects -->
    <home-projects></home-projects>

    <!-- Blog -->
    <home-blog></home-blog>
  </template>

  <!-- Contact -->
  <form-contact></form-contact>

  <!-- Footer -->
  <footer-app></footer-app>
</div>
</template>

<script>
  import { appConfig } from '@/env'

// Components
import MainCarousel from '@/components/home/carousel/MainCarousel'
import HomeAbout from '@/components/home/About'
import HomeServices from '@/components/home/Services'
import HomeProjects from '@/components/home/Projects'
import HomeBlog from '@/components/home/Blog'
import FormContact from '@/components/contact/FormContact'
import FooterApp from '@/components/Footer'

export default {
  data() {
    return {
      loadingComponents: false
    }
  },
  components: {
    MainCarousel,
    HomeAbout,
    HomeServices,
    HomeProjects,
    HomeBlog,
    FormContact,
    FooterApp
  },
  mounted() {
    this.$store.commit('setServices')

    setTimeout(() => {
      this.loadingComponents = true
    }, 1200)
  },
  head () {
    let title = 'ABR Grupo Consultor y Asociados S.A.C.',
      description = appConfig.description,
      logo = appConfig.logoABR,
      url = appConfig.appUrl

    return {
      title,
      meta: [
        // Twitter Card
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description},
        {name: 'twitter:image', content: logo},

        // Facebook OpenGraph
        {property: 'og:url', content: url},
        {property: 'og:title', content: title},
        {property: 'og:site_name', content: title},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content: logo},
        {property: 'og:description', content: description},

        // Whatsapp OpenGraph
        {property: 'og:url', content: url},
        {property: 'og:title', content: title},
        {property: 'og:site_name', content: title},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content: logo},
        {property: 'og:description', content: description}
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;800&display=swap');

.v-application.v-application--is-ltr.theme--light {
    background-image: url('/global/fondo.jpg');
    background-size: contain;
    background-repeat: repeat;
}

.v-application--wrap {
    background-color: rgba(white, .9);
}

.home {
  .btn-outline-secondary:hover {
    background-color: $primary;
    border: 1px solid $primary;
  }
}

.subtitle {
  font-size: 2.5em;
  font-weight: 800;
  color: $primary;
  border-left: 3px solid $warning;
  border-right: 3px solid $warning;
}

.description {
  color: $secondary;
  font-weight: 400;
}

.btn--icon {
  max-width: 10px;
}

.text-transform-none {
  text-transform: none;
}
</style>
