<template>
  <div>
    <h1>Gestion des artistes/groupes</h1>
    <NuxtLink to="/admin/form-artist">Ajouter</NuxtLink>
    <table-artist :artists="artists"/>
  </div>
</template>

<script>
import ArtistTable from '@/components/Artist/ArtistTable'

export default {
  name: 'ArtistsAdminPage',
  components: {
    'table-artist': ArtistTable
  },
  data () {
    return {
      artists: [],
      artist: {
        name: null,
        avatar: null,
        origin: null,
        description: null,
        genreId: null
      },
      idArtist: null
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
      this.$store.dispatch('artist/getAllArtists')
    }
  }
}
</script>
