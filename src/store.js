import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    config: {
      panels: {
        number: 1,
        surface: 1,
        efficiency: 1,
        azimuth: 180,
        inclination: 30,
        temperatureDerating: 1
      }
    }
  },
  getters: {
    getConfig (state) {
      return state.config
    }
  },
  mutations: {
    savePanelsConfigs (state, payload) {
      state.config.panels = Object.assign(state.config.panels, payload)
      alert(JSON.stringify(state.config.panels))
    }
  },
  actions: {

  }
})
