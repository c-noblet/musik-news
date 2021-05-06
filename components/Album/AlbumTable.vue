<template>
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Artiste</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="album in albums" :key="album.id" :album="album">
        <td>{{ album.name }}</td>
        <td>{{ album.artist.name }}</td>
        <td>
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
