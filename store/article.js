export const state = () => {
  return {
    article: {},
    articles: [],
    articleCreated: null,
    articleDeleted: null,
    articleUpdated: null
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
    state.article = payload.data
  },
  ARTICLES (state, payload) {
    state.articles = payload.data
  },
  ARTICLECREATED (state, payload) {
    state.articleCreated = payload.data
  },
  ARTICLEDELETED (state, payload) {
    state.articleDeleted = payload.data
  },
  ARTICLEUPDATED (state, payload) {
    state.articleUpdated = payload.data
  },
  COMMENT (state, payload) {
    state.article.comments.push(payload.data)
  }
}

export const actions = {
  fetchArticles ({ commit, getters }) {
    this.$axios.get('/news').then(async (response) => {
      await commit('ARTICLES', response.data)
    })
  },
  fetchArticle ({ getters, commit, dispatch }, id) {
    this.$axios.get(`/news/${id}`).then(async (response) => {
      await commit('ARTICLE', response.data)
    })
  },
  postComment ({ getters, commit }, comment) {
    commit('COMMENT', comment)
    this.$axios.put(`/news/${getters.article.id}`, getters.article, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('musik_news_token')}`
      }
    })
  },
  createArticle (context, data) {
    this.$axios.post('/news', {
      title: data.title,
      content: data.content,
      comments: []
    })
      .then(async (response) => {
        await context.commit('ARTICLECREATED', response.data)
      })
  },
  updateArticle (context, data) {
    this.$axios.patch(`/news/${data.id}`, {
      title: data.title,
      content: data.content
    })
      .then(async (response) => {
        await context.commit('ARTICLEUPDATED', response.data)
      })
  },
  deleteArticle (context, id) {
    this.$axios.delete(`/news/${id}`)
      .then(async (response) => {
        await context.commit('ARTICLEDELETED', response.data)
      })
  }
}
