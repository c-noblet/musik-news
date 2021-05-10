<template>
  <div id="artist-page">
    <div>
      <div class="flex flex-col justify-center items-center small-container">
        <img :src="artist.avatar" alt="Avatar de l'artiste/groupe" class="avatar-artist">
        <h1 class="text-center my-5 uppercase">
          {{ artist.name }}
        </h1>
        <div class="flex flex-col justify-center items-center">
          <div class="flex flex-row artist-info mb-3">
            <div>
              <p v-if="artist.genre" class="uppercase">
                {{ artist.genre.name }}
              </p>
            </div>
            <div>
              <p class="uppercase">
                {{ artist.origin }}
              </p>
            </div>
            <div class="flex flex-row">
              <button
                :disabled="!isAuth"
                class="mr-3"
                @click="like()"
              >
                <img src="~/assets/img/svg/like.svg" height="20" width="20" :class="btnLikeClassName">
              </button>
              <span>{{ artist.likes }}</span>
            </div>
          </div>
          <p class="text-center">
            {{ artist.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="my-5">
      <ul v-if="artist.albums.length > 0" class="flex flex-row flew-nowrap justify-start items-center overflow-x-auto album-container">
        <li v-for="album in sortedAlbums" :key="album.id" :album="album" class="album flex flex-col justify-center items-center">
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
        <li v-for="concert in artist.concerts" :key="concert.id" :concert="concert">
          {{ concert.name }} - {{ concert.date }}
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
      sortedAlbums: [],
      isAuth: false,
      user: null,
      btnLikeClassName: '',
      alreadyLiked: false
    }
  },
  watch: {
    user () {
      this.btnLikeClassName = ''
      this.alreadyLiked = false
      if (this.user) {
        if (this.user.likes) {
          if (this.user.likes.includes(this.$route.params.id)) {
            this.btnLikeClassName = 'unlike'
            this.alreadyLiked = true
          }
        }
      }
    },
    artist () {
      if (this.artist.albums) {
        this.sortedAlbums = this.artist.albums.sort((a, b) => { return b.date - a.date })
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
            this.btnLikeClassName = ''
            this.alreadyLiked = false
          } else {
            this.btnLikeClassName = 'unlike'
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
