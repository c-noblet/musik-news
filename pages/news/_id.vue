<template>
  <div v-if="article !== null" class="container">
    <article>
      <div class="flex justify-between items-end">
        <h1 class="text-5xl">
          {{ article.title }}
        </h1>
        <span>{{ article.published }}</span>
      </div>
      <p class="mt-10 mb-20">
        {{ article.content }}
      </p>
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
