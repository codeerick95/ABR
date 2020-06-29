<template>
  <div class="card card-editor" v-if="info">
    <div class="card-editor__image-container">
      <img :src="info.photoEditor" :alt="info.nameEditor" class="card-editor__image">
    </div>
    <div class="card-editor__info">
      <h2 class="card-editor__title">{{ info.nameEditor }}</h2>

      <div class="card-editor__buttons">
        <!-- Los botones se envían desde el componente EditorsList -->
        <slot name="buttons"></slot>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['info']
  }
</script>

<style lang="scss" scoped>
  @import "../../../scss/variables";

.card-editor {
  display: grid;
  grid-template-columns: 1fr 2fr;
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

  &__image {
    width: 90px;
    height: 90px;

    border-radius: 50%;
    border: 3px solid rgba($warning, .5);
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
