<template>
  <div>
    <h1>News</h1>
    <ul>
      <li v-for="newData in news" :key="newData.id" :new="newData">
        {{ newData.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      news: []
    }
  },
  methods: {
    fetchNews () {
      axios.get('http://localhost:3000/news')
        .then((response) => {
          this.news = response.data
        })
    }
  },
  mounted () {
    this.fetchNews()
  }
}
</script>
