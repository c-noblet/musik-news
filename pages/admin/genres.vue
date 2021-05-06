<template>
  <div>
    <h1 class="flex items-center py-2 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">Gestion des genres</h1>
    <div class="text-right">
      <NuxtLink to="/admin/form-genre" class="btn btn-primary ml-auto">Ajouter</NuxtLink>
    </div>
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
