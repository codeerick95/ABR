<template>
<div class="recent-posts pt-3 pt-lg-5" v-if="posts.length">
    <h3 class="recent-posts-subtitle">Post Recientes</h3>
    <div class="row px-3">
        <div class="col-md-12 mb-5" v-for="(post, index) in posts" :key="index" v-if="post.estado !== 0">
            <div class="row" v-if="post">
                <div class="col-md-4 px-0 recent-post-image" @click="$router.push({name: 'blog-slug', params: {slug: post.slugTitleBlog}})">
                    <img :src="post.imageBlogMiniature" alt="" class="card-img">
                </div>

                <div class="col-md-8 post-content d-flex flex-column justify-content-center">

                    <p class="recent-post-title my-0">
                        <nuxt-link :to="{name: 'blog-slug', params: {slug: post.slugTitleBlog}}" class="recent-post-link">{{ post.titleBlog | postTitle }}</nuxt-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

// Queries
import latest_three from '@/apollo/queries/blog/latest_three'

export default {
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        this.$store.commit('setPosts')

        this.getPosts()
    },
    methods: {
      getPosts() {
        let page = this.currentPage, // Paginación
          number_paginate = 5 // Items a traer

        this.$apollo.query({
          query: latest_three,
          fetchPolicy: 'no-cache'
        })
        .then(response => {
          this.posts = response.data.blogs_latest_three
        })
      }
    },
    filters: {
      postTitle: function (value) {
        if(value) {
          return value.substring(0, 49) + '...'
        }
      }
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.recent-posts {
    .recent-posts-subtitle {
        font-size: 1.5em;
        font-weight: 700;
        color: $secondary;
        margin: 0;
    }

    .recent-post-image {
        cursor: pointer;
    }

    .recent-post-title {
        font-size: 1em;
        font-weight: 700;
    }

    .recent-post-link {
        color: rgba($secondary, .9);
        text-decoration: none;

        &:hover {
            color: $secondary;
        }
    }

    .card-img {
        @media (min-width: 1200px) {
            width: 100%;
            height: 100% !important;
        }
    }
}
</style>
