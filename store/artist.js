import axios from 'axios'

export const state = () => {
  return {
    artist: {
      name: null,
      avatar: null,
      origin: null,
      description: null,
      genreId: null
    },
    artists: [],
    nbArtists: 0,
    artistCreated: null,
    artistDeleted: null,
    artistUpdated: null
  }
}

export const getters = {
  artist (state) {
    return state.artist
  },
  artists (state) {
    return state.artists
  },
  nbArtists (state) {
    return state.nbArtists
  }
}

export const mutations = {
  ARTIST (state, payload) {
    state.artist = payload.data
  },
  ARTISTS (state, payload) {
    state.artists = payload.data
  },
  NBARTISTS (state, payload) {
    state.nbArtists = payload.data
  },
  ARTISTCREATED (state, payload) {
    state.artistCreated = payload.data
  },
  ARTISTDELETED (state, payload) {
    state.artistDeleted = payload.data
  },
  ARTISTUPDATED (state, payload) {
    state.artistUpdated = payload.data
  }
}

export const actions = {
  // TODO : add errors manager
  getAllArtists (context) {
    axios.get('http://localhost:3000/artists')
      .then(async (response) => {
        await context.commit('ARTISTS', response.data)
      })
  },
  getArtists (context, data) {
    axios.get(`http://localhost:3000/artists?_page=${data.page}&_limit=${data.limit}${data.name ? '&name=' + data.name : ''}${data.origin ? '&origin=' + data.origin : ''}${data.genreId ? '&genreId=' + data.genreId : ''}`)
      .then(async (response) => {
        await context.commit('ARTISTS', response.data)
        await context.commit('NBARTISTS', response.headers['x-total-count'])
      })
  },
  getTopArtists (context, data) {
    axios.get('http://localhost:3000/artists?age}&_limit=5&_sort=likes&_order=desc')
      .then(async (response) => {
        await context.commit('ARTISTS', response.data)
      })
  },
  getOneArtist (context, id) {
    axios.get(`http://localhost:3000/artists/${id}`)
      .then(async (response) => {
        await context.commit('ARTIST', response.data)
      })
  },
  deleteArtist (context, id) {
    axios.delete(`http://localhost:3000/artists/${id}`)
      .then(async (response) => {
        await context.commit('ARTISTDELETED', response.data)
      })
  },
  createArtist (context, data) {
    axios.post('http://localhost:3000/artists', {
      name: data.name,
      description: data.description,
      origin: data.origin,
      avatar: data.avatar,
      genreId: data.genreId,
      likes: 0
    })
      .then(async (response) => {
        await context.commit('ARTISTCREATED', response.data)
      })
  },
  updateArtist (context, data) {
    axios.patch(`http://localhost:3000/artists/${data.id}`, {
      name: data.name,
      description: data.description,
      origin: data.origin,
      avatar: data.avatar,
      genreId: data.genreId
    })
      .then(async (response) => {
        await context.commit('ARTISTUPDATED', response.data)
      })
  }
}
