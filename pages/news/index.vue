<template>
  <div class="container mx-auto">
    <h1>News</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <Article :data="article" />
      </li>
    </ul>
  </div>
</template>

<script>
import Article from '@/components/Articles/Article'
export default {
  name: 'News',
  components: {
    Article
  },
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'article/ARTICLES') {
        this.articles = mutations.payload
      }
    })
  },
  mounted () {
    this.$store.dispatch('article/fetchArticles')
  }
}
</script>
