<template>
<div>
    <div class="fb-customerchat"
        attribution=setup_tool
        page_id="1660616037524515"
        theme_color="#6699cc"
        logged_in_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor"
        logged_out_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor">
    </div>

    <div class="publications container">
        <header-app color="white"></header-app>

        <publications-list class="publications-desktop"></publications-list>

        <carousel-publications></carousel-publications>
    </div>

    <footer-app class="mt-5"></footer-app>

</div>
</template>

<script>
  import { appConfig } from "../env";

  // Components
  import HeaderApp from '@/components/global/Header'
  import PublicationsList from '@/components/publications/List'
  import CarouselPublications from '@/components/publications/CarouselPublications'
  import FooterApp from '@/components/Footer'

export default {
    data() {
        return {
            title: 'Publicaciones - ABR Grupo Consultor y Asociados S.A.C.',
            description: 'Sómos consultores en gestión Minera, Empresarial y brindamos asistencia en proyectos para la pequeña minería, minería artesanal y otras actividades económicas.',
        }
    },
    components: {
        HeaderApp,
        PublicationsList,
        CarouselPublications,
        FooterApp
    },
  head () {
    let title = 'Publicaciones ABR Grupo Consultor', // Graph
      description = appConfig.description,
      appUrl = appConfig.appUrl,
      image = appConfig.logoABR,
      keywords = 'Publicaciones, GUÍAS, LIBROS, CALENDARIO MAPE, TRÍPTICOS, Fact-Sheet, ABR grupo consultor',
      url = `${appUrl}/publicaciones`

    return {
      title: title,
      meta: [
        { name: "keywords", content: keywords },
        { name: "description", content: description },
        // Twitter Card
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description},
        // image must be an absolute path
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
@import '../scss/variables';

.publications-desktop {
    display: none;

    @media (min-width: 720px) {
        display: flex;
    }
}

.publications {
    .carousel-mobile {
        .card {
            min-height: 370px;
        }

        .card-img-container {
            height: 140px;
        }

        .carousel-caption {
            position: static;
        }

        .carousel-fade .carousel-item {
            width: 95%;
            min-height: 350px;

            .card-title,
            .card-subtitle {
                font-weight: 400;
            }
        }

        .carousel-indicators {
            bottom: -2rem;

            @media (min-width: 768px) {
                bottom: -1rem;
            }

            li {
                background-color: $primary;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                opacity: 1;
            }

            li.active {
                background-color: $warning;
            }
        }

        @media (min-width: 768px) {
            display: none;
        }
    }

    .carousel {
        height: 450px;
    }

    .header {
        .btn-outline-secondary {
            border: 1px solid $primary;
            color: $primary !important;

            &:hover {
                background-color: $primary !important;
                color: white !important;
            }
        }

        .nav-link {
            color: $primary !important;
        }

        .nuxt-link-active {
            color: white !important;
            background-color: $primary;
            border: 1px solid $primary;
        }
    }
}
</style>
