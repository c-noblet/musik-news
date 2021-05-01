<template>
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="genre in genres" :key="genre.id" :genre="genre">
        <td>{{ genre.name }}</td>
        <td>
          <NuxtLink :to="{name: 'admin-form-genre', params: {genreId: genre.id}}">Modifier</NuxtLink>
          <button @click="deleteGenre(genre.id)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'GenreTable',
  props: ['role'],
  data () {
    return {
      genres: []
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
    },
    deleteGenre (id) {
      this.$store.dispatch('genre/deleteGenre', id)
        .then(() => {
          this.flash('Genre supprimé avec succès !', 'success', { timeout: 5000 })
          this.fetchGenres()
        })
    }
  }
}
</script>
