export const state = () => {
  return {
    successMessages: [],
    errorMessages: [],
    alertMessages: [],
    infoMessages: []
  }
}

export const getters = {
  successMessages (state) {
    return state.successMessages
  },
  errorMessages (state) {
    return state.errorMessages
  },
  alertMessages (state) {
    return state.alertMessages
  },
  infoMessages (state) {
    return state.infoMessages
  }
}

export const mutations = {
  SUCCESSMESSAGES (state, payload) {
    state.successMessages.push(payload.data)
  },
  ERRORMESSAGES (state, payload) {
    state.errorMessages.push(payload.data)
  },
  ALERTMESSAGES (state, payload) {
    state.alertMessages.push(payload.data)
  },
  INFOMESSAGES (state, payload) {
    state.infoMessages.push(payload.data)
  }
}

export const actions = {
  addSuccessMessage (context, msg) {
    context.commit('SUCCESSMESSAGES', msg)
  },
  addErrorMessage (context, msg) {
    context.commit('ERRORMESSAGES', msg)
  },
  addAlertMessage (context, msg) {
    context.commit('ALERTMESSAGES', msg)
  },
  addInfoMessage (context, msg) {
    context.commit('INFOMESSAGES', msg)
  }
}
