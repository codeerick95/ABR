<template>
<div class="card post">
    <div class="card-body">
        <div class="row">
            <div class="col-lg-4 post-image">
            </div>

            <div class="col-lg-8 pl-lg-5">
                <div class="card-content h-100 d-flex flex-column justify-content-center">
                    <h2 class="card-title">Lorem ipsum</h2>

                    <p class="card-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nesciunt voluptates accusamus quaerat esse, architecto itaque modi maiores libero odio quam cupiditate corrupti, animi atque dolore fugit sint adipisci! Corrupti?
                    </p>

                    <button class="btn btn-sm btn-warning align-self-start">DESCARGAR</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss">
@import '../../scss/variables';

.post {
    &.card {
        border: none;
    }

    .post-image {
        height: 300px;
        background: rgb(39,72,133);
        background: linear-gradient(0deg, rgba(39,72,133,0.9304096638655462) 0%, rgba(39,72,133,0) 90%);

        @media (min-width: 1024px) {
            height: auto;
        }
    }

    .card-title {
        font-size: 1.5em;
        color: $primary;
        position: relative;
        
        &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 50%;
            position: absolute;
            top: .5rem;
            left: -1rem;
        }
    }

    .btn {
        color: white;
        border-radius: 1rem;
    }
}
</style>