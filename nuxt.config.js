// Datos estáticos
import { services } from './utilities/api/services'
import { appConfig } from './env'

// const { createApolloFetch } = require('apollo-fetch')

/*let dynamicRoutes = () => {
  const uri = appConfig.graphUrl
  const apolloFetch = createApolloFetch({ uri })
  const query = `
      query blogs_get($page: Int, $number_paginate: Int) {
        blogs_get(page: $page, number_paginate: $number_paginate){
          id
          titleBlog
        }
      }`

  const page = 1,
      number_paginate = 5

  const variables = {
    page,
    number_paginate
  }

    return apolloFetch({ query, variables }).then(result => {
      console.log(result)
      return result.data.blogs_get.map(post => `blog/${post.id}`)
    }).catch(error => {
      console.log(error)
    })

  /!*return new Promise(resolve => {
    resolve(services.map(service => `servicios/${service.slug}`))
  })*!/
}*/

let dynamicRoutes = () => {
  return new Promise(resolve => {
    resolve(services.map(service => `servicios/${service.slug}`))
  })
}

export default {
  mode: 'universal',
  generate: {
    routes: dynamicRoutes,
    collapseWhitespace: false
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'es'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;800&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.1.1/css/froala_editor.min.css'},
    ],
    script: [
      { src: '/facebook/button.js' },
      { src: 'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v7.0&appId=248108613206757&autoLogAppEvents=1' },
      { src: 'https://kit.fontawesome.com/3bd84f9f96.js' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#DDA223' },
  /*
  ** Global CSS
  */
  css: [
    './scss/bootstrap_custom.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/vue-lazyload",
    {src: "~/plugins/editor.js", mode: 'client'},
    {src: "~/plugins/ckeditor.js", mode: 'client'},
    {src: "~/plugins/swiper-slide.js", mode: 'client'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    [
      '@nuxtjs/moment', {
        locales: ['es'],
        timezone: true,
        defaultTimezone: 'America/Lima'
      }
    ],
    ['@nuxtjs/vuetify', {
      customVariables: ['./scss/_variables.scss'],
      theme: {
        light: true,  //you don't actually need this line as it's for default
        themes: {
            light: {
                primary: '#274885',
                warning: '#DDA223'
            }
        }
      },
      icons: {
        iconfont: 'mdi', // default - only for display purposes
      }
    }],
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    'vue-social-sharing/nuxt',
    '@nuxtjs/apollo',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa'
  ],
  pwa: {
    meta: {
      title: 'ABR Grupo consultor',
      author: 'ABR',
    },
    manifest: {
      name: 'ABR Grupo consultor',
      short_name: 'ABR',
      lang: 'es',
    },
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  apollo: {
    clientConfigs: {
      default: '@/plugins/apolloConfig.js'
    }
  },
  /*apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: appConfig.graphUrl
      }
    }
  },*/
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
