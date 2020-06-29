<template>
  <div class="container home-blog">
    <!-- Blog description -->
    <div class="row">
      <div class="col-md-12">
        <h2 class="subtitle">BLOG</h2>
        <p class="description pl-3">
          Encuentra información sobre temas laborales, tributarios, sector minero y más.
        </p>
      </div>
    </div>

    <!-- Posts -->
    <div class="posts-desktop">
      <div class="home-posts row d-flex justify-content-around mt-3 py-4 px-0">
        <div class="col-md-3 px-md-0" v-for="(item, index) in postsList" :key="index">
          <post-home :item="item" :padding="false"></post-home>
        </div>
      </div>
    </div>

    <!-- Posts mobile -->
    <carousel-blog class="carousel-mobile carousel-blog"></carousel-blog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  // Components
  import PostHome from './Post'
  import CarouselBlog from './carousel/CarouselBlog'

  export default {
    data() {
      return {
        postsList: []
      }
    },
    mounted() {
      this.$store.commit('setPosts')

      this.getPosts()
    },
    components: {
      PostHome,
      CarouselBlog
    },
    methods: {
      getPosts() {
        let list = []

        for(let i = 0; i <= 2; i++) {
          list.push(this.posts[i])
        }

        this.postsList = list
      }
    },
    computed: {
      ...mapState(['posts'])
    }
  }
</script>

<style lang="scss">
  @import '../../scss/variables';

  .home-blog {
    margin-top: 5rem;

    @media (min-width: 1024px) {
      margin-top: 8rem;
    }

    .subtitle {
      display: inline-block;
      padding: 0 1rem;
      border-right: none;
    }

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
        bottom: 0;

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
