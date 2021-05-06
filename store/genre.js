export const state = () => {
  return {
    genre: {
      name: null
    },
    genres: [],
    nbGenres: 0
  }
}

export const getters = {
  genre (state) {
    return state.genre
  },
  genres (state) {
    return state.genres
  },
  nbGenres (state) {
    return state.nbGenres
  }
}

export const mutations = {
  GENRE (state, payload) {
    state.genre = payload.data
  },
  GENRES (state, payload) {
    state.genres = payload.data
  },
  NBGENRES (state, payload) {
    state.nbGenres = payload.data
  }
}

export const actions = {
  getAllGenres (context) {
    this.$axios.get('/genres')
      .then(async (response) => {
        await context.commit('GENRES', response.data)
      })
  },
  getGenres (context, data) {
    this.$axios.get(`/genres?_page=${data.page}&_limit=${data.limit}`)
      .then(async (response) => {
        await context.commit('GENRES', response.data)
        await context.commit('NBGENRES', response.headers['x-total-count'])
      })
  },
  getOneGenre (context, id) {
    this.$axios.get(`/genres/${id}`)
      .then(async (response) => {
        console.log(response)
        await context.commit('GENRE', response.data)
      })
  },
  deleteGenre (context, id) {
    this.$axios.delete(`/genres/${id}`)
      .then(async (response) => {
        await console.log(response)
      })
  },
  createGenre (context, data) {
    this.$axios.post('/genres', {
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
  updateGenre (context, data) {
    this.$axios.put(`/genres/${data.id}`, {
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
