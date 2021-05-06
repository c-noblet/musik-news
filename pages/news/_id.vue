<template>
  <div v-if="article !== null" class="container">
    <article>
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
      article: null
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'article/ARTICLE') {
        this.article = mutations.payload
      }
    })
  },
  mounted () {
    this.$store.dispatch('article/fetchArticle', this.$route.params.id)
  }
}
</script>
