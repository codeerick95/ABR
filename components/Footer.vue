<template>
<footer class="footer">
    <div class="footer__content">
        <!-- Logo -->
        <div class="footer__logo-container">
            <img src="../assets/icons/LOGO-01.svg" alt="Logo ABR Grupo consultor" class="img-fluid footer__logo">
        </div>

        <!-- Footer info -->
        <div class="footer__info-container">
            <p class="description text-white mb-1">ABR Grupo consultor y Asociados S.A.C</p>
            <p class="description text-white mb-1">Jr. Lloque Yupanqui #977 int. C - Jesús María, Lima</p>
            <p class="description text-white mb-1">Jr. Loreto 533 (alt. Parque Grau) – Juliaca, Puno</p>
            <p class="description text-white mb-1">Telf. (01) 373 7948</p>
            <p class="description text-white mb-1">Rpc: 991 239 977</p>

            <!-- Social icons -->
            <div class="footer__social mt-3">
                <a href="https://www.facebook.com/ABRGrupoConsultor/" target="_blank" class="mx-1">
                    <img src="../assets/icons/facebook.svg" alt="Facebook ABR Grupo consultor">
                </a>
                <a href="https://www.instagram.com/abrgrupoconsultor/" target="_blank" class="mx-1">
                    <img src="../assets/icons/instagram.svg" alt="Instagram ABR Grupo consultor">
                </a>
                <a href="https://twitter.com/abr_grupo" target="_blank" class="mx-1">
                    <img src="../assets/icons/twitter.svg" alt="Twitter ABR Grupo consultor">
                </a>
                <a href="https://api.whatsapp.com/send?phone=51991239977&text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20saber%20sobre%20los%20servicios%20que%20ofrecen" target="_blank" class="mx-1">
                    <img src="../assets/icons/whatsapp.svg" alt="Correo ABR Grupo consultor">
                </a>
                <a href="https://webmail.abrgrupoconsultor.pe/" target="_blank" class="mx-1">
                    <img src="../assets/icons/mail.svg" alt="Correo ABR Grupo consultor" class="mx-1">
                </a>
            </div>
        </div>
    </div>
</footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../scss/variables';

.footer {
    width: 100%;
    background-image: url('/footer/competitividad.jpg');
    background-size: cover;
    background-position: center;
    margin-top: 5rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
    position: relative;

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        background-color: rgba($primary, .8);
        position: absolute;
        top: 0;
        left: 0;
    }

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        background-color: rgba($primary, .8);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }

    &__content {
        max-width: 80%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        grid-gap: 1rem;
        margin: 0 auto;
        padding: 1rem;
        z-index: 10;
        text-align: center;

        @media (min-width: 720px) {
            max-width: 70%;
            grid-template-columns: .7fr 1fr;
            grid-template-rows: 1fr;
            text-align: left;
        }

        @media (min-width: 1024px) {
            max-width: 60%;
        }
    }

    .description {
        font-size: 1em;
        margin: 0;
    }

    &__logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }

    &__info-container {
        z-index: 10;
        margin-top: 1rem;

        @media (min-width: 720px) {
            margin-top: 0;
        }
    }

    .footer__logo {
        width: 50%;

        @media (min-width: 720px) {
            width: 60%;
        }
    }
}

.footer__social {
    img {
        max-width: 8%;

        @media (min-width: 720px) {
            max-width: 6%;
        }
    }
}
</style>
