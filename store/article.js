export const state = () => {
  return {
    article: {},
    articles: []
  }
}

export const getters = {
  article (state) {
    return state.article
  },
  articles (state) {
    return state.articles
  }
}

export const mutations = {
  ARTICLE (state, payload) {
    state.article = payload
  },
  ARTICLES (state, payload) {
    state.articles = payload
  },
  COMMENT (state, payload) {
    state.article.comments.push(payload)
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
  postComment ({ getters, commit }, comment) {
    commit('COMMENT', comment)
    console.log(getters.article.comments)
    this.$axios.put(`/news/${getters.article.id}`, getters.article, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('musik_news_token')}`
      }
    })
  }
}
