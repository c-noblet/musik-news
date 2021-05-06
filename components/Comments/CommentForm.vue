<template>
  <form v-if="isAuth" @submit="sendComment">
    <textarea v-model="comment" placeholder="Commentaire" cols="30" rows="10" />
    <button>Envoyer</button>
  </form>
</template>
<script>
export default {
  name: 'CommentForm',
  data () {
    return {
      comment: '',
      isAuth: false
    }
  },
  created () {
    this.isAuth = this.$store.getters['auth/getIsAuth']

    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'auth/ISAUTH') {
        this.isAuth = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchUserInfo()
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    sendComment (e) {
      e.preventDefault()
      this.$store.dispatch('article/postComment', this.comment)
    },
    fetchUserInfo () {
      this.$store.dispatch('auth/getUserInfo')
    }
  }

}
</script>
