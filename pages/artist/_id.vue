<template>
  <div>
    <div class="flex flex-col md:flex-row">
      <img :src="artist.avatar" alt="Avatar de l'artiste/groupe" class="avatar-artist">
      <div class="flex flex-col md:ml-5">
        <h1>{{ artist.name }}</h1>
        <div class="flex flex-row">
          <span>{{ artist.likes }}</span>
          <button
            :disabled="!isAuth"
            :class="btnLikeClassName + ' ml-5'"
            @click="like()"
          >
            <!-- TODO : replace libelle by font awesome or svg -->
            {{ btnLikeLibelle }}
          </button>
        </div>
        <p>{{ artist.description }}</p>
        <p>{{ artist.origin }}</p>
        <p v-if="artist.genre">
          {{ artist.genre.name }}
        </p>
      </div>
    </div>
    <div class="my-5">
      <h2>Albums ({{ artist.albums.length }})</h2>
      <ul v-if="artist.albums.length > 0" class="flex flex-row flew-wrap justify-start items-center">
        <li v-for="album in artist.albums" :key="album.id" :album="album" class="album flex flex-col justify-center items-center">
          <div class="cover">
            <div class="hover">
              <p>{{ album.released }}</p>
              <p>{{ album.tracks }} tracks</p>
            </div>
          </div>
          <p>{{ album.name }}</p>
        </li>
      </ul>
    </div>
    <div>
      <h2>Concerts ({{ artist.concerts.length }})</h2>
      <ul v-if="artist.concerts.length > 0">
        <li v-for="concert in concerts" :key="concert.id" :concert="concert">
          {{ concert.name }} <br>
          Date : {{ concert.date }}
        </li>
      </ul>
    </div>
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
        likes: 0,
        genreId: null,
        albums: [],
        concerts: [],
        genre: {
          name: null
        }
      },
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
      } else if (mutations.type === 'artist/ARTISTUPDATED') {
        this.fetchArtist()
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
    like () {
      this.alreadyLiked ? this.artist.likes-- : this.artist.likes++
      this.$store.dispatch('artist/likeArtist', this.artist)
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
