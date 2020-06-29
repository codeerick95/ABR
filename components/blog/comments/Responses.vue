<template>
  <section class="row justify-content-center">
    <template v-if="existsResponses">
      <div class="col-10" v-for="(item, index) in responses" :key="index">
        <div class="card bg-light">
          <div class="card-body">
            <div class="row">
              <div class="col-md-2" v-if="item.photo">
                <img :src="item.photo" :alt="item.nombreComent" class="comment__image">
              </div>

              <div class="col-md-9">

                <h3 class="comments-list__title">{{ item.nombreComent }}</h3>

                <p class="comments-list__content">
                  {{ item.textComent }}
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </template>

    <!-- <div class="col-10 py-0" v-if="formResponseToCommentStatus">
      <create-response :commentId="commentId" @commentSent="getResponses"></create-response>
    </div> -->
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  import get_answer_coment from '@/apollo/queries/blog/comments/get_answer_coment'

  export default {
    data() {
      return {
        responses: [],
        showFormResponse: this.showFormResponseStatus
      }
    },
    mounted() {
      this.getResponses()
    },
    props: ['commentId', 'showFormResponseStatus'],
    methods: {
      getResponses() {
        let id_coment = parseInt(this.commentId)

        this.$apollo.query({
          query: get_answer_coment,
          variables: {
            id_coment
          },
          fetchPolicy: 'no-cache'
        })
        .then(response => {
          this.responses = response.data.answer_coments
        })
      }
    },
    computed: {
      ...mapState(['formResponseToCommentStatus']),
      existsResponses: function () {
        return this.responses.length >= 1 ? true : false
      }
    }
  }
</script>

<style scoped>

</style>
