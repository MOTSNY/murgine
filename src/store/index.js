import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastMenstruation: null,
    viewAnswer: true,
    weeksVisits: localStorage.getItem('weeksVisits') || '[[8, 12], 14, 20, 26, 30, 34, 36, 38, 40]'
    // LicenseExpiring: true
  },
  getters: {
    getLastMenstruation: state => {
      return state.lastMenstruation
    },
    getViewAnswer: state => {
      return state.viewAnswer
    },
    getWeeksVisits: state => {
      return JSON.parse(state.weeksVisits)
    }
    // isLicenseExpiring: state => {
    //   return state.LicenseExpiring
    // }
  },
  mutations: {
    lastMenstruation: (state, date) => {
      state.lastMenstruation = date
    },
    viewAnswer: (state, value) => {
      state.viewAnswer = value
    },
    weeksVisits: (state, value) => {
      function compare (a, b) {
        let isArrA = false
        let isArrB = false
        let a1 = null
        let b1 = null
        if (Array.isArray(a)) {
          a1 = a[1]
          a = a[0]
          isArrA = true
        }
        if (Array.isArray(b)) {
          b1 = b[1]
          b = b[0]
          isArrB = true
        }
        if (a > b) return 1
        if (a === b) {
          if (isArrA && isArrB) {
            if (a1 > b1) return 1
            if (a1 === b1) return 0
            if (a1 < b1) return -1
          } else {
            return 0
          }
        }
        if (a < b) return -1
      }
      const weeksVisits = value
      weeksVisits.sort(compare)
      state.weeksVisits = JSON.stringify(weeksVisits)
      localStorage.setItem('weeksVisits', state.weeksVisits)
    }
    // changeLicenseTime: state => {
    //   const now = new Date()
    //   const ExpiringTimeLicense = new Date(2021, 6, 26, 18)
    //   state.LicenseExpiring = now <= ExpiringTimeLicense
    // }
  },
  actions: {
    // checkLicenseTime: context => {
    //   context.commit('changeLicenseTime')
    // }
  },
  modules: {
  }
})
