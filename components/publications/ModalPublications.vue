<template>
<b-modal id="modal-publications" size="lg" :title="publicationSelected.nameCategoryPublication" centered scrollable hide-footer>
    <publications-container></publications-container>
</b-modal>
</template>

<script>
import { mapState } from 'vuex'

// Components
import PublicationsContainer from "./PublicationsContainer";

export default {
    data() {
        return {
          publications: []
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
