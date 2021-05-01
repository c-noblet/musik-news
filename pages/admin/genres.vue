<template>
  <div>
    <h1>Gestion des genres</h1>
    <NuxtLink to="/admin/form-genre">Ajouter</NuxtLink>
    <table-genre :genres="genres"/>
  </div>
</template>

<script>
import GenreTable from '@/components/Genre/GenreTable'

export default {
  name: 'GenresAdminPage',
  components: {
    'table-genre': GenreTable
  },
  data () {
    return {
      genres: [],
      genre: {
        name: null
      },
      idGenre: null
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'genre/GENRES') {
        this.genres = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchGenres()
  },
  methods: {
    fetchGenres () {
      this.$store.dispatch('genre/getGenres')
    }
  }
}
</script>
