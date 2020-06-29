<template>
<div class="about">
    <div class="fb-customerchat"
        attribution=setup_tool
        page_id="1660616037524515"
        theme_color="#6699cc"
        logged_in_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor"
        logged_out_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor">
    </div>

    <banner-about></banner-about>

    <description-about></description-about>

    <values></values>

    <team></team>

    <clients></clients>

    <footer-app class="footer"></footer-app>
</div>
</template>

<script>
  import { appConfig } from "../env";
  // Components
import BannerAbout from '@/components/about/Banner'
import DescriptionAbout from '@/components/about/Description'
import Values from '@/components/about/Values'
import Team from '@/components/about/Team'
import Clients from '@/components/about/Clients'
import FooterApp from '@/components/Footer'

export default {
    components: {
        BannerAbout,
        DescriptionAbout,
        Values,
        Team,
        Clients,
        FooterApp
    },
    head () {
    let title = 'Sobre Nosotros ABR Grupo Consultor', // Graph
      description = appConfig.description,
      appUrl = appConfig.appUrl,
      image = 'https://api.abrgrupoconsultor.pe/storage/app/imagenes_abr/abr-sobre-nosotros.jpg',
      keywords = 'Sobre Nosotros Grupo Consultor - Teléfono Correo ABR',
      url = `${appUrl}/sobre-nosotros`

    return {
      title: title,
      meta: [
        { name: "keywords", content: keywords },
        { name: "description", content: description },

        // Twitter Card
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description},
        {name: 'twitter:image', content: image},

        // Facebook OpenGraph
        {property: 'og:title', content: title},
        {property: 'og:site_name', content: title},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content:  image},
        {property: 'og:description', content: description},
        {property: 'og:url', content: url},

        // Whatsapp OpenGraph
        {property: 'og:title', content: title},
        {property: 'og:site_name', content: title},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content:  image},
        {property: 'og:description', content: description},
        {property: 'og:url', content: url},
      ]
    }
  },
}
</script>

<style lang="scss">
.about {
    .btn-outline-secondary:hover {
        background-color: $primary;
        border: 1px solid $primary;
    }
}

.footer {
    margin-top: 3rem;
}
</style>
