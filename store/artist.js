import axios from 'axios'

export const state = () => {
  return {
    artist: null,
    artists: []
  }
}

export const getters = {}

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
  }
}
