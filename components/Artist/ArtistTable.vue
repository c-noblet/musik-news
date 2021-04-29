<template>
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Origine</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="artist in artists" :key="artist.id" :artist="artist">
        <td>{{ artist.name }}</td>
        <td>{{ artist.origin }}</td>
        <td>
          <button>Modifier</button>
          <button @click="deleteArtist(artist)">
            Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ArtistTable',
  props: ['role'],
  data () {
    return {
      artists: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'artist/ARTISTS') {
        this.artists = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchArtists()
  },
  methods: {
    fetchArtists () {
      this.$store.dispatch('artist/getArtists')
    },
    deleteArtist (artist) {
      console.log('deleteArtist')
    }
  }
}
</script>
