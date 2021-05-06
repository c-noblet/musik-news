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
          v-model="album.name"
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="released">Année de sortie</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="released"
          id="released"
          min="1900"
          :max="new Date().getFullYear()"
          step= "1"
          placeholder="2020"
          required
          v-model="album.released"
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="tracks">Nombre de musiques</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="tracks"
          id="tracks"
          min="0"
          step= "1"
          placeholder="12"
          required
          v-model="album.tracks"
        >
      </div>
      <label class="block text-gray-700 text-sm font-bold mb-2">Artiste</label>
      <div class="inline-block relative w-full mb-4">
        <select
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          v-model="album.artistId"
        >
          <option
            v-for="artist in artists"
            :key="artist.id"
            :value="artist.id"
            :selected="album.artistId === artist.id"
          >
            {{ artist.name }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button class="btn btn-primary" type="submit">
          {{ album.id ? 'Modifier' : 'Ajouter' }}
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
      album: {
        name: null,
        released: null,
        tracks: null,
        artistId: null
      },
      artists: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'album/ALBUM') {
        this.album = mutations.payload
      } else if (mutations.type === 'artist/ARTISTS') {
        this.artists = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchArtists()

    if (this.$route.params.albumId) {
      this.fetchAlbum(this.$route.params.albumId)
    }
  },
  methods: {
    submitForm (event) {
      event.preventDefault()
      if (this.album.id) {
        this.$store.dispatch('album/updateAlbum', this.album)
        this.redirect()
      } else {
        // Create new artist
        this.$store.dispatch('album/createAlbum', this.album)
        this.redirect()
      }
    },
    fetchAlbum (id) {
      this.$store.dispatch('album/getOneAlbum', id)
    },
    fetchArtists () {
      this.$store.dispatch('artist/getAllArtists')
    },
    redirect () {
      this.album.id ? this.$store.dispatch('flashMessage/addSuccessMessage', 'Album modifié avec succès !') : this.$store.dispatch('flashMessage/addSuccessMessage', 'Album ajouté avec succès !')
      this.$router.push('/admin/albums')
    }
  },
  beforeDestroy () {
    this.unsubscribe()
  }
}
</script>
