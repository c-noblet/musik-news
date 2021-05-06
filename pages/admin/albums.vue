<template>
  <div class="w-100">
    <h1 class="flex items-center py-2 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">Gestion des albums</h1>
    <div class="text-right">
      <NuxtLink to="/admin/form-album" class="ml-auto">Ajouter</NuxtLink>
    </div>
    <table-album />
  </div>
</template>

<script>
import AlbumTable from '@/components/Album/AlbumTable'

export default {
  name: 'AlbumsAdminPage',
  components: {
    'table-album': AlbumTable
  }
}
</script>
