<template>
  <div>
    <h1>Gestion des albums</h1>
    <NuxtLink to="/admin/form-album">Ajouter</NuxtLink>
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
