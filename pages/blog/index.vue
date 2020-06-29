<template>
<div class="blog" v-if="posts">

    <div class="fb-customerchat"
        attribution=setup_tool
        page_id="1660616037524515"
        theme_color="#6699cc"
        logged_in_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor"
        logged_out_greeting="Hola! Soy Sofia, bienvenidos a ABR Grupo Consultor">
    </div>

    <banner>
        <template slot="title">
            <h1 class="banner-blog__title banner-blog__title--index pl-0">Blog</h1>
        </template>
    </banner>

    <section class="container post mt-5">
        <div class="row">
            <div class="col-xl-8">

                <!-- Posts -->
                <post v-for="(post, index) in posts" :key="post.id"
                      :post="post"
                      @click="$router.push({name: 'blog-slug', params: {slug: post.slugTitleBlog}})"
                      v-if="post.estado !== 0"
                      >
                      <!-- post.estado = Solo si el post está como publicado -->
                    <template slot="button">
                        <nuxt-link :to="{name: 'blog-slug', params: {slug: post.slugTitleBlog}}" class="btn btn-sm btn-warning align-self-start">Ver más</nuxt-link>
                    </template>
                </post>

            </div>

            <div class="col-xl-4">
                <form-searchs></form-searchs>

                <carousel-posts></carousel-posts>

                <!-- Recent posts -->
                <recent-posts></recent-posts>

                <!-- Categories -->
                <categories></categories>
            </div>
        </div>

        <!-- Paginación -->
        <div class="row" v-if="existsPosts">
          <div class="col-md-12 d-flex justify-content-center">

            <pagination :totalPages="setTotalPages">

              <template slot="form">
                <form @submit.prevent="submitByNumber()">
                  <input type="number" min="1" :max="setTotalPages" class="form-control pagination__field" :disabled="setTotalPages == 1" v-model="currentPage">
                </form>
              </template>

              <template slot="buttons">
                <button class="pagination__button pagination__button--prev" :disabled="currentPage == 1" v-if="currentPage != 1" @click="prev">
                  <span class="material-icons">
                    arrow_back_ios
                  </span>
                </button>
                <button class="pagination__button pagination__button--next" :disabled="currentPage == setTotalPages" v-if="currentPage != setTotalPages" @click="next">
                  <span class="material-icons">
                    arrow_forward_ios
                  </span>
                </button>
              </template>
            </pagination>

          </div>
        </div>
    </section>

    <!-- Footer -->
    <footer-app></footer-app>
</div>
</template>

<script>
import { appConfig } from '@/env'

// Components
import Banner from '@/components/blog/Banner'
import Post from '@/components/blog/Post'
import CarouselPosts from '@/components/blog/Carousel'
import RecentPosts from '@/components/blog/RecentPosts'
import Categories from '@/components/blog/Categories'
import FooterApp from '@/components/Footer'
import Pagination from '@/components/global/Pagination'
import FormSearchs from '@/components/blog/FormSearch'

// Queries
import all from '@/apollo/queries/blog/all'

export default {
    data() {
        return {
            posts: [],
            title: 'Blog - ABR Grupo Consultor y Asociados S.A.C.',
            currentPage: 1,
            numberPerPage: 5,
            nroTotal_items: 0, // Utilizado para la paginación
        }
    },
    mounted() {
        this.getPosts()
    },
    components: {
        Banner,
        Post,
        CarouselPosts,
        RecentPosts,
        Categories,
        FooterApp,
        Pagination,
        FormSearchs
    },
    head () {
      // Se utiliza https://vue-meta.nuxtjs.org/

    let title = 'Blog ABR Grupo Consultor', // Graph
      description = appConfig.description, // env
      appUrl = appConfig.appUrl,
      image = 'https://api.abrgrupoconsultor.pe/storage/app/imagenes_abr/abr-blog.jpg',
      keywords = 'Blog ABR Grupo Consultor - Noticias destacadas Minería',
      url = `${appUrl}/blog`

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
    methods: {
      getPosts() {
        let page = this.currentPage, // Paginación
          number_paginate = this.numberPerPage, // Items a traer
          estado = 1

        this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache',
          variables: {
            page,
            number_paginate,
            estado
          }
        })
          .then(response => {
            this.posts = response.data.blogs_get.data

            this.nroTotal_items = response.data.blogs_get.nroTotal_items
          })
      },
      prev() {
        if(this.currentPage > 1) {
          this.currentPage--
          this.getPosts()

          window.scrollTo(0, 400)
        }
      },
      next() {
        if(this.currentPage < this.setTotalPages) {
          this.currentPage++
          this.getPosts()

          window.scrollTo(0, 400)
        }
      },
      submitByNumber() {
        // Si la el número de página que quiere buscar es >= 1 y es menor al total de páginas
        if(this.currentPage >= 1 && this.currentPage <= this.setTotalPages) {
          this.getPosts()
        } else {
          // Se envía a buscar la página nro 1
          this.currentPage = 1
          this.getPosts()
        }
      }
    },
    computed: {
        setTotalPages: function () {
          return Math.ceil(this.nroTotal_items / this.numberPerPage)
        },
        existsPosts: function() {
            return this.posts.length >= 1 ? true : false
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.blog {
    .post {
        margin-bottom: 1rem;

        @media (min-width: 1200px) {
            margin-bottom: 3rem;
        }

        .img-fluid {
            @media (min-width: 1200px) {
                height: 100%;
            }
        }
    }

    .card-img-container {
        min-height: auto;
        position: relative;
        border: none;

        @media (min-width: 720px) {
            width: 100%;
        }

        @media (min-width: 1200px) {
            min-height: 500px;
        }
    }

    .search {
        padding: 1.5rem 0;

        .form-control {
            outline: none;
            box-shadow: none;
            margin-right: -.1rem;
        }

        .btn {
            border-radius: 0;
            display: block;
            width: 100%;
            z-index: 10 !important;

            @media (min-width: 720px) {
                width: auto;
            }
        }

        .icon-button {
            width: 1.2em;
        }
    }

    .list-icon {
        width: .5rem;
    }

    .post-img-label {
        background-color: $warning;
        color: white;
        display: inline-block;
        padding: .3rem 1rem;
        border-radius: .5rem;
        position: absolute;
        bottom: -1rem;
        left: 1rem;
    }

    .block {
        border-left: 3px solid $warning;
    }
}
</style>
