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
    artists: []
  }
}

export const getters = {
  artist (state) {
    return state.artist
  }
}

export const mutations = {
  ARTIST (state, payload) {
    state.artist = payload.data
  },
  ARTISTS (state, payload) {
    state.artists = payload.data
  }
}

export const actions = {
  getArtists (context) {
    axios.get('http://localhost:3000/artists')
      .then(async (response) => {
        console.log(response)
        await context.commit('ARTISTS', response.data)
      })
  },
  getOneArtist (context, id) {
    axios.get(`http://localhost:3000/artists/${id}`)
      .then(async (response) => {
        console.log(response)
        await context.commit('ARTIST', response.data)
      })
  },
  deleteArtist (context, id) {
    console.log('artist/deleteArtist')
    axios.delete(`http://localhost:3000/artists/${id}`)
      .then(async (response) => {
        await console.log(response)
      })
  },
  createArtist (context, data) {
    axios.post('http://localhost:3000/artists', {
      name: data.name,
      description: data.description,
      origin: data.origin,
      avatar: data.avatar,
      genreId: data.genreId
    })
      .then(async (response) => {
        await console.log(response)
      })
  },
  updateArtist (context, data) {
    axios.put(`http://localhost:3000/artists/${data.id}`, {
      name: data.name,
      description: data.description,
      origin: data.origin,
      avatar: data.avatar,
      genreId: data.genreId
    })
      .then(async (response) => {
        await console.log(response)
      })
  }
}
