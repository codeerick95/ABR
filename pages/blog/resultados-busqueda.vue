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
        <h1 class="banner-blog__title">Blog</h1>
      </template>
    </banner>

    <section class="container post">
      <div class="row">
        <div class="col-xl-8">
          <h2 class="results-search__title">Resultados para la búsqueda {{ `"${postsSearch.query}"` }}</h2>
          <!-- Posts -->
          <post v-for="post in postsSearch.posts"
                :key="post.id"
                :post="post"
                @click="$router.push({name: 'blog-slug', params: {slug: post.slugTitleBlog}})"
                v-if="post.estado !== 0"
                >
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
                <input type="number" class="form-control pagination__field" v-model="currentPage">
              </form>
            </template>

            <template slot="buttons">
              <button class="pagination__button pagination__button--prev" @click="prev">
                  <span class="material-icons">
                    arrow_back_ios
                  </span>
              </button>
              <button class="pagination__button pagination__button--next" @click="next">
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
  import { mapState } from 'vuex'

  // Components
  import Banner from '@/components/blog/Banner'
  import Post from '@/components/blog/Post'
  import CarouselPosts from '@/components/blog/Carousel'
  import RecentPosts from '@/components/blog/RecentPosts'
  import Categories from '@/components/blog/Categories'
  import FooterApp from '@/components/Footer'
  import Pagination from '@/components/global/Pagination'
  import FormSearchs from '@/components/blog/FormSearch'


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
    methods: {
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
      ...mapState(['postsSearch']),
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
  /*Hereda estilos de blog/index.vue*/

  .results-search__title {
    font-size: 1.5em;
    font-weight: 700;
  }
</style>
