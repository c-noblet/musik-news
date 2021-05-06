export const state = () => {
  return {
    album: {
      name: null,
      released: null,
      tracks: null,
      artistId: null
    },
    albums: [],
    lastAlbums: [],
    nbAlbums: 0,
    albumCreated: null,
    albumDeleted: null,
    albumUpdated: null
  }
}

export const getters = {
  album (state) {
    return state.album
  },
  albums (state) {
    return state.albums
  },
  nbAlbums (state) {
    return state.nbAlbums
  }
}

export const mutations = {
  ALBUM (state, payload) {
    state.album = payload.data
  },
  ALBUMS (state, payload) {
    state.albums = payload.data
  },
  NBALBUMS (state, payload) {
    state.nbAlbums = payload.data
  },
  ALBUMCREATED (state, payload) {
    state.albumCreated = payload.data
  },
  ALBUMDELETED (state, payload) {
    state.albumDeleted = payload.data
  },
  ALBUMUPDATED (state, payload) {
    state.albumUpdated = payload.data
  },
  LASTALBUMS (state, payload) {
    state.lastAlbums = payload.data
  }
}

export const actions = {
  // TODO : add errors manager
  getAllAlbums (context) {
    this.$axios.get('/albums?_expand=artist')
      .then(async (response) => {
        await context.commit('ALBUMS', response.data)
      })
  },
  getLastAlbums (context) {
    this.$axios.get('/albums?_expand=artist&_sort=released&_order=asc&_limit=5')
      .then(async (response) => {
        await context.commit('LASTALBUMS', response.data)
      })
  },
  getAlbums (context, data) {
    this.$axios.get(`/albums?_expand=artist&_page=${data.page}&_limit=${data.limit}${data.name ? '&name=' + data.name : ''}${data.origin ? '&origin=' + data.origin : ''}${data.genreId ? '&genreId=' + data.genreId : ''}`)
      .then(async (response) => {
        await context.commit('ALBUMS', response.data)
        await context.commit('NBALBUMS', response.headers['x-total-count'])
      })
  },
  getOneAlbum (context, id) {
    this.$axios.get(`/albums/${id}`)
      .then(async (response) => {
        await context.commit('ALBUM', response.data)
      })
  },
  deleteAlbum (context, id) {
    this.$axios.delete(`/albums/${id}`)
      .then(async (response) => {
        await context.commit('ALBUMDELETED', response.data)
      })
  },
  createAlbum (context, data) {
    this.$axios.post('/albums', {
      name: data.name,
      released: data.released,
      tracks: data.tracks,
      artistId: data.artistId
    })
      .then(async (response) => {
        await context.commit('ALBUMCREATED', response.data)
      })
  },
  updateAlbum (context, data) {
    this.$axios.patch(`/albums/${data.id}`, {
      name: data.name,
      released: data.released,
      tracks: data.tracks,
      artistId: data.artistId
    })
      .then(async (response) => {
        await context.commit('ALBUMUPDATED', response.data)
      })
  }
}
