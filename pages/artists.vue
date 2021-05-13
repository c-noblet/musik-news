<template>
  <div>
    <div class="mx-auto w-80 mb-20">
      <h1 class="text-center text-4xl font-bold pt-1 pb-2 px-8 border-t-4 border-b-4 border-gray-100">
        Artistes
      </h1>
    </div>
    <form
      class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-10 mb-5"
      @submit="submitForm($event)"
    >
      <input
        id="name"
        v-model="searchArtistObject.name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Nom"
      >
      <input
        id="origin"
        v-model="searchArtistObject.origin"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Origine"
      >
      <select
        id="genreId"
        v-model="searchArtistObject.genreId"
        class="block w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" selected>
          -- Genre --
        </option>
        <option
          v-for="genre in genres"
          :key="genre.id"
          :value="genre.id"
        >
          {{ genre.name }}
        </option>
      </select>
      <button class="btn btn-primary" type="submit">
        Rechercher
      </button>
    </form>
    <div v-if="nbArtists != 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-10">
      <artist-card v-for="artist in artists" :key="artist.id" :artist="artist" />
    </div>
    <div v-else class="flex flex-row flex-wrap justify-around items-center">
      <p>Aucun artiste trouvé</p>
    </div>
    <pagination :nb-element="nbArtists" :limit="limit" :current-page="currentPage" @changePage="changePage($event)" />
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
