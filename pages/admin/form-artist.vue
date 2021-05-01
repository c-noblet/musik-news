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
          v-model="artist.name"
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
          Description
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="description"
          placeholder="Description"
          required
          v-model="artist.description"
        >
        </textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="origin">Orgine</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="origin"
          id="origin"
          required
          v-model="artist.origin"
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="avatar">Avatar (url)</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="url"
          name="avatar"
          id="avatar"
          required
          v-model="artist.avatar"
        >
      </div>
      <div class="inline-block relative w-64">
        <select
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          v-model="artist.genreId"
        >
          <option
            v-for="genre in genres"
            :key="genre.id"
            :value="genre.id"
            :selected="artist.genreId === genre.id"
          >
            {{ genre.name }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {{ artist.id ? 'Modifier' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormArtist',
  data () {
    return {
      artist: {
        name: null,
        avatar: null,
        origin: null,
        description: null,
        genreId: null
      },
      genres: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'artist/ARTIST') {
        this.artist = mutations.payload
      } else if (mutations.type === 'genre/GENRES') {
        this.genres = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchGenres()

    if (this.$route.params.artistId) {
      this.fetchArtist(this.$route.params.artistId)
    }
  },
  methods: {
    submitForm (event) {
      event.preventDefault()
      if (this.artist.id) {
        // TODO : update existing artist
        this.$store.dispatch('artist/updateArtist', this.artist)
        this.redirect()
      } else {
        // Create new artist
        this.$store.dispatch('artist/createArtist', this.artist)
        this.redirect()
      }
    },
    fetchArtist (id) {
      this.$store.dispatch('artist/getOneArtist', id)
    },
    fetchGenres () {
      this.$store.dispatch('genre/getGenres')
    },
    redirect () {
      this.artist.id ? this.flash('Artiste/Groupe modifié avec succès !', 'succes', { timeout: 5000 }) : this.flash('Artiste/Groupe modifié avec succès !', 'succes', { timeout: 5000 })
      this.$router.push('/admin/artists')
    }
  },
  beforeDestroy () {
    this.unsubscribe()
  }
}
</script>
