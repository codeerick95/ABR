<template>
<div class="contact-web">
    <div class="fb-customerchat"
        attribution=setup_tool
        page_id="1660616037524515"
        theme_color="#6699cc"
        logged_in_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor"
        logged_out_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor">
    </div>

    <banner-contact></banner-contact>

    <form-contact class="mt-1"></form-contact>

    <div class="container-fluid maps px-0">
        <div class="row">
            <div class="col-md-12">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.5905628886494!2d-77.04743118578736!3d-12.071667345649553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8e58662a1a9%3A0x69ca731a2b0de9c!2sint%20C%2C%20Jir%C3%B3n%20Lloque%20Yupanqui%20977%2C%20Jes%C3%BAs%20Mar%C3%ADa%2015072!5e0!3m2!1ses-419!2spe!4v1588775946948!5m2!1ses-419!2spe" width="100%" height="600" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
        </div>
    </div>

    <footer-app></footer-app>
</div>
</template>

<script>
  import { appConfig} from "../env";

  // Components
import BannerContact from '@/components/contact/Banner'
import FormContact from '@/components/contact/FormContact'
import FooterApp from '@/components/Footer'

export default {
    components: {
        BannerContact,
        FormContact,
        FooterApp
    },
  head () {
    let title = 'Contacto ABR Grupo Consultor', // Graph
      description = 'ABR Grupo Consultor, viene trabajando en proyectos que brindan apoyo y benefician al sector de la pequeña minería y minería artesanal, con el objetivo de empoderar al empresario minero a través de la formalización y sostenibilidad de su organización, brindando asistencia técnica y capacitación logrando el cumplimiento de la normativa del sector en las áreas de gestión minera, medio ambiente, seguridad y salud ocupacional, trazabilidad, gestión empresarial, exportación, políticas sociales de recursos humanos, etc.; para el cumplimiento de la normativa peruana y criterios y/o estándares de certificación.',
      appUrl = appConfig.appUrl,
      image = 'https://api.abrgrupoconsultor.pe/storage/app/imagenes_abr/abr-contacto.jpg',
      keywords = 'Contacto ABR Grupo Consultor - Teléfono Correo ABR',
      url = `${appUrl}/contacto`

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

.contact-web {
    .contact {
        .subtitle {
            display: none !important;
        }
    }
}

.address-icon {
    background-color: $primary;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: .5rem;
    border-radius: 50%;
}
</style>
