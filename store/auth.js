import jwtDecode from 'jwt-decode'

export const state = () => {
  /* eslint-disable */
  return {
    isAuth: null,
    role: null,
    user: null
  }
  /* eslint-enable */
}

export const getters = {
  getIsAuth (state) {
    return state.isAuth
  },
  getRole (state) {
    return state.role
  },
  getUser (state) {
    return state.user
  }
}

export const mutations = {
  ISAUTH (state, payload) {
    state.isAuth = payload.data
    console.log(state)
  },
  USER (state, payload) {
    state.user = payload.data
    console.log(state.user)
  },
  ROLE (state, payload) {
    state.role = payload.data
    console.log(state.role)
  }
}

export const actions = {
  async login (context, data) {
    await this.$axios.post('/login', {
      email: data.email,
      password: data.password
    })
      .then((response) => {
        const { accessToken } = response.data

        state.user = jwtDecode(accessToken)

        // TODO : check err

        localStorage.setItem('musik_news_token', accessToken)
        localStorage.setItem('musik_news_user_id', state.user.sub)

        return accessToken
      })
      .then(async (accessToken) => {
        await context.commit('ISAUTH', true)
        await context.commit('USER', state.user)
        await this.axios.get(`/users/${state.user.sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(async (response) => {
            await context.commit('ROLE', response.data.role)
          })
      })
  },
  async register (context, data) {
    const res = await this.$axios.post('/register', {
      email: data.email,
      password: data.password,
      username: data.username,
      role: 'user', // default role for new user
      likes: []
    })

    console.log(res.data)
    const { accessToken } = res.data

    state.user = jwtDecode(accessToken)

    await context.commit('ISAUTH', true)
    await context.commit('USER', state.user)
    await context.commit('ROLE', state.user.role)

    console.log(state.user)
    // TODO : check err

    localStorage.setItem('musik_news_token', accessToken)
    localStorage.setItem('musik_news_user_id', state.user.sub)

    return 'success'
  },
  async logout (context) {
    await context.commit('ISAUTH', false)
    await context.commit('USER', false)
    await context.commit('ROLE', false)

    localStorage.removeItem('musik_news_token')
    localStorage.removeItem('musik_news_user_id')
  },
  async getUserInfo (context) {
    if (localStorage.getItem('musik_news_user_id') && localStorage.getItem('musik_news_token')) {
      await this.$axios.get(`/users/${localStorage.getItem('musik_news_user_id')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('musik_news_token')}`
        }
      })
        .then(async (response) => {
          await context.commit('ISAUTH', true)
          await context.commit('USER', response.data)
          await context.commit('ROLE', response.data.role)
        })
    } else {
      await context.commit('ISAUTH', false)
      await context.commit('USER', false)
      await context.commit('ROLE', false)
    }
  },
  async likeArtist (context, data) {
    if (localStorage.getItem('musik_news_user_id') && localStorage.getItem('musik_news_token')) {
      await this.$axios.get(`/users/${localStorage.getItem('musik_news_user_id')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('musik_news_token')}`
        }
      })
        .then((response) => {
          const user = response.data
          let artistsLiked = []
          if (user.likes) {
            artistsLiked = user.likes
          }
          if (data.remove) {
            artistsLiked.splice(artistsLiked.indexOf(data.idArtist), 1)
          } else {
            artistsLiked.push(data.idArtist)
          }

          return artistsLiked
        })
        .then((artists) => {
          this.$axios.patch(`/users/${localStorage.getItem('musik_news_user_id')}`,
            {
              likes: artists
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('musik_news_token')}`
              }
            }
          )
        })
    }
  }
}
