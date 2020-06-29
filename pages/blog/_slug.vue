<template>
  <div class="blog" v-if="post">
    <banner>
      <template slot="title">
        <h1 class="banner-blog__title">{{ post.titleBlog }}</h1>
      </template>
    </banner>

    <section class="container post">
        <div class="row">
            <div class="col d-lg-none">
              <!-- Categories -->
                <categories></categories>
            </div>

            <div class="col-xl-8">
                <article class="card border-0">
                    <div class="post__card-img-container">
                      <img :src="post.imageBlog" alt="" class="post__main-image">

                      <nuxt-link :to="{name: 'categorias-slug', params: {slug: post.data.slugTitleCategoryBlog}}" class="post-img-label">
                        {{ post.data.titleCategoryBlog }}
                      </nuxt-link>

                    </div>

                    <div class="card-body post-card__content">
                      <!-- Publicado por y fecha -->
                      <div class="w-100 d-flex flex-column flex-md-row justify-content-between">
                        <p class="text-muted mb-3">
                          Por
                          <span class="font-weight-bold">{{ post.alias ? post.alias : post.data.Name }}</span>
                        </p>

                        <!-- Fecha de publicación -->
                        <span class="admin__blog-date">
                          <i class="far fa-calendar-alt mr-1"></i>
                          {{ $moment(post.data.created_at).format('L') }}
                        </span>
                      </div>

                      <div v-html="post.textBlog"></div>
                    </div>

                     <!-- Botones para compartir -->
                    <share-buttons-for-posts :title="post.titleBlog" :description="post.data.description" :slug="slug"></share-buttons-for-posts>
                </article>

                <comments :postId="post.id" v-if="post"></comments>
            </div>

            <aside class="col-xl-4">
                <carousel-posts></carousel-posts>

                <!-- Recent posts -->
                <recent-posts></recent-posts>

                <!-- Categories -->
                <categories class="d-none d-lg-block"></categories>
            </aside>
        </div>
    </section>
    <!-- Footer -->
    <footer-app></footer-app>
</div>
  <not-found :object="{title: 'Artículo', url: '/blog'}" v-else></not-found>
</template>

<script>
  import { appConfig } from '@/env'

  // Components
  import Banner from '@/components/blog/Banner'
  import ListIcons from '@/components/global/ListIcons'
  import FormSearch from '@/components/blog/FormSearch'
  import CarouselPosts from '@/components/blog/Carousel'
  import RecentPosts from '@/components/blog/RecentPosts'
  import Categories from '@/components/blog/Categories'
  import Comments from '@/components/blog/comments/Comments'
  import NotFound from '@/components/blog/NotFound'
  import FooterApp from '@/components/Footer'
  import ShareButtonsForPosts from '@/components/global/ShareButtonsForPosts'

  // Queries
  import blog_slug from '@/apollo/queries/blog/blog_slug'

export default {
    data() {
        return {
            slug: this.$route.params.slug
        }
    },
    components: {
        Banner,
        FormSearch,
        ListIcons,
        CarouselPosts,
        RecentPosts,
        Categories,
        Comments,
        NotFound,
        FooterApp,
        ShareButtonsForPosts
    },
    apollo: {
      blog_slug: {
        prefetch: true,
        query: blog_slug,
        variables() {
          return {
            slugTitle: this.slug
          }
        }
      }
    },
  computed: {
    post: function () {
      // Toma la respuesta de apollo y retorna solo el objeto
      if(this.blog_slug) {
        return this.blog_slug[0]
      }
    }
  },
  head () {
    // Se utiliza https://vue-meta.nuxtjs.org/

    let title = '', // Graph
      description = appConfig.description, // env
      appUrl = appConfig.appUrl,
      image = appConfig.logoABR,
      slug = this.slug,
      keywords = 'ABR Grupo consultor'

    if(this.post) {
      description = this.post.description
      title = this.post.titleBlog // Graph
      image = this.post.imageBlog
      keywords = this.post.keywords
    }

    return {
      title: title,
      meta: [
        {vmid: 'abrk', name: "keywords", content: keywords },
        {vmid: 'abrd', name: "description", content: description },

        // Twitter Card
        {vmid: 'tc', name: 'twitter:card', content: 'summary'},
        {vmid: 'tt', name: 'twitter:title', content: title},
        {vmid: 'td', name: 'twitter:description', content: description},
        // image must be an absolute path
        {vmid: 'ti', name: 'twitter:image', content: image},

        // Facebook OpenGraph
        {vmid: 'ot', property: 'og:title', content: title},
        {vmid: 'os', property: 'og:site_name', content: title},
        {vmid: 'ot', property: 'og:type', content: 'website'},
        {vmid: 'oi', property: 'og:image', content:  image},
        {vmid: 'od', property: 'og:description', content: description},
        {vmid: 'ou', property: 'og:url', content: `${appUrl}/blog/${slug}`},

        // Whatsapp OpenGraph
        {vmid: 'wt', property: 'og:title', content: title},
        {vmid: 'ws', property: 'og:site_name', content: title},
        {vmid: 'wt', property: 'og:type', content: 'website'},
        {vmid: 'wi', property: 'og:image', content:  image},
        {vmid: 'wd', property: 'og:description', content: description},
        {vmid: 'wu', property: 'og:url', content: `${appUrl}/blog/${slug}`},
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';

iframe {
  max-width: 100%;
}

.blog {
    .post {
        .post__main-image {
            width: 100%;
        }
    }

    .post-card__content {
      margin-top: 3rem;
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

  .comments-list__title {
    font-weight: 700;
    font-size: 1.2em;
    color: $secondary;
  }

  .comments-list__content {
    font-size: 1em;
    color: $dark;
  }
</style>
