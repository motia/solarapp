<template>
    <div class="layout-padding">
      <h2>Chart page</h2>
      <div class="card">
        <vue-chart ref="chart" :chart-data="chart" :options="{responsive: true, maintainAspectRatio: false}"/>
      </div>

      <div class="card">
        <vue-chart ref="chart2" :chart-data="chart2" :options="{responsive: true, maintainAspectRatio: false}"/>
      </div>

        <p class="caption">Warning !</p>

      <div class="card" v-for="shortage in powerShortages">
        <div class="list">
            <div class="item">
              <div class="item-content">
                  A power shortage is expected from {{ shortage.from|formatDate }} to {{ shortage.to|formatDate }}
              </div>
            </div>
            <hr>
        </div>
      </div>
    </div>
</template>

<script>
import chart from './Chart'
import moment from 'moment'

export default {
  filters: {
    formatDate (x) {
      return moment(x).format('MM/DD HH:mm')
    }
  },
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
    powerShortages () {
      return this.$store.getters.powerShortages
    },
    chart2 () {
      let batteryForecast = this.$store.getters.batteryForecast
      return {
        labels: batteryForecast.timeline.map(now => moment(now).format('HH:mm')),
        datasets: [
          {
            label: 'Battery Level',
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: 'rgba(10, 240, 240, 0.6)',
            data: batteryForecast.values
          }
        ]
      }
    },
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
