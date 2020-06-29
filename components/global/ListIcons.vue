<template>
<ul class="navbar-nav pl-0 list__icons" :class="setTextColor">
    <li v-for="item in items" :key="item" class="list__item d-flex align-items-start">
        <img src="../../assets/icons/arrow-right.svg" alt="Valores ABR" class="list-icon mt-1">
        <span class="list__item-text">{{ item }}</span>
    </li>
</ul>
</template>

<script>
export default {
    props: ['items', 'textColor'],
    computed: {
        setTextColor: function() {
            return `text-${this.textColor}`
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.list__icons {
    .list__item {
        margin: .3rem 0;
        display: flex;
    }

    .list__item-text {
        color: $secondary;
        display: inline-block;

        @media (min-width: 1024px) {
            width: 90%;
        }
    }
}

.list-icon {
    width: 2%;
    margin-right: .5rem;
}
</style>
