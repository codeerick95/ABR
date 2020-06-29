<template>
<div class="container home-blog" v-if="posts.length >= 1">
    <!-- Blog description -->
    <div class="row">
        <div class="col-md-12">
            <h2 class="home-blog__subtitle text-primary">BLOG</h2>
            <p class="description pl-3">
                Encuentra información sobre temas laborales, tributarios, sector minero y más.
            </p>
        </div>
    </div>

    <!-- Posts -->
    <div class="posts-desktop">
        <div class="home-posts row d-flex justify-content-around mt-3 py-4 px-0">
            <div class="col-md-3 px-md-0" v-for="(item, index) in posts" :key="index" v-if="item.estado !== 0">
                <post-home :item="item" :padding="false"></post-home>
            </div>
        </div>
    </div>

    <!-- Posts mobile -->
    <carousel-blog></carousel-blog>
</div>
</template>

<script>
import postsAll from '@/apollo/queries/blog/latest_three'

// Components
import PostHome from './Post'
import CarouselBlog from './carousel/CarouselBlog'

export default {
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        this.getPosts()
    },
    components: {
        PostHome,
        CarouselBlog
    },
    methods: {
        getPosts() {
            this.$apollo.query({
              query: postsAll
            })
            .then(response => {
              this.posts = response.data.blogs_latest_three
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.home-blog {
    margin-top: 3rem;

    @media (min-width: 1024px) {
        margin-top: 7rem;
    }

    &__subtitle {
      @include subtitle;
      display: inline-block;
      padding-left: .5rem;
      border-left: 3px solid $warning;
      border-right: none;

      @media (min-width: 768px) {
          padding: 0 1rem;
      }
    }
}

.home-posts {
    background-color: $light;
}

.posts-desktop {
    display: none;

    @media (min-width: 768px) {
        display: block;
    }
}
</style>
