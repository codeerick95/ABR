<template>
<div class="card card-value-container border-0 w-100">
    <div class="card-body card-value p-0">
        <div class="front">
            <slot name="image-front">
            </slot>
            <h3 class="card-value__title">{{ title }}</h3>
            <span class="card-value__icon">&#x21bb;</span>
        </div>
        <div class="back">
            <slot name="image-back">
            </slot>
            <p class="card-value__description">{{ description }}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['title', 'description']
}
</script>

<style lang="scss">
@import '../../scss/variables';

.card-value-container {
  font-size: 1.2em;
  margin: 1% 0 0 1%;
  perspective: 800px;
  transition: all 0.3s ease 0s;

  &:hover .card-value {
    transform: rotateY( 180deg);
  }
}

.card-value {
  background-color: white;
  cursor: default;
  height: 300px;
  border-radius: .3rem;
  transform-style: preserve-3d;
  transition: transform .7s ease-in-out 0s;
  width: 100%;
  -webkit-animation: giro 1s 1;
  animation: giro 1s 1;

  .card-body {
      height: 100%;
  }

  @media (min-width: 768px) {
    height: 350px;
  }
}

.front,
.back {
  width: 100%;
  height: 100%;
  display: block;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: .3rem;
  position: absolute;
  backface-visibility: hidden;
  padding: .5rem;
}

.card-value__title {
    font-size: .9em;
    font-weight: 800;
    margin: 0;

    @media (min-width: 768px) {
      max-width: 80%;
    }

    @media (min-width: 1024px) {
      font-size: 1em;
    }
}

.card-value__description {
    font-size: .8em;
    font-weight: 400;
    margin: 0;

    @media (min-width: 768px) {
      max-width: 80%;
      font-size: .7em;
    }
}

.card-value__icon {
    color: $primary;
    font-weight: 700;
    display: inline-block;
    margin: 1rem 0;
}

.front {
    border: 1px solid rgba($dark, .1);
    .card-value__title {
        color: $dark;
    }
}

.back {
  background-color: $primary;
  color: white;
  transform: rotateY( 180deg);
}
</style>
