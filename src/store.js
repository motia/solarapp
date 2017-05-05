import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import offlineForecast from './api/forecasts.json'
import energyModule from './modules/energy'

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

let dummyDevices = [
  { name: 'TV', power: 100, id: 1 },
  { name: 'Heater', power: 500, id: 2 }
]

import moment from 'moment'
let offlineDataStart = new Date(offlineForecast[0].period_end)
let dummyTasks = [
  {
    device: dummyDevices[0],
    startTime: moment(offlineDataStart).add(240, 'minute'),
    endTime: moment(offlineDataStart).add(300, 'minute')
  },
  {
    device: dummyDevices[1],
    startTime: moment(offlineDataStart).add(220, 'minute'),
    endTime: moment(offlineDataStart).add(500, 'minute')
  }
]

export const store = new Vuex.Store({
  state: {
    forecastData: [],
    offlineMode: true,
    config: {
      panels: {
        number: 1,
        area: 10,
        efficiency: 0.12,
        tilt: 20,
        temperatureDerating: 0.4
      }
    },
    deviceIdCounter: 5,
    taskIdCounter: 5,
    devices: dummyDevices,
    tasks: dummyTasks
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
      device.id = (++state.deviceIdCounter)
      state.devices.push(device)
    },
    forecastData (state, forcasts) {
      state.forecastData.splice(0)
      state.forecastData = forcasts
    },
    addTask (state, newTask) {
      let task = Object.assign({}, newTask)
      task.id = (++state.taskIdCounter)
      task.device = state.devices.find(device => {
        return device.id === task.deviceId
      })
      // task.device.isOn = true
      state.tasks.push(task)
    }
  },
  actions: {
    fetchForecastData ({ commit }) {
      const API_KEY = 'L_iCwLk31524KiFmetydhO6gHV6UUI68'

      axios.get(
        'https://api.solcast.com.au/radiation/forecasts?' +
        'longitude=' + 3 +
        '&latitude=' + 36 +
        '&api_key=' + API_KEY +
        '&format=json'
        )
      .then((data) => {
        // window the data by the next 24 hours
        let i = 0
        let startIndex = 0
        let startTime = new Date()
        let endTime = new Date(new Date().getTime() + 24 * 3600 * 1000)
        for (; i < data.forecasts.length; i++) {
          if (new Date(data.forecasts[i].period_end).getTime() > startTime.getTime()) {
            startIndex = i - 1
            break
          }
        }

        startIndex = startIndex > 0 ? startIndex : 0

        let endIndex = 0
        for (; i < data.forecasts.length; i++) {
          if (new Date(data.forecasts[i].period_end).getTime() > endTime.getTime()) {
            endIndex = i
            break
          }
        }
        commit('forecastData', data.forecasts.slice(startIndex, endIndex + 1).forecasts)
      })
      .catch(function () {
        commit('forecastData', offlineForecast)
      })
    }
  },
  modules: {
    energy: energyModule
  }
})
