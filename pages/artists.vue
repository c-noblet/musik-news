<template>
  <div class="flex flex-row flex-wrap justify-around items-center">
    <artist-card v-for="artist in artists" :key="artist.id" :artist="artist" />
  </div>
</template>

<script>
import ArtistCard from '~/components/Artist/ArtistCard.vue'

export default {
  components: {
    'artist-card': ArtistCard
  },
  data () {
    return {
      artists: []
    }
  },
  mounted () {
    this.fetchArtists()
  },
  methods: {
    fetchArtists () {
      this.$axios.get('/artists')
        .then((response) => {
          this.artists = response.data
        })
    }
  }
}
</script>
