<template>
<!-- 
    Para este componente se utiliza
    https://www.npmjs.com/package/vue-social-sharing
-->

<div class="share-buttons-container">
    <span class="share-buttons__text">Compartir en:</span>

    <!-- Facebook -->
    <ShareNetwork
        network="facebook"
        :url="setUrl"
        :title="title"
        :description="description"
        :quote="facebookSharerMessage"
        hashtags="ABR"
        class="share__button share__button--facebook"
    >
        <img src="/icons/facebook.svg" alt="Icono Facebook" class="share__button__icon">
    </ShareNetwork>

    <!-- Twitter -->
    <ShareNetwork
        network="twitter"
        :url="setUrl"
        :title="title"
        :description="description"
        :quote="facebookSharerMessage"
        hashtags="ABR"
        class="share__button share__button--twitter"
    >
        <img src="/icons/twitter.svg" alt="Icono Facebook" class="share__button__icon">
    </ShareNetwork>

    <!-- Whatsapp -->
    <ShareNetwork
        network="whatsapp"
        :url="setUrl"
        :title="title"
        :description="description"
        :quote="facebookSharerMessage"
        class="share__button share__button--whatsapp"
    >
        <img src="/icons/whatsapp.svg" alt="Icono Facebook" class="share__button__icon">
    </ShareNetwork>

</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['title', 'description', 'slug'],
    computed: {
        facebookSharerMessage: function() {
            return `${this.title}: ${this.description}`
        },
        setUrl: function() {
            return `https://www.abrgrupoconsultor.pe/blog/${this.slug}`
        }
    }
}
</script>

<style lang="scss">
.share-buttons-container {
    display: flex;
    align-items: center;
    margin-top: 3rem;
}

.share-buttons__text {
    font-size: 1em;
    font-weight: 800;
    margin-right: .5rem;
}

.share__button {
    max-width: max-content;
    height: 2rem;
    font-size: 1em;
    color: white !important;
    display: inline-block;
    margin: 0 .3rem;
    padding: .5rem;
    border-radius: .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .5s;

    &__icon {
        width: 1rem;
    }

    &--facebook {
        background-color: rgba(#4267B2, .9);

        &:hover {
            background-color: #4267B2;
        }
    }

    &--twitter {
        background-color: rgba(#00acee, .9);

        &:hover {
            background-color: #00acee;
        }
    }

    &--whatsapp {
        background-color: rgba(#00bfa5, .9);

        &:hover {
            background-color: #00bfa5;
        }
    }
}
</style>