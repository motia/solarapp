<template>
    <div class="layout-padding">
      <h2>Chart page</h2>
      <div class="card">
          <vue-chart :labels="chart.labels" :values="chart.values"/>
      </div>
    </div>
</template>

<script>
import chart from './Chart'
import moment from 'moment'

export default {
  components: {
    'vue-chart': chart
  },
  computed: {
    chart () {
      let energyForecast = this.$store.getters.energyForecast
      let energyPlan = this.$store.getters.energyPlan

      let t = []
      let f = []
      let p = []
      for (let i = 0; i < energyForecast.timeline.length; i++) {
        let now = energyForecast.timeline[i]
        t.push(moment(now).format('HH:mm'))
        f.push(energyForecast.getValueAt(now))
        p.push(energyPlan.getValueIn(now))
      }

      return {
        labels: t,
        values: [f, p]
      }
    }
  }
}
</script>
