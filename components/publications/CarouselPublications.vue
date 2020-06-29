<template>
<div>
    <b-carousel
        id="carousel-fade"
        indicators
        :interval="0"
        class="carousel-mobile carousel-publications"
    >
        <b-carousel-slide
        v-for="(item, index) in items" :key="index"
        >

            <!-- Card -->
            <div class="carousel-publications-mobile__card" v-bind:style="{ backgroundImage: 'url(' + item.photoCategoryPublication + ')' }">
                <div class="card-body d-flex align-items-end h-100">
                    <div class="card-content">
                        <h2 class="card-title">{{ item.nameCategoryPublication }}</h2>

                        <a href="" class="link d-flex align-items-center" @click.prevent="showModal(item)">
                            Ver más
                            <img src="../../assets/icons/arrow-right.svg" alt="" class="btn--icon mt-1 ml-3">
                        </a>
                    </div>
                </div>
            </div>

        </b-carousel-slide>
    </b-carousel>

    <!-- Modal posts -->
    <modal-mobile-publications :publication="currentItem"></modal-mobile-publications>
</div>
</template>

<script>
import { mapState } from 'vuex'

// Components
import ModalMobilePublications from './ModalMobilePublications'

// Queries
import all from '@/apollo/queries/publications/categories/all'

export default {
    data() {
        return {
            items: [],
            currentItem: {}
        }
    },
    mounted() {
      this.getCategories()
    },
    components: {
        ModalMobilePublications
    },
    methods: {
        getCategories() {
          this.$apollo.query({
            query: all,
            fetchPolicy: 'no-cache'
          })
            .then(res => {
              this.items = res.data.categoria_publicaciones
            })
        },
        showModal(item) {
          this.$store.commit('setPublicationSelected', item)

          this.$bvModal.show('modal-mobile-publications')
        }
    },
    computed: {
        ...mapState(['publications'])
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.carousel-mobile.carousel-publications {
    height: 450px;

    .card-content {
        text-align: left;
        z-index: 10;
    }

    .carousel-caption {
        height: 100%;
        right: 0;
        left: 0;
    }

    .date {
        color: $dark;
    }
}

.carousel-publications-mobile__card {
    background-size: cover;
    background-position: center;
    min-height: 380px;
    display: flex;
    align-items: flex-end;
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
    }
}
</style>
