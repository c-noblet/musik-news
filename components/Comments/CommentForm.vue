<template>
  <form v-if="isAuth" class="mb-10" @submit="sendComment">
    <h3 class="mb-2">
      Saisir un commentaire
    </h3>
    <textarea v-model="comment" placeholder="Commentaire" cols="30" rows="10" class="mb-3 w-full" />
    <button class="btn btn-primary">
      Envoyer
    </button>
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
      this.$store.dispatch('article/postComment', {
        id: this.$route.params.id,
        comment: this.comment
      })
      this.comment = ''
    },
    fetchUserInfo () {
      this.$store.dispatch('auth/getUserInfo')
    }
  }

}
</script>
