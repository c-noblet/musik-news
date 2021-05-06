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
          v-model="concert.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Nom"
          required
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
          Date
        </label>
        <input
          id="date"
          v-model="concert.date"
          type="date"
        >
      </div>
      <div class="inline-block relative w-64">
        <select
          v-model="concert.artistId"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option
            v-for="artist in artists"
            :key="artist.id"
            :value="artist.id"
            :selected="concert.artistId === artist.id"
          >
            {{ artist.name }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {{ concert.id ? 'Modifier' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormConcert',
  data () {
    return {
      concert: {
        name: null,
        date: null,
        artistId: null
      },
      artists: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'concert/CONCERT') {
        this.concert = mutations.payload
      } else if (mutations.type === 'artist/ARTISTS') {
        this.artists = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchArtists()

    if (this.$route.params.concertId) {
      this.fetchConcert(this.$route.params.concertId)
    }
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    submitForm (event) {
      event.preventDefault()
      if (this.concert.id) {
        // TODO : update existing artist
        this.$store.dispatch('concert/updateConcert', this.concert)
        this.redirect()
      } else {
        // Create new artist
        this.$store.dispatch('concert/createConcert', this.concert)
        this.redirect()
      }
    },
    fetchConcert (id) {
      this.$store.dispatch('concert/getOneConcert', id)
    },
    fetchArtists () {
      this.$store.dispatch('artist/getAllArtists')
    },
    redirect () {
      this.concert.id ? this.$store.dispatch('flashMessage/addSuccessMessage', 'Concert modifié avec succès !') : this.$store.dispatch('flashMessage/addSuccessMessage', 'Artiste/Groupe ajouté avec succès !')
      this.$router.push('/admin/concerts')
    }
  }
}
</script>
