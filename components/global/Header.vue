<template>
<header id="header" class="header" :class="headerWhite || this.color === 'white' ? 'header--white' : ''">
    <div class="header-container">
        <section class="header__top">
            <nuxt-link to="/contacto" outlined small class="btn--contact px-3 text-white">CONTÁCTANOS</nuxt-link>
        </section>
        <section class="nav-container">
            <div class="logo-container">
                <div class="logo" @click.prevent="to('/')"></div>
            </div>

            <div class="hamburger" :class="setHamburgerActive" @click.prevent="toggleNav()">
                <div class="hamburger-box">
                    <div class="hamburger-inner"></div>
                </div>
            </div>

            <nav class="nav" :class="setNavActive">
                <nuxt-link to="/sobre-nosotros" class="nav__link nav__link--mobile">NOSOTROS</nuxt-link>
                <a href="" class="nav__link nav__link--mobile dropdown-nav" @click.prevent="toggleDropdown" v-if="services">
                    SERVICIOS
                    <i class="fas fa-sort-down" v-if="!dropdownActive"></i>
                    <i class="fas fa-sort-up" v-else></i>

                    <div class="dropdown-nav__content animate__animated" :class="setDropdownActive">
                        <a href="" class="nav__link" v-for="(item, index) in services" :key="index" @click.prevent="to({name: 'servicios-slug', params: {slug: item.slug}})">{{ item.name }}</a>
                    </div>
                </a>
                <nuxt-link to="/proyectos" class="nav__link nav__link--mobile">PROYECTOS</nuxt-link>
                <nuxt-link to="/publicaciones" class="nav__link nav__link--mobile">PUBLICACIONES</nuxt-link>
                <nuxt-link to="/blog" class="nav__link nav__link--mobile">BLOG</nuxt-link>
                <nuxt-link to="/contacto" class="nav__link btn-nav-contact mb-5">CONTÁCTANOS</nuxt-link>
            </nav>
        </section>
    </div>
