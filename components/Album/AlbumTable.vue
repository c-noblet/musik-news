<template>
  <div>
    <table class="rounded-t-lg w-full bg-gray-200 text-gray-800">
      <thead>
        <tr class="text-left border-b border-gray-300">
          <th class="px-4 py-3">
            Nom
          </th>
          <th class="px-4 py-3">
            Artiste
          </th>
          <th class="px-4 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="album in albums" :key="album.id" class="bg-gray-100 border-b border-gray-200" :album="album">
          <td class="px-4 py-3">
            {{ album.name }}
          </td>
          <td class="px-4 py-3">
            {{ album.artist.name }}
          </td>
          <td class="px-4 py-3">
            <div class="flex item-center justify-start">
              <NuxtLink :to="{name: 'admin-form-album', params: {albumId: album.id}}" class="btn-action">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000000">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </NuxtLink>
              <button class="btn-action ml-5" @click="deleteAlbum(album.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000000">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :nb-element="nbAlbums" :limit="limit" :current-page="currentPage" @changePage="changePage($event)" />
  </div>
</template>

<script>
import Pagination from '@/components/Common/Pagination'

export default {
  name: 'AlbumTable',
  components: {
    pagination: Pagination
  },
  data () {
    return {
      albums: [],
      nbAlbums: null,
      limit: 5,
      currentPage: 1
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'album/ALBUMS') {
        this.albums = mutations.payload
      } else if (mutations.type === 'album/NBALBUMS') {
        this.nbAlbums = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchAlbums({ page: this.currentPage, limit: this.limit })
  },
  methods: {
    fetchAlbums (params) {
      this.$store.dispatch('album/getAlbums', params)
    },
    deleteAlbum (id) {
      this.$store.dispatch('album/deleteAlbum', id)
        .then(() => {
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Album supprimé avec succès !')
          this.fetchAlbums({ page: this.currentPage, limit: this.limit })
        })
    },
    changePage (data) {
      this.currentPage = data
      this.fetchAlbums({ page: data, limit: this.limit })
    }
  }
}
</script>
