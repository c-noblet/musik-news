<template>
  <form
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    @submit="submitForm($event)"
  >
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Titre
      </label>
      <input id="titre" v-model="article.title" type="text" placeholder="Titre" required>
    </div>
    <div class="mb-4">
      <label
        for="text"
        class="block text-gray-700 text-sm font-bold mb-2"
      >
        Texte
      </label>
      <textarea
        id="text"
        v-model="article.content"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        cols="30"
        rows="10"
        placeholder="Texte"
        required
      />
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        {{ article.id ? 'Modifier' : 'Ajouter' }}
      </button>
    </div>
  </form>
</template>
<script>
export default {
  name: 'FormArticle',
  data () {
    return {
      article: {
        title: '',
        content: ''
      }
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
    if (this.$route.params.articleId) {
      this.fetchArticle(this.$route.params.articleId)
    }
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    submitForm (e) {
      e.preventDefault()
      if (this.article.id) {
        this.$store.dispatch('article/updateArticle', this.article)
        this.redirect()
      } else {
        this.$store.dispatch('article/createArticle', this.article)
        this.redirect()
      }
    },
    fetchArticle (id) {
      this.$store.dispatch('article/fetchArticle', id)
    },
    redirect () {
      this.article.id ? this.$store.dispatch('flashMessage/addSuccessMessage', 'Article modifié avec succès !') : this.$store.dispatch('flashMessage/addSuccessMessage', 'Artiste/Groupe ajouté avec succès !')
      this.$router.push('/admin/news')
    }
  }
}
</script>
