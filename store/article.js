export const state = () => {
  return {
    article: {},
    articles: [],
    comments: []
  }
}

export const getters = {
  article (state) {
    return state.article
  },
  articles (state) {
    return state.articles
  },
  comments (state) {
    return state.comments
  }
}

export const mutations = {
  ARTICLE (state, payload) {
    state.article = payload
  },
  ARTICLES (state, payload) {
    state.articles = payload
  },
  COMMENTS (state, payload) {
    state.comments = payload
  }
}

export const actions = {
  fetchArticles ({ commit, getters }) {
    return new Promise((resolve) => {
      this.$axios.get('/news').then((response) => {
        commit('ARTICLES', response.data)
        resolve(getters.articles)
      })
    })
  },
  fetchArticle ({ getters, commit, dispatch }, id) {
    return new Promise((resolve) => {
      if (getters.articles) {
        getters.articles.forEach((article) => {
          if (article.id === parseInt(id, 10)) {
            commit('ARTICLE', article)
            resolve(getters.article)
          }
        })
      } else {
        dispatch('fetchArticles').then(() => {
          getters.articles.forEach((article) => {
            if (article.id === parseInt(id, 10)) {
              commit('ARTICLE', article)
              resolve(getters.article)
            }
          })
        })
      }
    })
  },
  async fetchComments ({ getters, commit }) {
    await this.$axios.get('/comments')
      .then(async (response) => {
        await commit('COMMENTS', response.data)
      })
  },
  postComment ({ getters, commit }, comment) {
    console.log(getters.article.id)
    /* await this.$axios.post('/comments/', {
      postId: getters.article.id,
      userId: getters['auth/getUser'],
      content: comment
    })
      .then((response) => {
        console.log(response)
      }) */
  }
}
