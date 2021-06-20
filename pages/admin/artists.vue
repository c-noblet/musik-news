<template>
  <div>
    <h1 class="flex items-center py-2 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">
      Gestion des artistes/groupes
    </h1>
    <div class="text-right mb-5">
      <NuxtLink to="/admin/form-artist" class="btn btn-primary ml-auto">
        Ajouter
      </NuxtLink>
    </div>
    <table-artist />
  </div>
</template>

<script>
import ArtistTable from '@/components/Artist/ArtistTable'

export default {
  name: 'ArtistsAdminPage',
  components: {
    'table-artist': ArtistTable
  }
}
</script>
