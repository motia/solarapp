<template>
    <div class="layout-padding">
      <h2>Chart page</h2>
      <div class="card">
        <vue-chart ref="chart" :chart-data="chart" :options="{responsive: true, maintainAspectRatio: false}"/>
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
  data () {
    return {
      gradient: null,
      gradient2: null
    }
  },
  computed: {
    chart () {
      let energyForecast = this.$store.getters.powerForecast
      let energyPlan = this.$store.getters.powerPlan

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
        datasets: [
          {
            label: 'Plan Energy',
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: 'rgba(240, 10, 10, 0.6)',
            data: p
          },
          {
            label: 'Forecasted Energy',
            borderColor: '#05CBE1',
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
            borderWidth: 1,
            backgroundColor: 'rgba(10, 10, 240, 0.4)',
            data: f
          }
        ]
      }
    }
  }
}
</script>
