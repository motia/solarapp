import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    config: {
      panel: {
        number: 1,
        surface: 1,
        efficiency: 1,
        azimuth: 180,
        inclination: 30,
        temperatureDerating: 1
      }
    }
  },
  mutations: {

  },
  actions: {

  }
})
