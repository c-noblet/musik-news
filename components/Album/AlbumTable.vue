<template>
  <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
    <thead>
      <tr class="text-left border-b border-gray-300">
        <th class="px-4 py-3">Nom</th>
        <th class="px-4 py-3">Artiste</th>
        <th class="px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-gray-100 border-b border-gray-200" v-for="album in albums" :key="album.id" :album="album">
        <td class="px-4 py-3">{{ album.name }}</td>
        <td class="px-4 py-3">{{ album.artist.name }}</td>
        <td class="px-4 py-3">
          <NuxtLink :to="{name: 'admin-form-album', params: {albumId: album.id}}">
            Modifier
          </NuxtLink>
          <button @click="deleteAlbum(album.id)">
            Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'AlbumTable',
  data () {
    return {
      albums: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'album/ALBUMS') {
        this.albums = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchAlbums()
  },
  methods: {
    fetchAlbums () {
      this.$store.dispatch('album/getAllAlbums')
    },
    deleteAlbum (id) {
      this.$store.dispatch('album/deleteAlbum', id)
        .then(() => {
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Album supprimé avec succès !')
          this.fetchAlbums()
        })
    }
  }
}
</script>
