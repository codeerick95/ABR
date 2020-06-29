<template>
<div class="p-0 m-0">
    <section class="about-description">
        <div class="d-flex flex-column justify-content-center bg-primary">
            <div class="about-description__content">
                <h1 class="mb-1 ml-0 about-description__title mt-xl-0">
                    <span>SOBRE</span>
                    <br>
                    NOSOTROS
                </h1>

                <!-- Descripción -->
                <p class="description text-white text-md-justify">
                    ABR Grupo Consultor y Asociados S.A.C., es una consultora privada con más de 10 años de experiencia en el mercado, creada con el propósito de ofrecer servicios empresariales integrales, orientados a brindar asesorías, asistencia técnica, capacitación, y alternativas de soluciones hacia la mejora empresarial. Ofrecemos servicios a diversos sectores como minería, industria, comercio, y servicios.
                </p>

                <p class="description text-white text-md-justify">
                    ABR cuenta con una sólida plataforma organizacional, sustentada por profesionales y colaboradores multidisciplinarios, de amplia experiencia en diversos campos, brindando acompañamiento al cliente, en todas las etapas del proceso de la actividad que desarrolla.
                </p>
            </div>
        </div>

        <!-- Imagen -->
        <div class="about-description-image w-100 h-100"></div>
    </section>
    <section class="container mission">
        <div class="row justify-content-center">
            <!-- Misión -->
            <article class="col-md-6 px-md-0">
                <h2 class="mission__subtitle text-primary">
                    <span class="mission__subtitle--break">Nuestra</span>
                    Misión
                </h2>

                <div class="row justify-content-center">
                    <div class="col-10">
                        <p class="mission__description text-justify">
                            Brindar servicios de consultoría y asistencia técnica a los diferentes sectores, teniendo en cuenta las características específicas de cada cliente, para implementar soluciones integrales y viables, que satisfagan sus necesidades y contribuyan al logro de sus metas a través de la mejora continua.
                        </p>
                    </div>
                </div>

            </article>

            <!-- Misión -->
            <article class="col-md-6 px-md-0">
                <h2 class="mission__subtitle text-primary">
                    <span class="mission__subtitle--break">Nuestra</span>
                    Visión
                </h2>

                <div class="row justify-content-center">
                    <div class="col-10">
                        <p class="mission__description text-justify">
                            Consolidarnos como una empresa líder reconocida en el mercado, que garantiza excelentes resultados a través de un servicio eficiente y oportuno, diferenciado e integral a los diversos sectores y rubros económicos, con un equipo de profesionales afianzados en su amplia experiencia y altamente calificados.
                        </p>
                    </div>
                </div>
            </article>
        </div>
    </section>

</div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '../../scss/variables';

.about-description {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr;

    @media (min-width: 720px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }

    @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
    }

    &__content {
        max-width: 80%;
        margin-left: 3em;
        padding: 3rem 0;
    }
}

.about-description__title {
    @include subtitle;
    color: white;
}

.about-description-image {
    background-image: url('/about/abr-nosotros.jpg');
    background-size: cover;
    background-position: center;
    height: max-content;
    position: relative;

    @media (min-width: 1024px) {
        background-size: cover;

        &::before {
            content: '';
            background-color: $primary;
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

.mission {
    margin-top: 3rem;
    margin-bottom: 4rem;

    @media (min-width: 720px) {
        margin-top: 7rem;
    }

    &__subtitle {
        @include subtitle;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .mission__subtitle--break {
        display: block;
        border-left: 3px solid $warning;
        border-right: 3px solid $warning;
        padding: 0 1rem;
        line-height: 2.3rem;
    }
}
</style>
