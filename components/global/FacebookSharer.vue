<template>
<div>
    <div class="fb-share-button mt-5" data-href="https://www.abrgrupoconsultor.pe/" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.abrgrupoconsultor.pe%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore" v-if="status">Compartir</a></div>
</div>
</template>

<script>
export default {
    data() {
        return {
            status: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.status = true
        }, 3000)
    }
}
</script>

<style lang="scss" scoped>
/* .fb-share-button {
    background-color: #1877f2;
} */
</style>