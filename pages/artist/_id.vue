<template>
  <div>
    <h1>{{ artist.name }}</h1>
    <img :src="artist.avatar" alt="Avatar de l'artiste/groupe">
    <p>{{ artist.description }}</p>
    <div class="flex flex-row justify-around items-center">
      <span>{{ artist.origin }}</span>
      <span>{{ artist.likes }}</span>
      <span>{{ genre.name }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      idArtist: this.$route.params.id,
      artist: {
        name: null,
        avatar: null,
        description: null,
        origin: null,
        likes: null,
        genreId: null
      },
      genre: {
        name: null
      }
    }
  },
  mounted () {
    this.fetchArtist()
  },
  methods: {
    fetchArtist () {
      axios.get(`http://localhost:3000/artists/${this.idArtist}`)
        .then((response) => {
          this.artist = response.data
          this.fetchGenre(this.artist.genreId)
        })
    },
    fetchGenre (id) {
      axios.get(`http://localhost:3000/genres/${id}`)
        .then((response) => {
          this.genre = response.data
        })
    }
  }
}
</script>
