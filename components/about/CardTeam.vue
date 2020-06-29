<template>
<article class="card team-card mt-5 ml-lg-3 py-md-0 d-flex justify-content-center align-items-center">
    <div class="card-body px-md-1 d-flex justify-content-center align-items-center">
        <div class="d-flex h-100 flex-column justify-content-center align-items-center" v-if="item">
            <div class="card-img-container">
                <img v-lazy="`/equipo/${item.image}`" class="team-image">
            </div>

            <div class="card-content text-center pb-3 px-0">
                <h3 class="team-card__title mt-5 text-dark">{{ item.name }}</h3>
                <h5 class="team-card__description text-primary">{{ item.role }}</h5>
            </div>
        </div>
    </div>
</article>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['item']
}
</script>

<style lang="scss">

.card-img-container {
    background-size: cover;
    background-position: right;
    border: 5px solid $primary;
    border-radius: 50%;
    width: 190px;
    margin: 0 auto;

    @media (min-width: 720px) {
        width: 180px;
        min-height: 120px;
    }

    @media (min-width: 1024px) {
        width: 180px;
        min-height: 140px;
    }

    @media (min-width: 1200px) {
      width: 170px;
      min-height: 140px;
    }
}

.team-image {
    width: 100%;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;

    @media (min-width: 720px) {
        height: 160px;
    }

    @media (min-width: 1024px) {
        height: 160px;
    }

    @media (min-width: 1200px) {
      height: 150px;
    }
}

.team-card__title,
.team-card__description {
    font-size: 1em;
}
</style>
