<template>
  <div class="container">
    <ul class="container mx-auto">
      <li v-for="comment in comments" :key="comment.id" />
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Comments',
  data () {
    return {
      comments: []
    }
  },
  async mounted () {
    this.comments = await this.$store.dispatch('article/fetchArticles')
  }
}
</script>
