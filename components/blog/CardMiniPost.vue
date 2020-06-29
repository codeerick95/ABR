<template>
<div class="card mini-card bg-dark mt-5 w-100" @click="$router.push({name: 'blog-slug', params: {slug: post.data.slugTitleBlog}})" v-if="post">
    <div class="card-body text-left d-flex flex-column justify-content-between align-items-between">
        <p class="text-white description mt-1 mx-0 p-1 h-100 d-flex justify-content-center align-items-center">
            {{ post.textComent | comment }}
        </p>

        <div class="d-flex p-2 w-100">
            <div class="col-md-7">
                <h3 class="text-white lead">{{ post.nombreComent }}</h3>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['post'],
    filters: {
      comment: function (value) {
        if(value) {
          return value.substring(0, 188) + '...'
        }
      },
      postDescription: function (value) {
        if(value) {
          return value.substring(0, 230) + '...'
        }
      }
    }
}
</script>

<style lang="scss">
.mini-card {
    cursor: pointer;

    .bg-warning {
        min-height: 150px;

        @media (min-width: 720px) {
            min-height: 100px;
        }
    }

    .card-body {
        height: auto !important;
    }

    .lead {
        font-weight: 400;
    }

    .description {
        font-size: .9em;
    }

}
</style>
