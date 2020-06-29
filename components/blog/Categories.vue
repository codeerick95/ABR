<template>
<div class="card categories bg-light border-0">
    <div class="card-body">
        <h3 class="categories-title">Categorías</h3>
        <ul class="navbar-nav">
              <li v-for="(item, index) in categories" :key="index" class="mb-2">
                <nuxt-link :to="{name: 'categorias-slug', params: {slug: item.slugTitleCategoryBlog}}" class="d-flex justify-content-between align-items-center">
                  <p class="my-1">
                    <img src="../../assets/icons/arrow-right.svg" alt="" class="icon">
                    <span>{{ item.titleCategoryBlog }}</span>
                  </p>

                  <span class="badge badge-secondary">{{ item.nroBlogs }}</span>

                </nuxt-link>
              </li>
        </ul>
    </div>
</div>
</template>

<script>
  import categories from '@/apollo/queries/blog/categories/blog_categories'
export default {
    data() {
        return {
            categories: []
        }
    },
    mounted() {
      this.getCategories()
    },
  methods: {
      getCategories() {
        this.$apollo.query({
          query: categories
        })
        .then(response => {
          this.categories = response.data.categorias_blog
        })
      }
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.categories {
    margin-top: 1rem;

    .icon {
        width: .5em;
    }

    .badge {
        width: 1.5rem;
        height: 1.5rem;
        font-weight: normal;
        padding: .3rem .5rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.categories-title {
    font-size: 1.5em;
    font-weight: 700;
    color: $secondary;
}
</style>
