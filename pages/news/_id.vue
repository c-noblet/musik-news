<template>
  <div class="container">
    <article v-if="article !== {}">
      <h1>{{ article.title }}</h1>
      <span>{{ article.published }}</span>
      <p>{{ article.content }}</p>
    </article>
    <Comments :comments="article.comments" />
  </div>
</template>
<script>
import Comments from '@/components/Comments/Comments'
export default {
  name: 'Article',
  components: {
    Comments
  },
  data () {
    return {
      article: {}
    }
  },
  mounted () {
    this.$axios.get(`/news/${this.$route.params.id}`)
      .then((response) => {
        this.article = response.data
      })
  }
}
</script>
