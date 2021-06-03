import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastMenstruation: null,
    viewAnswer: true
  },
  getters: {
    getLastMenstruation: state => {
      return state.lastMenstruation
    },
    getViewAnswer: state => {
      return state.viewAnswer
    }
  },
  mutations: {
    lastMenstruation: (state, date) => {
      state.lastMenstruation = date
    },
    viewAnswer: (state, value) => {
      state.viewAnswer = value
    }
  },
  actions: {
  },
  modules: {
  }
})
