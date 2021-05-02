<template>
  <div class="flex flex-col">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-50"
      @submit="submitForm($event)"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Nom
        </label>
        <input
          id="name"
          v-model="searchArtistObject.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Nom"
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="origin">
          Origine
        </label>
        <input
          id="origin"
          v-model="searchArtistObject.origin"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Origine"
        >
      </div>
      <div class="inline-block relative w-64">
        <select
          v-model="searchArtistObject.genreId"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" selected>-- Genre --</option>
          <option
            v-for="genre in genres"
            :key="genre.id"
            :value="genre.id"
          >
            {{ genre.name }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Rechercher
        </button>
      </div>
    </form>
    <div class="flex flex-row flex-wrap justify-around items-center">
      <artist-card v-for="artist in artists" :key="artist.id" :artist="artist" />
    </div>
    <pagination :nbElement="nbArtists" :limit="limit" :currentPage="currentPage" @changePage="changePage($event)" />
  </div>
</template>

<script>
import ArtistCard from '@/components/Artist/ArtistCard.vue'
import Pagination from '@/components/Common/Pagination'

export default {
  components: {
    'artist-card': ArtistCard,
    pagination: Pagination
  },
  data () {
    return {
      artists: [],
      searchArtistObject: {
        name: null,
        origin: null,
        genreId: ''
      },
      savedSearchArtistObject: {
        name: null,
        origin: null,
        genreId: ''
      },
      genres: [],
      nbArtists: 0,
      limit: 10,
      currentPage: 1
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'artist/ARTISTS') {
        this.artists = mutations.payload
      } else if (mutations.type === 'genre/GENRES') {
        this.genres = mutations.payload
      } else if (mutations.type === 'artist/NBARTISTS') {
        this.nbArtists = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchArtists({ page: this.currentPage, limit: this.limit })
    this.fetchGenres()
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    fetchArtists (params) {
      if (this.savedSearchArtistObject.name !== null && this.savedSearchArtistObject.name !== '') {
        params.name = this.savedSearchArtistObject.name
      }
      if (this.savedSearchArtistObject.origin !== null && this.savedSearchArtistObject.origin !== '') {
        params.origin = this.savedSearchArtistObject.origin
      }
      if (this.savedSearchArtistObject.genreId !== null && this.savedSearchArtistObject.genreId !== '') {
        params.genreId = this.savedSearchArtistObject.genreId
      }
      this.$store.dispatch('artist/getArtists', params)
    },
    fetchGenres () {
      this.$store.dispatch('genre/getAllGenres')
    },
    submitForm (event) {
      event.preventDefault()
      this.savedSearchArtistObject.name = this.searchArtistObject.name
      this.savedSearchArtistObject.origin = this.searchArtistObject.origin
      this.savedSearchArtistObject.genreId = this.searchArtistObject.genreId
      this.fetchArtists({ page: this.currentPage, limit: this.limit })
    },
    changePage (data) {
      this.currentPage = data
      this.fetchArtists({ page: data, limit: this.limit })
    }
  }
}
</script>
