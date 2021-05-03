<template>
  <div>
    <h1>Gestion des genres</h1>
    <NuxtLink to="/admin/form-genre">Ajouter</NuxtLink>
    <table-genre/>
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
      genre: {
        name: null
      },
      idGenre: null
    }
  }
}
</script>
