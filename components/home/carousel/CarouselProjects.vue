<template>
  <section class="carousel-projects">
    <swiper class="swiper carousel-projects__mobile" :options="swiperOptionMobile">

      <swiper-slide v-for="(item, index) in items" :key="index">

        <section class="carousel-projects__item" :style="{backgroundImage: 'url(' + item + ')'}">
        </section>
      </swiper-slide>

      <div class="carousel-projects__pagination" slot="pagination"></div>
    </swiper>

    <swiper class="swiper carousel-projects__desktop" :options="swiperOptionDesktop">

      <swiper-slide v-for="(item, index) in items" :key="index">

        <section class="carousel-projects__item" :style="{backgroundImage: 'url(' + item + ')'}">
        </section>
      </swiper-slide>

      <div class="carousel-projects__pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>


<script>
  import { appConfig } from "../../../env";
  import PostHome from '../Post'

export default {
    data() {
      return {
        swiperOptionMobile: {
          slidesPerView: 1,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.carousel-projects__pagination',
            clickable: true
          }
        },
        swiperOptionDesktop: {
          slidesPerView: 2,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.carousel-projects__pagination',
            clickable: true
          }
        },
        items: [
          'home/proyectos/abr-actividades-fidami.jpg',
          'home/proyectos/abr-actividades-minero.jpg',
          'home/proyectos/proyecto-mineria.jpg',
          'home/proyectos/abr-actividades-cencomit.jpg'
        ]
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
        PostHome
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
@import '../../../scss/variables';

.carousel-projects {
  &__item {
    min-height: 250px;

    background-repeat: round;

    position: relative;

    &::before {
      content: '';

      background: rgb(39,72,133);
      background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0) 90%);

      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;

      &:hover {
        background-color: $primary;
      }
    }
  }

  &__mobile {
    @media (min-width: 768px) {
      display: none;
    }
  }

  &__desktop {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }

    @media (min-width: 1024px) {
      display: none;
    }
  }

  &__pagination.swiper-pagination-bullets {
    position: relative;
    height: 50px;
    bottom: -1rem;
    z-index: 10000;

    text-align: center;
  }
}
</style>
