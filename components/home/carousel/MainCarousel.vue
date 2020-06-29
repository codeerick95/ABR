<template>
<div class="banner">
    <!-- <header-app logo="white"></header-app> -->
    <header-app logo="white"></header-app>

  <section class="carousel-main carousel--home">
    <transition-group name="fade">
      <template v-if="initAnimated">
        <div
          class="carousel-main__item carousel-main__item--home"
          v-for="(item, index) in items" :key="index" :class="index === currentIndex ? 'carousel-main__item--active' : ''">
          <section class="carousel-main__item-content carousel-main__item-content--home">

            <!-- Contenido personalizado aquí, puedes acceder al contenido del item actual mediante la propiedad currentItem -->
            <div class="carousel-home__content-custom mt-md-5 mt-xl-0">
              <div class="carousel-home__info">
                <div class="d-flex align-items-center">
                  <h1 class="carousel-main__title carousel-main__title--home">{{ item.title }}</h1>

                  <img src="/servicios/alerta-minero/abr-alerta-minero-logo.png" alt="" class="logo-alerta-minero" v-if=" item.title === 'Alerta Minero' ">
                </div>

                <div v-html="item.description" class="carousel-main__description carousel-main__description--home my-3 py-0"></div>

                <v-btn :to="item.url" color="primary" min-width="150px" class="text-transform-none text-decoration-none mt-3 px-5 align-self-start">
                    <span class="d-inline-block mt-1">
                        Leer más
                    </span>
                  <img src="../../../assets/icons/arrow-right.svg" alt="" class="btn--icon mt-1 ml-3">
                </v-btn>
              </div>
            </div>

          </section>

          <img :srcset="item.image" :alt="item.altImage" class="carousel-main__image">

        </div>
      </template>
    </transition-group>

    <div class="carousel-main__points">
      <div class="carousel-main__points-container">
        <button class="carousel-main__point carousel-main__point--home" :class="index === currentIndex ? 'carousel-main__point--active' : ''" v-for="(item, index) in items.length" :key="index" @click="changeCurrentIndex(index)"></button>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { homeCarousel } from '@/utilities/app-data/home-carousel'

// Components
import HeaderApp from '@/components/global/Header'

export default {
    data() {
        return {
          currentItem: {},
          currentIndex: 0,
          initAnimated: false,
          currentTime: 5000,
          items: homeCarousel
        }
    },
    mounted() {
      // Asigna la primera imagen
      this.setCurrentItem()

      this.changeByInterval()

      // Controla el fade del inicio
      this.initAnimated = true
    },
    components: {
        HeaderApp
    },
    methods: {
      setCurrentItem() {
        if(this.reverseItems) {
          this.currentItem = this.items[this.currentIndex]
        }
      },
      changeByInterval() {
        setInterval(() => {
          // Aumenta en 1 el index
          if(this.currentIndex < (this.items.length - 1)) {
            this.currentIndex++
          } else {
            this.currentIndex = 0
          }

          this.currentItem = this.items[this.currentIndex]
        }, this.currentTime)
      },
      changeCurrentIndex(index) {
        this.currentItem = this.items[index]

        this.currentIndex = index
      }
    }
}
</script>

<style lang="scss">
  @import '../../../scss/components/carousel';

  /* Estilos adicionales, el único estilo importante es la altura */
  .carousel--home {
    height: 50vh; /* Importante: Definir altura */
    position: relative;

    @media (min-width: 720px) {
      height: 60vh;
    }

    @media (min-width: 1200px) {
      height: 100vh;
    }
  }

  .carousel-home__content-custom {
    width: 80%;
    height: 100%;

    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;

    position: relative;
  }

  .carousel-main__item--home {
    object-position: center;
    &::before {
      content: '';
      background: rgb(39,72,133);
      background: linear-gradient(90deg, rgba(39,72,133,1) 0%, rgba(39,72,133,0.13769257703081228) 100%);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }
  }

  .carousel-main__item-content {
    background-color: transparent;
  }

  .carousel-home__info {
    position: relative;
    z-index: 1000;

    margin-top: 5rem;

    @media (min-width: 720px) {
      width: 80%;

      margin-top: 0;
    }

    @media (min-width: 1024px) {
      width: 70%;
    }

    @media (min-width: 1200px) {
      width: 60%;
    }
  }

  .carousel-main__title--home {
    font-size: 4em;
    color: white;
  }

  .carousel-main__point--home {
    outline: none !important;
  }

  .carousel-main__title--home {
    font-size: 1.4em;
    font-weight: 800;

    position: relative;
    z-index: 10;

    @media (min-width: 720px) {
      max-width: 90%;
      font-size: 2.5em;
    }

    @media (min-width: 1024px) {
      margin-top: 2rem;
    }
  }

  .carousel-main__description--home {
    color: white;
    font-size: 1em;
    font-weight: 400;
    padding: 1rem;
    border-left: 4px solid $warning;
    transition: background-color .5s;
    display: none;

    @media (min-width: 720px) {
      width: 80%;
      display: block;
    }

    &:hover {
      background-color: rgba($dark, .09);
    }

  }

  .logo-alerta-minero {
    width: 30px;
    height: 30px;

    @media (min-width: 720px) {
      width: 70px;
      height: 70px;
    }

    margin-left: .7rem;
  }
</style>
