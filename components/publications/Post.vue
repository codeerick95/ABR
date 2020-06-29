<template>
<div class="card post publication-post">
    <div class="card-body">
        <div class="row">
            <div class="col-lg-4 publication-post__image mb-3 mb-md-0" v-bind:style="{ backgroundImage: 'url(' + post.imagePublication + ')' }">
            </div>

            <div class="col-lg-8 pl-lg-5">
                <div class="card-content h-100 d-flex flex-column justify-content-center">
                    <h2 class="publication-post__title">
                        {{ `${post.titlePublication}` }}
                    </h2>

                    <p class="card-description text-md-justify">
                        {{ post.descriptionPublication }}
                    </p>

                    <a :href="post.filePublication" target="_blank" class="btn btn-sm btn-warning align-self-start">DESCARGAR</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['post']
}
</script>

<style lang="scss">
@import '../../scss/variables';

.publication-post {
    &.card {
        border: none;
    }

    &__image {
        height: 300px;
        background-size: cover;
        background-position: center;
        /* background: rgb(39,72,133);
        background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0) 90%); */
        cursor: pointer;

        @media (min-width: 1024px) {
            height: 220px;
        }
    }

    .card-title-link {
        text-decoration: none;
        color: rgba($primary, .9);

        &:hover {
            color: $primary;
        }
    }

    .btn {
        color: white;
        border-radius: 1rem;
    }
}

.publication-post {
    &__title {
        font-size: 1.1em;
        font-weight: 700;
        color: $primary;
        position: relative;

        &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 100%;
            position: absolute;
            top: 0;
            left: -.5rem;
        }
    }
}
</style>
