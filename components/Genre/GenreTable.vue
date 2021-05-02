<template>
  <div>
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
    <pagination :nbElement="nbGenres" :limit="limit" :currentPage="currentPage" @changePage="changePage($event)"/>
  </div>
</template>

<script>
import Pagination from '@/components/Common/Pagination'

export default {
  name: 'GenreTable',
  components: {
    pagination: Pagination
  },
  props: ['role'],
  data () {
    return {
      genres: [],
      nbGenres: null,
      limit: 2,
      currentPage: 1
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'genre/GENRES') {
        this.genres = mutations.payload
      } else if (mutations.type === 'genre/NBGENRES') {
        this.nbGenres = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchGenres({ page: this.currentPage, limit: this.limit })
  },
  methods: {
    fetchGenres (params) {
      this.$store.dispatch('genre/getGenres', params)
    },
    deleteGenre (id) {
      this.$store.dispatch('genre/deleteGenre', id)
        .then(() => {
          this.flash('Genre supprimé avec succès !', 'success', { timeout: 5000 })
          this.fetchGenres()
        })
    },
    changePage (data) {
      this.currentPage = data
      this.fetchGenres({ page: data, limit: this.limit })
    }
  }
}
</script>
