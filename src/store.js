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
    },
    devices: [],
    tasks: []
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
    },
    addDevice (state, newDevice) {
      let device = Object.assign({}, newDevice)
      let lastIndex = state.devices.length - 1
      device.id = state.devices.length > 0 ? state.devices[lastIndex].id + 1 : 1
      state.devices.push(device)
    }
  },
  actions: {

  }
})
