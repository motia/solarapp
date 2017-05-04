import Vue from 'vue'
import Vuex from 'vuex'

class EfficencyFilter {
  constructor (name, filter, params) {
    this.name = name
    this.params = params
    this.evalute = filter
  }
}

class Panel {
  constructor (area, efficiency, tilt, params) {
    this.area = area
    this.tilt = tilt
    this.efficency = efficiency
    this.params = params
    this.efficencyFilters = []
  }

  mountEfficencyFilter (efficencyFilter) {
    this.efficencyFilters.push(efficencyFilter)
  }

  evaluteEfficency (item) {
    return this.efficencyFilters.reduce((acc, filter) => {
      return acc * filter.evalute(this, item)
    }, 1)
  }

  calculatePowerForecast (forecast) {
    return this.area * forecast.ghi * this.evaluteEfficency(forecast)
  }
}

function createPanel ({number, efficiency, area, tilt, temperatureDerating}) {
  // creating our plant
  let panel = new Panel(area, efficiency, tilt)

  // tilt filter
  const USE_HORIZANTAL_RADIANCE = false
  panel.mountEfficencyFilter(new EfficencyFilter('sunposition', function (panel, fi) {
    let alpha = (90 - fi.zenith) * Math.PI / 180 // elevation
    let beta = panel.tilt * Math.PI / 180
    return Math.abs(Math.sin(alpha + beta) / (USE_HORIZANTAL_RADIANCE ? Math.sin(alpha) : 1))
  }))
/*
  // teperature filter
  panel.mountEfficencyFilter(new EfficencyFilter('temperature', function (panel, fi) {
    if (panel.termperature <= 25) {
      return 1
    }
    return (fi.air_temperature - 25) * temperatureDerating
  }))
*/
  // panel intrinsic efficency
  panel.mountEfficencyFilter(new EfficencyFilter('panel', function (panel, fi) {
    return panel.efficency
  }))

  // humidity filter
  panel.mountEfficencyFilter(new EfficencyFilter('humidity', function (panel, fi) {
    return 1
  }))

  // cloud opacity filter
  panel.mountEfficencyFilter(new EfficencyFilter('clouds', function (panel, fi) {
    return fi.cloud_opacity / 100
  }))

  // many filters
  panel.mountEfficencyFilter(new EfficencyFilter('manypanels', function (panel, fi) {
    return number
  }))

  return panel
}

Vue.use(Vuex)

import energyModule from './modules/energy'
import forecastData from './api/forecasts.json'

export const store = new Vuex.Store({
  state: {
    forecastData,
    config: {
      panels: {
        number: 1,
        area: 10,
        efficiency: 0.12,
        tilt: 20,
        temperatureDerating: 0.4
      }
    },
    devices: [],
    tasks: []
  },
  getters: {
    getConfig (state) {
      return state.config
    },
    getPanel (state) {
      return createPanel(state.config.panels)
    }
  },
  mutations: {
    savePanelsConfigs (state, payload) {
      state.config.panels = Object.assign(state.config.panels, payload)
    },
    addDevice (state, newDevice) {
      let device = Object.assign({}, newDevice)
      let lastIndex = state.devices.length - 1
      device.id = state.devices.length > 0 ? state.devices[lastIndex].id + 1 : 1
      state.devices.push(device)
    }
  },
  actions: {

  },
  modules: {
    energy: energyModule
  }
})
