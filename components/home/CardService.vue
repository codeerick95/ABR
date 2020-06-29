<template>
<div class="card card-home__service px-5" v-if="service">

  <div class="card-home__service-title-container d-flex align-items-center">
    <h3 class="card-home__service-title p-1 text-left">{{ service.name }}</h3>
  </div>

  <div class="card-home__service-button-container d-flex align-self-end">
    <button class="card-home__service-button mt-1 w-100" @click="dialog = true">
      <img src="../../assets/icons/plus-card.svg" alt="" class="">
    </button>
  </div>

  <div class="card-home__service-image-container d-flex justify-content-center p-0">
    <slot></slot>
  </div>


    <b-modal id="modal-home-service" size="xl" hide-header hide-footer centered v-model="dialog" class="position-relative modal-home-service px-0" v-if="service">
        <div class="container-fluid px-lg-0">
            <div class="row px-0">
                <!-- Modal image -->
                <div class="col-lg-7 p-0 m-0 modal-home-service__image-container">
                    <img :src="service.mainImage" alt="" class="modal-home-service__image">
                </div>

                <!-- Modal description -->
                <div class="col-lg-5 d-flex justify-content-center align-items-center py-md-0">
                    <div class="modal-home-service__content text-left d-flex flex-column justify-content-lg-center py-3 px-1 px-lg-3">
                        <h2 class="modal-home-service__title">{{ service.name }}</h2>

                        <section class="modal-home-service__summary mt-lg-3">
                            <p>{{ service.summary }}</p>
                            <!-- <p v-for="(value, index) in service.descriptions" :key="index">{{ value }}</p> -->
                        </section>

                        <div class="d-flex justify-content-center justify-content-lg-start">
                            <v-btn type="primary" :to="{name: 'servicios-slug', params: {slug: service.slug}}" class="modal-btn text-decoration-none">
                                Ver más
                                <img src="../../assets/icons/arrow-right.svg" alt="" class="btn--icon mt-1 ml-3">
                            </v-btn>
                        </div>
                    </div>

                </div>
            </div>
            <button class="modal-close" @click="dialog = false">
                <img src="../../assets/icons/close-moda-service.svg" alt="">
            </button>
        </div>
    </b-modal>
</div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    },
    props: ['service']
}
</script>

<style lang="scss">
@import '../../scss/variables';

.card-home__service {
    background: rgb(64,97,158);
    background: linear-gradient(90deg, rgba(64,97,158,1) 0%, rgba(39,72,133,1) 100%, rgba(0,212,255,1) 100%);
    color: white;
    border-radius: 2rem;
    display: grid;
    grid-template-columns: 35px 3fr 1.5fr;
    grid-template-rows: 1fr;
    min-height: 250px;

    @media (min-width: 768px) {
      min-height: 200px;
    }

    &-button-container {
      grid-column: 1 / 1;
      grid-row: 1 / 2;
    }

  &-button {
    width: 1rem;
    margin-bottom: 2.5rem;
    outline: none !important;

    img {
      width: 30px;
    }
  }

    &-title-container {
      grid-column: 2 / 3;
    }

    &-title {
      font-size: 1.1em;
    }

    .card-service-content {
        display: flex;
        flex-direction: column-reverse;

        @media (min-width: 768px) {
            flex-direction: row;
        }
    }


    &-image-container {
      grid-column: 3 / 4;
    }

    .modal.fade.show {
        padding-left: 0;
    }

    &-image {
      width: 90%;
    }
}

.card-btn {
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    outline: none !important;
    box-shadow: none !important;
}


div#modal-home-service___BV_modal_body_ {
    padding: 0 !important;
}

.modal-home-service {
    background-color: $primary;
    border-radius: 2rem !important;

    &__image-container {
        min-height: 300px;
        background-size: cover;
        background-position: center;
        border-radius: 1rem;

        @media (min-width: 1024px) {
            min-height: 30vh;
            background-position: -10rem center;
            border-radius: 0;
            border-top-left-radius: 2rem;
            border-bottom-left-radius: 2rem;
        }

        @media (min-width: 1200px) {
            min-height: 80vh;
            background-position: -10rem center;
        }
    }

    &__image {
        width: 100%;
        height: 100%;

        object-position: center;

        border-radius: 1rem;
    }

    &__content {
        border-radius: 1rem !important;
        border: none;
    }

    &__summary {
        @media (min-width: 1024px) {
            width: 90%;
        }
    }

    .modal-card {
        position: relative;
    }

    &__title {
        color: $primary;
        font-size: 1.5em;
        font-weight: 700;

        @media (min-width: 720px) {
            width: 75%;
        }
    }

    .modal-btn {
        text-decoration: none;
    }
}

/* Clase interna que agrega Bootstrap */
#modal-home-service___BV_modal_content_.modal-content {
    border-radius: 2rem !important;
}

a.modal-btn.v-btn.v-btn--contained.v-btn--router.theme--light.v-size--default {
    background-color: $primary !important;
    color: white;
    width: 150px;
    border-radius: .7rem;
}

.modal-close {
    width: 2em;
    height: 2em;
    border-radius: 50%;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10000 !important;

    @media (min-width: 720px) {
        top: -1rem;
        right: 0;
    }

    @media (min-width: 1024px) {
        top: -.5rem;
        right: -.5rem;
    }
}
</style>
