<template>
  <div class="container mx-auto">
    <div class="flex flex-col justify-center items-center mb-20">
      <h1 class="text-center text-4xl font-bold pt-1 pb-2 px-8 border-t-4 border-b-4 border-gray-100">News</h1>
    </div>
   <ul class="flex flex-col md:flex-row mb-5">
      <li v-for="article in articles" :key="article.id" class="m-5 w-3/6">
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
