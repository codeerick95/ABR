<template>
  <div class="card card-editor">
    <div class="card-editor__image-container">

    </div>
    <div class="card-editor__info">
      <h2 class="card-editor__title">{{ info.titleBlog | postTitle}}</h2>

      <div class="card-editor__buttons">
        <!-- Los botones se envían desde el componente EditorsList -->
        <slot name="buttons"></slot>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['info'],
    filters: {
      postTitle: function (value) {
        if(value) {
          return value.substring(0, 60) + '...'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../scss/variables";

  .card-editor {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    border: none;

    -webkit-box-shadow: 10px 10px 16px -15px rgba(0,0,0,0.51);
    -moz-box-shadow: 10px 10px 16px -15px rgba(0,0,0,0.51);
    box-shadow: 10px 10px 16px -15px rgba(0,0,0,0.51);

    color: $dark;

    margin-bottom: 1rem;
    padding: 1rem;

    &__image-container {
      height: 100%;

      display: flex;
      align-items: center;
    }

    &__info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: 1rem;
    }

    &__title {
      font-size: 1.2em;
      font-weight: 700;
    }

    &__email {
      word-break: break-all;
    }

    &__buttons {
      display: flex;

      margin-top: 1rem;

      button {
        margin-right: .5rem;
      }
    }
  }
</style>
