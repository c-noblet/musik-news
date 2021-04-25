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
    <h3>Nombre d'albums : {{ albums.length }}</h3>
    <ul>
      <li v-for="album in albums" :key="album.id" :album="album">
        {{ album.name }} <br>
        Sortie : {{ album.released }} <br>
        Nombre de chanson : {{ album.tracks }}
      </li>
    </ul>
    <h3>Nombre de concerts : {{ concerts.length }}</h3>
    <ul>
      <li v-for="concert in concerts" :key="concert.id" :concert="concert">
        {{ concert.name }} <br>
        Date : {{ concert.date }}
      </li>
    </ul>
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
      },
      albums: [],
      concerts: []
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
          this.fetchAlbums(this.artist.id)
          this.fetchConcerts(this.artist.id)
        })
    },
    fetchGenre (id) {
      axios.get(`http://localhost:3000/genres/${id}`)
        .then((response) => {
          this.genre = response.data
        })
    },
    fetchAlbums (idArtist) {
      axios.get(`http://localhost:3000/albums?artistId=${idArtist}`)
        .then((response) => {
          this.albums = response.data
        })
    },
    fetchConcerts (idArtist) {
      axios.get(`http://localhost:3000/concerts?artistId=${idArtist}`)
        .then((response) => {
          this.concerts = response.data
        })
    }
  }
}
</script>
