<template>
  <div class="notifications" v-if="notifications">
    <span class="notifications__icon" v-if="existsActiveNotifications" @click="status = !status">
      <span class="point"></span>
      <i class="fas fa-bell"></i>
    </span>

    <span class="notifications__icon" v-else @click="status = !status">
      <i class="far fa-bell"></i>
    </span>


    <!-- Lista de notificaciones -->
    <section class="notifications__list" v-if="status">

      <div class="notifications__list-header">
        <span class="notifications__list-title text-white font-weight-bold">Notificaciones</span>
      </div>

      <div class="notifications__list-body" v-if="existsActiveNotifications">
        <div v-for="(item, index) in notifications" :key="index" v-if="item.stateNotification == 0">

          <a href="" @click.prevent="toComments(item)" class="notifications__item">
            <p>
              Nuevo comentario en <span class="text-warning">{{ item.data.titleBlog | notificationTitle }}</span>
            </p>
            <span class="notifications__time">{{ $moment(item.created_at).format('DD/MM/YYYY') }}</span>
          </a>

        </div>
      </div>

      <p class="bg-light text-dark p-2 pl-3 w-100" v-else>No hay nuevas notificaciones</p>
    </section>
  </div>
</template>

<script>
  import all from '@/apollo/queries/notifications/all'

  import update from '@/apollo/mutations/notifications/update'

  export default {
    data() {
      return {
        status: false,
        notifications: [],
        existsActiveNotifications: false
      }
    },
    mounted() {
      this.getNotifications()
    },
    methods: {
      getNotifications() {
        return this.$apollo.query({
          query: all,
          fetchPolicy: 'no-cache'
        })
        .then(response => {
          this.notifications = response.data.notificaciones

          this.setPointNotifications()
        })
      },
      toComments(item) {

        let input = {
          "id": item.id,
          "stateNotification": 1
        }

        this.$apollo.mutate({
          mutation: update,
          variables: {
            input
          }
        })
        .then(() => {
          this.getNotifications()
          .then(() => {
            this.$router.push(`/admin/comentarios/${item.data.slugTitleBlog}`)
          })
        })
      },
      setPointNotifications() {
        let list = []

        this.notifications.forEach(item => {
          if(item.stateNotification === 0) {
            list.push(item)
          }
        })

        this.existsActiveNotifications = list.length >= 1 ? true : false
      }
    },
    filters: {
      notificationTitle: function (value) {
        if(value) {
          return value.substring(0, 30) + '...'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notifications {
    right: 0;
    position: absolute;

    &__icon {
      font-size: 1.5em;
      cursor: pointer;
    }

    &__list {
      color: white;

      margin: .7rem 1rem;

      display: flex;
      flex-direction: column;

      width: 500px;
      height: 300px;

      border-radius: .2rem;

      position: absolute;
      top: 100%;
      right: 0;
      z-index: 10000 !important;

      transition: opacity .5s;
    }


    &__list-header {
      background: rgb(39,72,133);
      background: linear-gradient(90deg, rgba(39,72,133,0.8827906162464986) 3%, rgba(39,72,133,1) 100%);

      padding: .7rem 1rem;
    }

    &__list-body {
      background-color: #222538;

      padding: 1rem;
    }

    &__item {
      color: rgba(white, .8);

      display: flex;
      flex-direction: column;

      text-decoration: none;


      margin-bottom: .5rem;
      padding: .3rem;
      border-bottom: 1px solid rgba($warning, .5);

      position: relative;
      z-index: 100;

      transition: color .7s, border-bottom-color .7s;

      &:hover {
        color: white;
        border-bottom: 1px solid rgba($warning, .9);
      }
    }

    &__time {
      font-size: .8em;
    }

    .point {
      background-color: orangered;

      width: 5px;
      height: 5px;

      border-radius: 50%;

      display: inline-block;
    }
  }
</style>
