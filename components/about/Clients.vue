<template>
<div class="container-fluid clients px-0">
    <div class="row first-row justify-content-between">

        <!-- Info -->
        <div class="border px-md-0 py-5">
            <div class="clients__info d-flex flex-column justify-content-center my-5">
               <div class="row justify-content-center">
                   <div class="col-md-8 p-5 pl-md-0 pl-lg-4 pt-0 pb-0 text-center text-md-left">
                       <h2 class="clients__subtitle text-primary mb-3 mt-0 pt-0">
                            <span class="clients__subtitle--break">NUESTROS</span>
                            CLIENTES
                        </h2>
                   </div>
               </div>
                <div class="row justify-content-center">
                    <div class="col-10 col-md-8 p-md-3 pt-0">
                        <p class="description text-justify mt-3">
                            Para ABR Grupo Consultor S.A.C., nuestros clientes son lo más importante. Cada uno de ellos recibe el mejor servicio profesional y asistencia constante, de tal manera que a través de nuestra asesoría integral puedan contar con las herramientas suficientes y necesarias para afrontar con éxito las exigencias del mercado, que día a día es más competitivo y que requiere del desarrollo de mayores capacidades para una mejora continua.
                        </p>

                        <p class="description text-justify">
                            En ABR, la satisfacción de nuestros clientes es la garantía de la eficiencia de nuestros servicios.
                        </p>

                        <p class="description text-justify">
                            Estamos presentes en los sectores:
                        </p>

                        <list-icons :items="itemsValues" text-color="black"></list-icons>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image -->
        <div class="clients__image"></div>
    </div>
</div>
</template>

<script>
import ListIcons from '../global/ListIcons'

export default {
    data() {
        return {
            itemsValues: [
                'Sector Ingeniería y Servicios Técnicos.',
                'Sector Minería',
                'Sector Comercial y Servicios',
                'Sector Educativo',
                'Sector Industrial',
                'Sector Agrícola',
                'Sector Social y Desarrollo de ONG´s'
            ]
        }
    },
    components: {
        ListIcons
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.clients {
    margin-top: 6rem;

    .first-row {
        display: grid !important;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 300px;

        @media (min-width: 1200px) {
            grid-column-gap: 2rem;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
        }
    }

    .border {
        position: relative;

        @media (min-width: 720px) {
            border: 2px solid $primary !important;
        }

        @media (min-width: 1200px) {
            &::after {
                content: '';
                background-color: $primary;
                width: 30px;
                height: 35px;
                clip-path: polygon(0 0, 0% 100%, 100% 50%);
                position: absolute;
                top: 50%;
                right: -4.7%;
                z-index: 10;
            }
        }
    }
}

.clients__subtitle {
    @include subtitle;
    display: inline-block;
}

.clients__subtitle--break {
    display: block;
    position: relative;

    &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 80%;
            position: absolute;
            top: 5%;
            left: -6%;
        }
}

.clients__info {
    .subtitle {
        border: none;
    }

    .subtitle-line {
        display: inline-block;
        position: relative;

        &::before {
            content: '';
            background-color: $warning;
            width: 3px;
            height: 80%;
            position: absolute;
            top: .3rem;
            left: -1rem;
        }
    }
}

.clients__image {
    background-image: url('/about/NUESTROS_CLIENTES.jpg');
    background-size: cover;
    background-position: center;
    position: relative;

    @media (min-width: 1200px) {
        &::before {
            content: '';
            background-color: white;
            width: 30px;
            height: 35px;
            clip-path: polygon(0 0, 0% 100%, 100% 50%);
            position: absolute;
            top: 50%;
            left: 0;
            z-index: 10;
        }
    }
}
</style>
