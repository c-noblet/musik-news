<template>
  <div>
    <img :src="artist.avatar" alt="Avatar de l'artiste/groupe">
    <div class="flex flex-row justify-center items-center">
      <h1>{{ artist.name }}</h1>
      <button
        :disabled="!isAuth"
        :class="btnLikeClassName"
        @click="like()"
      >
        <!-- TODO : replace libelle by font awesome or svg -->
        {{ btnLikeLibelle }}
      </button>
    </div>
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
      concerts: [],
      isAuth: false,
      user: null,
      btnLikeClassName: 'btn-like-artist',
      btnLikeLibelle: 'Like',
      alreadyLiked: false
    }
  },
  watch: {
    user () {
      this.btnLikeClassName = 'btn-like-artist'
      this.btnLikeLibelle = 'Like'
      this.alreadyLiked = false
      if (this.user) {
        if (this.user.likes) {
          if (this.user.likes.includes(this.$route.params.id)) {
            this.btnLikeClassName = 'btn-like-artist unlike'
            this.btnLikeLibelle = 'Unlike'
            this.alreadyLiked = true
          }
        }
      }
    }
  },
  created () {
    this.isAuth = this.$store.getters['auth/getIsAuth']
    this.user = this.$store.getters['auth/getUser']

    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'auth/ISAUTH') {
        this.isAuth = mutations.payload
      } else if (mutations.type === 'auth/USER') {
        this.user = mutations.payload
      } else if (mutations.type === 'artist/ARTIST') {
        this.artist = mutations.payload
        this.fetchGenre(this.artist.genreId)
        this.fetchAlbums(this.artist.id)
        this.fetchConcerts(this.artist.id)
      } else if (mutations.type === 'genre/GENRE') {
        this.genre = mutations.payload
      } else if (mutations.type === 'album/ALBUMS') {
        this.albums = mutations.payload
      } else if (mutations.type === 'concert/CONCERTS') {
        this.concerts = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchUserInfo()
    this.fetchArtist()
  },
  methods: {
    fetchUserInfo () {
      this.$store.dispatch('auth/getUserInfo')
    },
    fetchArtist () {
      this.$store.dispatch('artist/getOneArtist', this.$route.params.id)
    },
    fetchGenre (id) {
      this.$store.dispatch('genre/getOneGenre', id)
    },
    fetchAlbums (idArtist) {
      this.$axios.get(`/albums?artistId=${idArtist}`)
        .then((response) => {
          this.albums = response.data
        })
    },
    fetchConcerts (idArtist) {
      this.$axios.get(`/concerts?artistId=${idArtist}`)
        .then((response) => {
          this.concerts = response.data
        })
    },
    like () {
      this.$store.dispatch('auth/likeArtist', { idArtist: this.$route.params.id, remove: this.alreadyLiked })
        .then(() => {
          if (this.alreadyLiked) {
            this.btnLikeClassName = 'btn-like-artist'
            this.btnLikeLibelle = 'Like'
            this.alreadyLiked = false
          } else {
            this.btnLikeClassName = 'btn-like-artist unlike'
            this.btnLikeLibelle = 'Unlike'
            this.alreadyLiked = true
          }
        })
    }
  }
}
</script>

<style scoped>
.btn-like-artist {
  color: blue;
}

.unlike {
  color: red !important;
}
</style>
