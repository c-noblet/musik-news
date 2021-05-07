export const state = () => {
  return {
    concert: {
      name: null,
      avatar: null,
      origin: null,
      description: null,
      genreId: null
    },
    concerts: [],
    nbConcerts: 0,
    concertCreated: null,
    concertDeleted: null,
    concertUpdated: null
  }
}

export const getters = {
  concert (state) {
    return state.concert
  },
  concerts (state) {
    return state.concerts
  },
  nbConcerts (state) {
    return state.nbConcerts
  }
}

export const mutations = {
  CONCERT (state, payload) {
    state.concert = payload.data
  },
  CONCERTS (state, payload) {
    state.concerts = payload.data
  },
  NBCONCERTS (state, payload) {
    state.nbConcerts = payload.data
  },
  CONCERTCREATED (state, payload) {
    state.concertCreated = payload.data
  },
  CONCERTDELETED (state, payload) {
    state.concertDeleted = payload.data
  },
  CONCERTUPDATED (state, payload) {
    state.concertUpdated = payload.data
  }
}

export const actions = {
  // TODO : add errors manager
  getAllConcerts (context) {
    this.$axios.get('/concerts?_expand=artist')
      .then(async (response) => {
        await context.commit('CONCERTS', response.data)
      })
  },
  getConcerts (context, data) {
    this.$axios.get(`/concerts?_expand=artist&_page=${data.page}&_limit=${data.limit}${data.name ? '&name=' + data.name : ''}`)
      .then(async (response) => {
        await context.commit('CONCERTS', response.data)
        await context.commit('NBCONCERTS', response.headers['x-total-count'])
      })
  },
  getTopConcerts (context, data) {
    this.$axios.get('/concerts?age}&_limit=5&_sort=likes&_order=desc')
      .then(async (response) => {
        await context.commit('CONCERTS', response.data)
      })
  },
  getOneConcert (context, id) {
    this.$axios.get(`/concerts/${id}`)
      .then(async (response) => {
        await context.commit('CONCERT', response.data)
      })
  },
  deleteConcert (context, id) {
    this.$axios.delete(`/concerts/${id}`)
      .then(async (response) => {
        await context.commit('CONCERTDELETED', response.data)
      })
  },
  createConcert (context, data) {
    this.$axios.post('/concerts', {
      name: data.name,
      date: data.date,
      artistId: data.artistId
    })
      .then(async (response) => {
        await context.commit('CONCERTCREATED', response.data)
      })
  },
  updateConcert (context, data) {
    this.$axios.patch(`/concerts/${data.id}`, {
      name: data.name,
      date: data.date,
      artistId: data.artistId
    })
      .then(async (response) => {
        await context.commit('CONCERTUPDATED', response.data)
      })
  }
}
