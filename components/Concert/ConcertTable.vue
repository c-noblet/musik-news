<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Date</th>
          <th>Artiste</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="concert in concerts" :key="concert.id">
          <td>{{ concert.name }}</td>
          <td>{{ getDate(concert.date) }}</td>
          <td>{{ getArtist(concert.artistId) }}</td>
          <td>
            <NuxtLink :to="{name: 'admin-form-concert', params: { concertId: concert.id }}">
              Modifier
            </NuxtLink>
            <button @click="deleteConcert(concert.id)">
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
  name: 'ConcertTable',
  data () {
    return {
      concerts: [],
      artists: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'concert/CONCERTS') {
        this.concerts = mutations.payload
      } else if (mutations.type === 'artist/ARTISTS') {
        this.artists = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchArtists()
    this.fetchConcerts()
  },
  methods: {
    getArtist (id) {
      let artistName = ''
      this.artists.forEach((artist) => {
        if (artist.id === id) {
          artistName = artist.name
        }
      })
      return artistName
    },
    getDate (dateStr) {
      if (dateStr.includes('/')) {
        return dateStr
      } else {
        const date = new Date(dateStr)
        return date.toLocaleDateString()
      }
    },
    fetchConcerts () {
      this.$store.dispatch('concert/getAllConcerts')
    },
    fetchArtists () {
      this.$store.dispatch('artist/getAllArtists')
    },
    deleteConcert (id) {
      this.$store.dispatch('concert/deleteConcert', id)
        .then(() => {
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Concert supprimé avec succès !')
          this.fetchConcerts()
        })
    }
  }
}
</script>
