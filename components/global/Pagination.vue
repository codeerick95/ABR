<template>
  <div class="pagination">
    <span class="pagination__text">Página </span>

    <slot name="form">
    </slot>

    <span class="pagination__text"> de {{ totalPages }}</span>

    <div class="pagination__buttons-container">
      <slot name="buttons">
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['totalPages']
  }
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;

    margin-top: 3rem;

  &__text {
     font-size: 1em;
     color: rgba($dark, .9);
     margin: .5rem .7rem;
     font-weight: 700;
   }

  &__field {
     width: 80px;
     font-weight: 700;
   }

  &__buttons-container {
     display: flex;
   }

  &__button {
     background-color: rgba($primary, .95);
     color: white;

     outline: none !important;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem .7rem;

    &:hover {
      background-color: $primary;
    }

  &--prev {
     border-top-left-radius: .25rem;
     border-bottom-left-radius: .25rem;
     border-right: 1px solid $dark;
   }

    &--next {
     border-top-right-radius: .25rem;
     border-bottom-right-radius: .25rem;
   }
  }
  }
</style>
