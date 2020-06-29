<template>
<b-modal id="modal-mobile-publications" :title="publicationSelected.nameCategoryPublication" size="lg" centered scrollable hide-footer>
    <publications-container></publications-container>
</b-modal>
</template>

<script>
import { mapState } from 'vuex'

import PublicationsContainer from "./PublicationsContainer";

export default {
    data() {
        return {

        }
    },
    props: ['categoryId'],
    components: {
      PublicationsContainer
    },
    computed: {
        ...mapState(['publicationSelected']),
    }
}
</script>

<style lang="scss" scoped>

</style>
