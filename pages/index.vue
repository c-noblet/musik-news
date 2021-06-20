<template>
  <div>
    <div class="mx-auto w-80 mb-20">
      <h1 class="text-center text-4xl font-bold pt-1 pb-2 px-8 border-t-4 border-b-4 border-gray-100">
        Musik-News
      </h1>
    </div>
    <section class="mb-20">
      <h2 class="py-1 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">
        Nouveautés
      </h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-2 mb-3">
        <li v-for="article in articles" :key="article.id">
          <Article :data="article" />
        </li>
      </ul>
      <nuxt-link to="/news" class="btn btn-primary ml-auto table">
        Toutes les nouveautés
      </nuxt-link>
    </section>
    <section class="mb-20">
      <h2 class="py-1 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">
        Derniers albums
      </h2>
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-10 mb-3">
        <li v-for="album in albums" :key="album.id" :album="album" class="album">
          <nuxt-link :to="{name: 'artist-id', params: {id: album.artist.id }}">
            <div class="cover">
              <p class="text-center">
                {{ album.released }}
              </p>
              <p class="text-center">
                {{ album.tracks }} tracks
              </p>
            </div>
            <p class="text-center">
              {{ album.name }}
            </p>
          </nuxt-link>
        </li>
      </ul>
    </section>
    <section class="mb-20">
      <h2 class="py-1 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">
        Top Artistes
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-10 mb-3">
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
