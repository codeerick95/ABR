<template>
<b-carousel
    id="carousel-fade"
    indicators
    :interval="0"
    class="carousel-blog-post mt-5"
    v-if="comments.length >= 1"
>
    <b-carousel-slide
    v-for="(item, index) in comments" :key="index"
    >

        <!-- Card -->
        <card-post :post="item"></card-post>

    </b-carousel-slide>
</b-carousel>
</template>

<script>
import CardPost from './CardMiniPost'

// Queries
import coments_latest_three from '@/apollo/queries/blog/comments/coments_latest_three'

export default {
    data() {
        return {
          comments: []
        }
    },
    mounted() {
      this.getComments()
    },
    components: {
          CardPost
    },
    methods: {
      getComments() {
        this.$apollo.query({
          query: coments_latest_three,
          fetchPolicy: 'no-cache'
        })
          .then(response =>
            this.comments = response.data.Coments_latest_three
          )
      }
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.carousel-blog-post {
    display: block;
    /* min-height: 400px; */

    .carousel-item {
        min-height: 250px;

        @media (min-width: 720px) {
            min-height: 250px;
        }
    }

    .carousel-caption {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0;
    }

    .carousel-caption {
        top: 0 !important;
        left: 0;
        right: 0;
    }

    .carousel-indicators {
        position: absolute;
        right: -10%;
        bottom: 15%;
        left: 0;
        z-index: 15;
        width: 80px;
        padding-left: 0;
        margin-left: auto;

        @media (min-width: 720px) {
            right: -10%;
        }
    }

    .carousel-indicators li {
        width: .5em;
        height: .5em;
        border-radius: 50%;
        opacity: 1;
        outline: none;
    }

    .carousel-indicators .active {
        background-color: $warning;
    }
}
</style>
