<template>
  <div>
    <div class="mx-auto w-80 mb-20">
      <h1 class="text-center text-4xl font-bold pt-1 pb-2 px-8 border-t-4 border-b-4 border-gray-100">
        News
      </h1>
    </div>
    <ul class="grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-10">
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
