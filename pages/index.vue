<template>
  <div class="container">
    <div class="flex flex-col justify-center items-center mb-20">
      <h1 class="text-center text-4xl font-bold pt-1 pb-2 px-8 border-t-4 border-b-4 border-gray-100">Musik-News</h1>
    </div>
    <section class="mb-20">
      <h2 class="flex items-center py-1 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">Nouveautés</h2>
      <ul class="flex flex-col md:flex-row mb-5">
        <li v-for="article in articles" :key="article.id" class="m-5 w-3/6">
          <Article :data="article" />
        </li>
      </ul>
      <nuxt-link to="/news" class="btn btn-primary ml-auto table">
        Toutes les nouveautés
      </nuxt-link>
    </section>
    <section class="mb-20">
      <h2 class="flex items-center py-1 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">Derniers albums</h2>
      <ul class="flex flex-row flew-wrap justify-center items-center">
        <li v-for="album in albums" :key="album.id" :album="album" class="album flex flex-col justify-center items-center">
          <nuxt-link :to="{name: 'artist-id', params: {id: album.artist.id }}">
            <div class="cover">
              <div class="hover">
                <p>{{ album.released }}</p>
                <p>{{ album.tracks }} tracks</p>
              </div>
            </div>
            <p class="text-center">{{ album.name }}</p>
          </nuxt-link>
        </li>
      </ul>
    </section>
    <section class="">
      <h2 class="flex items-center py-1 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">Top Artistes</h2>
      <div class="flex flex-row flex-wrap justify-around items-center mb-5">
        <artist-card v-for="artist in artists" :key="artist.id" :artist="artist" />
      </div>
      <nuxt-link to="/artists" class="btn btn-primary ml-auto table">
        Tous les artistes
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import Article from '@/components/Articles/Article'

export default {
  name: 'Home',
  components: {
    Article
  },
  data () {
    return {
      articles: [],
      albums: [],
      artists: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
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
