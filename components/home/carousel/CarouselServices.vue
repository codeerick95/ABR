<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in servicesList" :key="item.id">
        <card-service :service="item">
          <slot>
            <img v-lazy="item.icon" :alt="item.name" class="img-fluid">
          </slot>
        </card-service>
      </swiper-slide>
      <div class="carousel-projects__pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// Components
import CardService from '../CardService'

export default {
    data() {
        return {
          swiperOption: {
            slidesPerView: 1,
            spaceBetween: 30,
            freeMode: true,
            pagination: {
              el: '.carousel-projects__pagination',
              clickable: true
            }
          }
        }
    },
    mounted() {
        this.$store.commit('setServices')
    },
    components: {
        CardService
    },
    computed: {
        ...mapState(['services']),
        servicesList: function () {
          let list = []

          this.services.forEach(item => {
            if (item.id !== 8 && item.id !== 9 && item.id !== 10) {
              list.push(item)
            }
          })

          return list
        }
    }
}
</script>

<style lang="scss">
.carousel-mobile {

    &.carousel-services {
        .card {
            min-height: 300px;
        }

        .card-img-container {
            height: 140px;
        }

        .carousel-caption {
            position: static;
        }

        .carousel-fade .carousel-item {
            width: 95%;
            min-height: 350px;

            .card-title,
            .card-subtitle {
                font-weight: 400;
            }
        }

        .carousel-indicators {
            bottom: -2.5rem;

            @media (min-width: 768px) {
                bottom: -1rem;
            }

            li {
                background-color: $primary;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                opacity: 1;
            }

            li.active {
                background-color: $warning;
            }
        }

        @media (min-width: 768px) {
            display: none;
        }

    }
}
</style>
