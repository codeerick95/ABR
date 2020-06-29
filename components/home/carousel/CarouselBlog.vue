<template>
  <div class="home-blog__carousel-mobile">
    <swiper class="swiper" :options="swiperOption">

      <swiper-slide v-for="(item, index) in posts" :key="index">
        <post-home :item="item" :padding="true" class="text-left"></post-home>
      </swiper-slide>

      <div class="carousel-projects__pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// Components
import PostHome from '@/components/home/Post'

import postsAll from '@/apollo/queries/home/posts'

export default {
    data() {
        return {
          posts: [],
          swiperOption: {
            slidesPerView: 1,
            spaceBetween: 30,
            freeMode: true,
            pagination: {
              el: '.carousel-projects__pagination',
              clickable: true
            }
          }
        }
    },
    mounted() {
        this.$store.commit('setPosts')

        this.getPosts()
    },
    components: {
        PostHome
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
  .home-blog__carousel-mobile {
    @media (min-width: 768px) {
      display: none;
    }
  }
</style>
