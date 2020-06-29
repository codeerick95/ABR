<template>
<div class="card-body mb-3" >
    <div class="row">
        <div class="col-md-2" v-if="comment.photo">
        <img :src="comment.photo" :alt="comment.nombreComent" class="comment__image">
        </div>

        <div class="col-md-9">

        <h3 class="comments-list__title">{{ comment.nombreComent }}</h3>

        <p class="comments-list__content">
            {{ comment.textComent }}
        </p>
        </div>
    </div>

    <div class="commer__footer d-flex justify-content-between align-items-center py-3">
        <a href="" @click.prevent="showForm = !showForm">{{ showForm ? 'Ocultar' : 'Responder' }}</a>

        <span class="text-muted">{{ $moment(comment.created_at).startOf('hour').fromNow() }}</span>
    </div>

    <!-- Respuestas -->
    <responses :commentId="comment.id"></responses>
    
    <create-response :commentId="comment.id" v-if="showForm"></create-response>
</div>
</template>

<script>

// Components
import CreateResponse from './responses/Create'
import Responses from '@/components/blog/comments/Responses'

export default {
    data() {
        return {
            showForm: false
        }
    },
    props: ['comment'],
    components: {
        CreateResponse,
        Responses
    }
}
</script>

<style lang="scss" scoped>

</style>