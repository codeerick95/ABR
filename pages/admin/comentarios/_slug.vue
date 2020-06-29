<template>
  <layout>
    <!-- El layout contiene el sidebar para todas las páginas del admin -->
    <template slot="content" v-if="blog_slug">
      <!-- Aquí solo va el contenido que cambiará entre distintas rutas -->

      <h2 class="admin-comments__title pl-4">Comentarios en post</h2>

      <v-card outlined class="admin-comments border-0" v-if="post">
        <div class="card-body d-flex align-items-center">
          <img :src="post.imageBlog" alt="" class="img-fluid admin-comments__post-image">

          <div class="p-3">
            <h1 class="admin-comments__post-title">{{ post.titleBlog }}</h1>

            <v-btn small color="warning" :to="{name: 'blog-slug', params: {slug: slug}}" target="_blank" class="mt-5 text-decoration-none">Ver post completo</v-btn>
          </div>
        </div>
      </v-card>

      <div class="px-4">
        <!-- Comentarios -->
        <comments-list :postId="post.id" v-if="post"></comments-list>
      </div>

    </template>
  </layout>
</template>

<script>
  import { appConfig } from '@/env'

  // Components
  import Layout from '@/components/admin/Layout'
  import CommentsList from '@/components/admin/blog/comments/CommentsList'

  // Queries
  import blog_slug from '@/apollo/queries/blog/blog_slug'

  export default {
    middleware: 'authDashboard',
    data() {
      return {
        slug: this.$route.params.slug
      }
    },
    components: {
      Layout,
      CommentsList
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
    }
  }
</script>

<style lang="scss">
  @import '../../../scss/variables';

  .admin-comments {
    &__post-image {
      width: 400px;
    }

    &__title {
      font-size: 1em;
      font-weight: 700;
    }

    &__post-title {
      font-size: 1.3em;
      font-weight: 700;
    }
  }
</style>
