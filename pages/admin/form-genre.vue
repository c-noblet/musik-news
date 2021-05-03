<template>
  <div>
    <form
      @submit="submitForm($event)"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Nom
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Nom"
          required
          v-model="genre.name"
        >
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {{ genre.id ? 'Modifier' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormGenre',
  data () {
    return {
      genre: {
        name: null
      }
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'genre/GENRE') {
        this.genre = mutations.payload
      }
    })
  },
  mounted () {
    if (this.$route.params.genreId) {
      this.fetchGenre(this.$route.params.genreId)
    }
  },
  methods: {
    submitForm (event) {
      event.preventDefault()
      if (this.genre.id) {
        // TODO : update existing genre
        this.$store.dispatch('genre/updateGenre', this.genre)
        this.redirect()
      } else {
        // Create new genre
        this.$store.dispatch('genre/createGenre', this.genre)
        this.redirect()
      }
    },
    fetchGenre (id) {
      this.$store.dispatch('genre/getOneGenre', id)
    },
    redirect () {
      this.genre.id ? this.$store.dispatch('flashMessage/addSuccessMessage', 'Genre modifié avec succès !') : this.$store.dispatch('flashMessage/addSuccessMessage', 'Genre ajouté avec succès !')
      this.$router.push('/admin/genres')
    }
  },
  beforeDestroy () {
    this.unsubscribe()
  }
}
</script>
