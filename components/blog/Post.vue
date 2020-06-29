<template>
<div class="card post animate__animated animate__fadeIn">
    <div class="card-body">
      <div class="row">
        <div class="col-lg-4 post-image post--img-blog" v-bind:style="{backgroundImage: 'url(' + post.imageBlogMiniature + ')'}" @click="$router.push({name: 'blog-slug', params: {slug: post.slugTitleBlog}})">
        </div>

        <div class="col-lg-8 pl-lg-5">
          <div class="card-content h-100 d-flex flex-column justify-content-center">
            <h2 class="post__title">
              <nuxt-link :to="{name: 'blog-slug', params: {slug: post.slugTitleBlog}}" class="card-title-link">{{ post.titleBlog | titlePost }}</nuxt-link>
            </h2>

            <p class="card-description text-md-justify">
              {{ post.description | postDescription }}
            </p>

            <slot name="button">
            </slot>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['post'],
    filters: {
      titlePost: function(value) {
        if(value) {
          return value.substring(0, 90) + '...'
        }
      },
      postDescription: function (value) {
        if(value) {
          return value.substring(0, 160) + '...'
        }
      }
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.post {
    &.card {
        border: none;
    }

    .post-image {
      background-size: cover;
      background-position: center;
      height: 300px;

      position: relative;

      cursor: pointer;

        &::before {
          height: 300px;
          background: rgb(39,72,133);
          background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0) 90%);
          cursor: pointer;
          position: absolute;
          z-index: 100;
        }

        @media (min-width: 1024px) {
            height: auto;
        }
    }

    &__title {
        font-size: 1em;
        position: relative;

        &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 100%;
            position: absolute;
            top: 0;
            left: -.5rem;
        }

        @media (min-width: 720px) {
            font-size: 1.5em;
        }
    }

    .card-title-link {
        text-decoration: none;
        color: rgba($primary, .9);

        &:hover {
            color: $primary;
        }
    }

    .btn {
        color: white;
        border-radius: 1rem;
    }
}
</style>
