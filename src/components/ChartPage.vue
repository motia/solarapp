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
      return {
        labels: energyForecast.timeline.map(x => moment(x).format('HH')),
        values: [
          energyForecast.values,
          energyForecast.values
        ]
      }
    }
  }
}
</script>
