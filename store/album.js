import axios from 'axios'

export const state = () => {
  return {
    album: {
      name: null,
      released: null,
      tracks: null,
      artistId: null
    },
    albums: [],
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
  }
}

export const actions = {
  // TODO : add errors manager
  getAllAlbums (context) {
    axios.get('http://localhost:3000/albums?_expand=artist')
      .then(async (response) => {
        await context.commit('ALBUMS', response.data)
      })
  },
  getAlbums (context, data) {
    axios.get(`http://localhost:3000/albums?_expand=artist&_page=${data.page}&_limit=${data.limit}${data.name ? '&name=' + data.name : ''}${data.origin ? '&origin=' + data.origin : ''}${data.genreId ? '&genreId=' + data.genreId : ''}`)
      .then(async (response) => {
        await context.commit('ALBUMS', response.data)
        await context.commit('NBALBUMS', response.headers['x-total-count'])
      })
  },
  getOneAlbum (context, id) {
    axios.get(`http://localhost:3000/albums/${id}`)
      .then(async (response) => {
        await context.commit('ALBUM', response.data)
      })
  },
  deleteAlbum (context, id) {
    axios.delete(`http://localhost:3000/albums/${id}`)
      .then(async (response) => {
        await context.commit('ALBUMDELETED', response.data)
      })
  },
  createAlbum (context, data) {
    axios.post('http://localhost:3000/albums', {
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
    axios.patch(`http://localhost:3000/albums/${data.id}`, {
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
