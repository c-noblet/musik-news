export const state = () => {
  return {
    article: {},
    articles: [],
    articleCreated: null,
    articleDeleted: null,
    articleUpdated: null,
    lastArticles: [],
    nbArticles: 0
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
    console.log('ARTICLE', payload)
    state.article = payload
  },
  ARTICLES (state, payload) {
    state.articles = payload
  },
  NBARTICLES (state, payload) {
    state.nbArticles = payload.data
  },
  LASTARTICLES (state, payload) {
    state.lastArticles = payload
  },
  ARTICLECREATED (state, payload) {
    state.articleCreated = payload
  },
  ARTICLEDELETED (state, payload) {
    state.articleDeleted = payload
  },
  ARTICLEUPDATED (state, payload) {
    state.articleUpdated = payload
  },
  COMMENT (state, payload) {
    state.article.comments.push(payload)
  }
}

export const actions = {
  fetchArticles ({ commit, getters }) {
    this.$axios.get('/news').then(async (response) => {
      await commit('ARTICLES', response.data)
    })
  },
  getArticles (context, data) {
    this.$axios.get(`/news?_page=${data.page}&_limit=${data.limit}`)
      .then(async (response) => {
        await context.commit('ARTICLES', response.data)
        await context.commit('NBARTICLES', response.headers['x-total-count'])
      })
  },
  fetchArticle ({ getters, commit, dispatch }, id) {
    this.$axios.get(`/news/${id}`).then(async (response) => {
      await commit('ARTICLE', response.data)
    })
  },
  fetchLastArticles ({ getters, commit }) {
    this.$axios.get('/news?_sort=published&_order=asc&_limit=5').then(async (response) => {
      await commit('LASTARTICLES', response.data)
    })
  },
  async postComment ({ getters, commit }, data) {
    await commit('COMMENT', data.comment)
    this.$axios.patch(`/news/${data.id}`, {
      comments: getters.article.comments
    }).then(async (response) => {
      await commit('ARTICLE', response.data)
    })
  },
  createArticle (context, data) {
    const date = new Date()
    this.$axios.post('/news', {
      title: data.title,
      content: data.content,
      published: date.toLocaleDateString(),
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
