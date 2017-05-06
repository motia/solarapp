class Dataset {
  constructor (timeline, values) {
    this.timeline = timeline
    this.values = values
  }

  get integrand () {
    let energy = [0]
    for (let i = 1; i < this.timeline.length; i++) {
      energy.push((this.values[i] + this.values[i - 1]) / 2 * (this.timeline[i] - this.timeline[i - 1]) / 1000 + energy[i - 1])
    }
    return new Dataset(this.timeline, energy)
  }

  push (k, v) {
    this.timeline.push(k)
    this.values.push(v)
  }

  getValueIn (t) {
    let i = this.timeline.findIndex(x => t <= x)
    return (~i && this.values[i]) || 0
  }

  getValueAt (t) {
    let l = this.timeline.length
    for (let i = 0; i < l; i++) {
      if (this.timeline[i] === t) {
        return this.values[i]
      }
      if (this.timeline[i] > t) {
        if (i === length - 1) {
          return this.values[i]
        }
        else {
          return (this.values[i + 1] - this.values[i]) / (this
          .timeline[i + 1] - this.timeline[i]) * (t - this.timeline[i]) + this.values[i]
        }
      }
    }
    return 0
  }
}

export default {
  getters: {
    powerShortages (state, getters, rootState, rootGetters) {
      let timeline = getters.batteryForecast.timeline
      let l = timeline.length
      let powerShortages = []
      for (let i = 0; i < l; i++) {
        if (getters.batteryForecast.values[i] === 0) {
          powerShortages.push({ from: timeline[i - 1], to: timeline[i] })
        }
      }
      return powerShortages
    },
    batteryForecast (state, getters, rootState, rootGetters) {
      let { batteryCapacity, batteryLevel } = rootGetters.getConfig.panels
      const timeline = [...new Set(rootGetters.powerPlan.timeline.concat(rootGetters.powerForecast.timeline))].sort()

      const l = timeline.length
      batteryLevel = [batteryLevel]

      for (let i = 1; i < l; i++) {
        let energyTransfer = rootGetters.powerForecast.getValueAt(timeline[i - 1]) -
                             rootGetters.powerPlan.getValueIn(timeline[i - 1])
        let temp = batteryLevel[i - 1] + energyTransfer * (timeline[i] - timeline[i - 1]) / 1000
        if (temp > batteryCapacity) {
          temp = batteryCapacity
        }
        if (temp < 0) {
          temp = 0
        }
        batteryLevel.push(temp)
      }
      return new Dataset(timeline, batteryLevel)
    },
    energyForecast (state, getters) {
      let temp = getters.powerForecast.timeline
      return new Dataset(temp, getters._energyForecast.values)
    },
    _energyForecast (state, getters) {
      // don't remove this function!! necessary to enable reactivity
      return getters.powerForecast.integrand
    },
    powerForecast (state, getters, rootState, rootGetters) {
      let panel = rootGetters.getPanel

      return new Dataset(
        rootState.forecastData.map(x => new Date(x.period_end).getTime() - 30 * 60 * 1000),
        rootState.forecastData.map(x => panel.calculatePowerForecast(x))
       )
    },
    energyPlan (state, getters) {
      let temp = getters.powerPlan.timeline
      return new Dataset(temp, getters._energyPlan.values)
    },
    _energyPlan (state, getters) {
      // don't remove this function!! necessary to enable reactivity
      return getters.powerPlan.integrand
    },
    powerPlan (state, getters, rootState) {
      let timeline = rootState.tasks.reduce((acc, x) => [...acc, x.startTime, x.endTime], [])
      timeline = [...new Set(timeline)].sort()
      return new Dataset(
        timeline, timeline.map(
          t => rootState.tasks.reduce((acc, x) => acc + (x.startTime <= t && t < x.endTime) * x.device.power, 0)
        )
      )
    }
  }
}
