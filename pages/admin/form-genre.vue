<template>
  <div>
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit="submitForm($event)"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Nom
        </label>
        <input
          id="name"
          v-model="genre.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Nom"
          required
        >
      </div>
      <div class="flex items-center justify-center">
        <button class="btn btn-primary" type="submit">
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
  beforeDestroy () {
    this.unsubscribe()
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
  }
}
</script>
