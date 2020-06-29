<template>
<div class="home-post border-0 mb-md-0" v-if="item">
    <div class="home-blog__image" @click="$router.push({name: 'blog-slug', params: {slug: item.slugTitleBlog}})">
      <img :src="item.imageBlogMiniature" :alt="item.titleBlog" class="w-100 d__mobile">
      <img v-lazy="item.imageBlogMiniature" :alt="item.titleBlog" class="w-100 d__desktop">
    </div>

    <div class="d-flex flex-column justify-content-between">
        <h3 class="home-post__title mt-2 pl-1">
            <nuxt-link :to="{name: 'blog-slug', params: {slug: item.slugTitleBlog}}" class="text-decoration-none home-post__link-mobile">{{ item.titleBlog | postTitleMobile }}</nuxt-link>
          <nuxt-link :to="{name: 'blog-slug', params: {slug: item.slugTitleBlog}}" class="text-decoration-none home-post__link-desktop">{{ item.titleBlog | postTitle }}</nuxt-link>
        </h3>

        <div class="card-info d-flex flex-md-column flex-lg-row justify-content-between align-items-center mt-3">
            <p class="m-0 d-flex align-items-center">
                <img src="../../assets/icons/calendar-post.svg" alt="" class="calendar">

                <span class="date ml-2">15/07/2020</span>
            </p>

            <v-btn small color="warning" dark :to="{name: 'blog-slug', params: {slug: item.slugTitleBlog}}" class="text-decoration-none mt-md-3 mt-lg-0">
                <span class="d-inline-block mt-1">
                    Ver más
                </span>
                <img src="../../assets/icons/arrow.svg" alt="" class="btn--icon mt-1 ml-1">
            </v-btn>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['item', 'padding'],
    filters: {
      postTitleMobile: function (value) {
        if(value) {
          return value.substring(0, 48) + '...'
        }
      },
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

.home-post {
    .card {
        background-color: $light;

    }

    .btn--icon {
      width: 7px !important;
    }

    .card-img-top {
        position: relative;
        cursor: pointer;

        &::before {
            content: '';
            /* background: rgb(39,72,133);
            background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0.1881127450980392) 100%); */
            background: rgb(39,72,133);
            background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0) 90%);
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    &__title {
        font-size: .8rem;
        font-weight: 700;
        color: $primary;
        border-left: 3px solid $warning;

        @media (min-width: 1024px) {
          font-size: 1rem;
        }
    }

    .home-post__link-mobile {
      @media (min-width: 1024px) {
        display: none;
      }
    }

    .home-post__link-desktop {
      display: none;

      @media (min-width: 1024px) {
        display: block;
      }
    }

    .card-description {
        color: $secondary;
    }

    .date {
        font-size: 1em;
        font-weight: 400;
    }

    .calendar {
        width: 10%;
    }

    .btn {
        background-color: rgba($warning, .85) !important;
        font-size: 1.1em;
        color: white;
        width: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        border-radius: .5rem;
        border: none;

        &:hover {
            background-color: $warning !important;
            border-color: $warning;
        }
    }
}
</style>
