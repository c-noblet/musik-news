<template>
  <form @submit="sendComment">
    <textarea v-model="comment" placeholder="Commentaire" cols="30" rows="10" />
    <button>Envoyer</button>
  </form>
</template>
<script>
export default {
  name: 'CommentForm',
  data () {
    return {
      comment: ''
    }
  },
  mounted () {
  },
  methods: {
    sendComment (e) {
      e.preventDefault()
      this.$store.dispatch('article/postComment', this.comment)
    }
  }
}
</script>
