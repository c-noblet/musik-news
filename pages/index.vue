<template>
  <div class="container">
    <h1>Musik</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <a href="">{{ article.title }}</a>
      </li>
    </ul>
    <ul>
      <li v-for="album in albums" :key="album.id">
        <a href="">{{ album.name }}</a>
      </li>
    </ul>
    <ul>
      <li v-for="artist in artists" :key="artist.id">
        <a href="">{{ artist.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      articles: [],
      albums: [],
      artists: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      console.log(mutations)
      if (mutations.type === 'article/LASTARTICLES') {
        this.articles = mutations.payload
      } else if (mutations.type === 'album/LASTALBUMS') {
        this.albums = mutations.payload
      } else if (mutations.type === 'artist/ARTISTS') {
        this.artists = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchArticles()
    this.fetchAlbums()
    this.fetchArtists()
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    fetchArticles () {
      this.$store.dispatch('article/fetchLastArticles')
    },
    fetchAlbums () {
      this.$store.dispatch('album/getLastAlbums')
    },
    fetchArtists () {
      this.$store.dispatch('artist/getTopArtists')
    }
  }
}
</script>
