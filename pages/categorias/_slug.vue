<template>
  <div class="blog" v-if="categorias_blog_slug">
    <banner>
      <template slot="title">
        <h1 class="banner-blog__title banner-blog__title--index pl-0">{{ categorias_blog_slug.data[0].data.titleCategoryBlog }}</h1>
      </template>
    </banner>

    <section class="container post">
      <div class="row">
        <div class="col-xl-8">
          <template v-if="posts">

            <!-- Posts -->
            <post v-for="post in posts"
                  :key="post.id"
                  :post="post"
                  @click="$router.push({name: 'blog-slug', params: {slug: post.slugTitleBlog}})"
                  v-if="post.estado !== 0"
                  >
              <template slot="button">
                <nuxt-link :to="{name: 'blog-slug', params: {slug: post.slugTitleBlog}}" class="btn btn-sm btn-warning align-self-start">Ver más</nuxt-link>
              </template>
            </post>
          </template>

          <!-- Paginación -->
          <div class="col-md-12 d-flex justify-content-center"  v-if="existsPosts && (nroTotal_items > numberPerPage)">

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

        <div class="col-xl-4">
          <!-- Search -->
          <div class="bg-light search">
            <b-form inline class="d-flex justify-content-center px-3 px-md-0">
              <b-input
                type="search"
                id="inline-form-input-name"
                class="mb-2 mb-sm-0"
                placeholder="Buscar"
              ></b-input>

              <b-button variant="warning" class="m-0">
                <img src="../../assets/icons/search-white.svg" alt="" class="icon-button">
              </b-button>
            </b-form>
          </div>

          <carousel-posts></carousel-posts>

          <!-- Recent posts -->
          <recent-posts></recent-posts>

          <!-- Categories -->
          <categories></categories>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { appConfig } from '@/env'

  import Banner from '@/components/blog/Banner'
  import ListIcons from '@/components/global/ListIcons'
  import CarouselPosts from '@/components/blog/Carousel'
  import RecentPosts from '@/components/blog/RecentPosts'
  import Categories from '@/components/blog/Categories'
  import Comments from '@/components/blog/comments/Comments'
  import Post from '@/components/blog/Post'
  import Pagination from '@/components/global/Pagination'

  // Queries
  import categoriaBlogSlug from '@/apollo/queries/blog/categories/categoriaBlogSlug'

  export default {
    data() {
      return {
        slug: this.$route.params.slug,
        currentPage: 1,
        numberPerPage: 5,
        nroTotal_items: 0, // Utilizado para la paginación
        estado: 1
      }
    },
    components: {
      Banner,
      ListIcons,
      CarouselPosts,
      RecentPosts,
      Categories,
      Comments,
      Post,
      Pagination
    },
    apollo: {
      categorias_blog_slug: {
        prefetch: true,
        query: categoriaBlogSlug,

        variables() {
          return {
            slugTitle: this.slug,
            page: this.currentPage,
            number_paginate: this.numberPerPage,
            estado: this.estado
          }
        }
      }
    },
    mounted() {
      setTimeout(() => {
        if(this.categorias_blog_slug) {
          this.nroTotal_items = this.categorias_blog_slug.nroTotal_items
        }
      }, 2000)
    },
    computed: {
      posts: function () {
        // Toma la respuesta de apollo y retorna solo el objeto
        if(this.categorias_blog_slug) {
          return this.categorias_blog_slug.data
        }
      },
      setTotalPages: function () {
        return Math.ceil(this.nroTotal_items / this.numberPerPage)
      },
      existsPosts: function() {
        if(this.categorias_blog_slug) {
          return this.categorias_blog_slug.data
        }
      }
    },
    head () {
      let title = '', // Graph
        description = 'Categorías de blog ABR', // env
        appUrl = appConfig.appUrl,
        image = appConfig.logoABR,
        slug = this.slug,
        keywords = 'ABR Categoría de blog'

      if(this.categorias_blog_slug) {
        title = this.categorias_blog_slug.data[0].data.titleCategoryBlog
        description = this.categorias_blog_slug.data[0].data.description
        keywords = this.categorias_blog_slug.data[0].keywords
      }

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
          {property: 'og:url', content: `${appUrl}/${slug}`},

          // Whatsapp OpenGraph
          {property: 'og:title', content: title},
          {property: 'og:site_name', content: title},
          {property: 'og:type', content: 'website'},
          {property: 'og:image', content:  image},
          {property: 'og:description', content: description},
          {property: 'og:url', content: `${appUrl}/${slug}`},
        ]
      }
    },
    methods: {
      prev() {
        if(this.currentPage > 1) {
          this.currentPage--

          // Posiciona el scroll al comienzo de los posts
          window.scrollTo(0, 400)
        }
      },
      next() {
        if(this.currentPage < this.setTotalPages) {
          this.currentPage++

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

        window.scrollTo(0, 400)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/variables';

  .blog {
    .post {
      margin-top: 3rem;

      .post__main-image {
        width: 100%;
      }
    }

    .post__card-img-container {
      position: relative;

      @media (min-width: 720px) {
        width: 100%;
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
