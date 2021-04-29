<template>
  <div class="container mx-auto">
    <h1>News</h1>
    <ul>
      <li v-for="newData in news" :key="newData.id" :new="newData">
        <Article :data="newData" />
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
      news: []
    }
  },
  mounted () {
    this.fetchNews()
  },
  methods: {
    fetchNews () {
      this.$axios.get('/news')
        .then((response) => {
          this.news = response.data
        })
    }
  }
}
</script>
