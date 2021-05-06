<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Message</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.content }}</td>
          <td>
            <NuxtLink :to="{name: 'admin-form-article', params: { articleId: article.id }}">
              Modifier
            </NuxtLink>
            <button @click="deleteArticle(article.id)">
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'ArticleTable',
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
    this.fetchArticles()
  },
  methods: {
    fetchArticles () {
      this.$store.dispatch('article/fetchArticles')
    },
    deleteArticle (id) {
      this.$store.dispatch('article/deleteArticle', id)
        .then(() => {
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Articles supprimé avec succès !')
          this.fetchArticles()
        })
    }
  }
}
</script>
