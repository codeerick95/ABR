<template>
<div class="row justify-content-center publications__list">
    <div class="col-xl-10">
        <div class="row">
            <div class="col-md-6 col-lg-4 mb-5" v-for="(item, index) in items" :key="index">
                <div class="card" v-bind:style="{ backgroundImage: 'url(' + item.photoCategoryPublication + ')' }">
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
            </div>
            <!-- Modal posts -->
            <modal-publications :categoryId="currentItem.id"></modal-publications>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

// Components
import ModalPublications from './ModalPublications'

// Queries
import all from '@/apollo/queries/publications/categories/all'

export default {
    data() {
        return {
            items: [],
            modalTitle: '',
            currentItem: {
            }
        }
    },
    mounted() {
      this.getCategories()
    },
    components: {
        ModalPublications,
    },
    methods: {
        getCategories() {
          this.$apollo.query({
            prefetch: true,
            query: all
          })
            .then(res => {
              this.items = res.data.categoria_publicaciones
            })
        },
        showModal(item) {
            this.$store.commit('setPublicationSelected', item)

            this.$bvModal.show('modal-publications')
        }
    },
    computed: {
        ...mapState(['publications'])
    }
}
</script>

<style lang="scss">
.publications__list,
.carousel-publications {
    margin-top: 10rem;

    .card {
        /* background-image: url('../../assets/images/publications.jpg'); */
        background-size: cover;
        min-height: 300px;
        border: none;

        &::before {
            content: '';
            /* background: rgb(39,72,133);
            background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0.1881127450980392) 100%); */
            background: rgb(39,72,133);
            background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0) 90%);
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    .card-content {
        z-index: 10;
    }

    .card-title {
        font-size: 1.5em;
        color: white;
    }

    .link {
        color: white;
        min-width: 120px;
        z-index: 10;
    }

    .btn--icon {
        max-width: 10px;
    }
}
</style>
