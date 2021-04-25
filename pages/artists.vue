<template>
  <div class="flex flex-row flex-wrap justify-around items-center">
    <artist-card v-for="artist in artists" :key="artist.id" :artist="artist"/>
  </div>
</template>

<script>
import axios from 'axios'
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
  methods: {
    fetchArtists () {
      axios.get('http://localhost:3000/artists')
        .then((response) => {
          this.artists = response.data
        })
    }
  },
  mounted () {
    this.fetchArtists()
  }
}
</script>