</header>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            navActive: false,
            hamburgerActive: false,
            dropdownActive: false,
            headerWhite: false
        }
    },
    mounted() {
      this.$store.commit('setServices')

      this.$nextTick(function(){
          let _this = this

          // Verifica si el usuario hizo scroll para cambiarlo de color
          window.addEventListener("scroll", function(){
            var navbar = document.getElementById("header")
            var nav_classes = navbar.classList
            if(document.documentElement.scrollTop >= 150) {
              _this.headerWhite = true
            }
            else {
              _this.headerWhite = false
            }
          })
        })
    },
    props: ['color'],
    methods: {
        toggleNav() {
            this.navActive = !this.navActive
            this.hamburgerActive = ! this.hamburgerActive
            this.dropdownActive = false
        },
        toggleDropdown() {
            this.dropdownActive = !this.dropdownActive
        },
        to(route) {
            this.$router.push(route)
        }
    },
    computed: {
        ...mapState(['services']),
        setHamburgerActive: function() {
            return this.hamburgerActive ? 'hamburger--collapse is-active' : ''
        },
        setNavActive: function() {
            return this.navActive ? 'nav--active' : ''
        },
        setDropdownActive: function() {
            return this.dropdownActive ? 'dropdown-nav__content--active animate__fadeInDown animate__faster' : ''
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    @media (min-width: 1024px) {
      padding: .5rem 0;
    }

   &__top {
       display: flex;
       justify-content: flex-end;
   }

    &-container {
        width: 80%;
        margin: 1rem auto 0;

        @media (min-width: 1024px) {
            width: 85%;
        }
    }
}

.btn--contact {
    display: none;
    text-decoration: none !important;

    @media (min-width: 1024px) {
        display: inline-block;
        padding: .1rem 1rem;
        border: 1px solid white;
        border-radius: .2rem;


        &:hover {
            background-color: $primary;
            border-color: $primary;
        }
    }

    &.nuxt-link-active {
        background-color: $primary;
        border: 1px solid $primary;
    }
}

.btn-nav-contact {
    margin-left: 1rem;

    @media (min-width: 1024px) {
        display: none !important;
    }
}

.logo-container {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    width: 100%;
    display: flex;
    align-items: center;

    .logo {
        background-image: url('~static/global/logo-blanco.svg');
        width: 100%;
        height: 80%;
        cursor: pointer;

        @media (min-width: 1024px) {
            height: 90%;
        }
    }
}

.nav-container {
    min-height: 80px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr auto;
    position: relative;

    @media (min-width: 1024px) {
       grid-template-columns: 1fr 3fr;
    }
}

.nav {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    width: 100%;
    background-color: $primary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    border-radius: .5rem;
    position: absolute;
    top: .5rem;
    right: -170%;
    z-index: 100;
    transition: right .7s ease-in-out;
    text-align: center;

    @media (min-width: 1024px) {
       width: 100%;
       background-color: transparent;
       grid-column: 2 / 3;
       grid-row: 1 / 2;
       flex-direction: row;
       justify-content: flex-end;
       right: 0;

        .nav__link {
            color: rgba(white, .8);
            transition: color .3s;

            &:hover {
                color: white;
                text-decoration: none;
            }
        }
    }

    &--active {
        right: 0;

        .nav__link {
            color: rgba(white, .85);
            transition: color .3s;

            &:hover {
                color: white;
                text-decoration: none;
            }
        }
    }
}

.nav__link {
    width: 100%;
    color: rgba(white, .7);
    display: inline-block;
    margin: .5rem 0;
    padding: .1rem .7rem;
    transition: color .5s ease-in-out;
    border-radius: .3rem;

    @media (min-width: 1024px) {
        width: auto;
        margin: .5rem 0 .5rem 1rem;
    }

    &.nuxt-link-active {
        background-color: $primary;
        border: 1px solid $primary;
    }
}

.hamburger {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 100;

    &:hover {
        opacity: .9;
    }

    &-inner {
        background-color: white;

        &::before {
            background-color: white;
        }

        &::after {
            background-color: white;
        }
    }

    @media (min-width: 1024px) {
       display: none;
    }
}

.hamburger.is-active
.hamburger-inner,
.hamburger.is-active
.hamburger-inner:after,
.hamburger.is-active
.hamburger-inner:before {
    background-color: white;
}

.hamburger.is-active:hover {
    opacity: .9;
}

.dropdown-nav {
    position: relative;

    &__content {
        display: none;
        text-align: left;
    }

    &__content--active {
        min-width: min-content;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: 1rem;
        padding: 1rem;
        position: absolute;
        top: 120%;
        z-index: 1000;

        @media (min-width: 720px) {
            min-width: max-content;
            left: 0;
            right: 0;
        }

        @media (min-width: 1024px) {
            background-color: $primary;
            margin-top: .5rem;
            left: initial;
            right: 0;
        }

        .nav__link {
            color: rgba($primary, .8);
            font-weight: 500;
            margin: .1rem 0;

            &:hover {
              background-color: rgba($dark, .3);
              color: white;
            }

            @media (min-width: 1024px) {
                color: white;
                margin: .3rem 0;
            }
        }
    }
}

.header--white {
    background-color: white;
    border-bottom: 1px solid rgba($secondary, .3);

    .btn--contact {
        background-color: $primary;
        border-color: $primary;
    }

    .logo {
        background-image: url('~static/global/logo-azul.svg');
    }

    .hamburger {

        &:hover {
            opacity: .9;
        }

        &-inner {
            background-color: $dark;

            &::before {
                background-color: $dark;
            }

            &::after {
                background-color: $dark;
            }
        }

    }

    .hamburger.is-active
    .hamburger-inner,
    .hamburger.is-active
    .hamburger-inner:after,
    .hamburger.is-active
    .hamburger-inner:before {
        background-color: $dark !important;
    }

    .nav {
        background-color: $primary;
        padding-bottom: 0;

        @media (min-width: 1024px) {
            background-color: white;
        }
    }

    .nav__link.nav__link--mobile {
        color: rgba(white, .8);

        &:hover {
            color: white;
        }

        @media (min-width: 1024px) {
            color: rgba($primary, .8);

            &:hover {
                color: $primary;
            }
        }
    }

    .dropdown-nav__content {
        .nav-link {
            color: rgba($primary, .8) !important;
            background-color: $primary;

            &:hover {
                color: $primary !important;
            }

            @media (min-width: 1024px) {
                color: rgba(white, .8);

                &:hover {
                    color: white;
                }
            }
        }
    }
}

.nav__link.nuxt-link-active {
    background-color: $primary !important;
    color: white !important;
    border: 1px solid $primary;
}
</style>
