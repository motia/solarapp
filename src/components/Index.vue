<template>
  <div class="container">    
    <h2>Ahlll</h2>
      <vue-chart :values="chart" :labels="labels"/>
  </div>
</template>

<script>
import chart from './Chart'

export default {
  components: {
    'vue-chart': chart
  },
  computed: {
    labels () {
      // return [4, 9, 1, 4, 3, 8, 4]
      return this.$store.getters.enrgyForecast.timeline.map(x => new Date(x))
    },
    chart () {
      console.log(this.$store.getters.enrgyForecast.values)

      return [
        this.$store.getters.enrgyForecast.values,
        this.$store.getters.enrgyForecast.values
      ]
      /*
        let forecasts = this.$store.getters.enrgyForecast
        let planned = this.$store.getters.energyPlan
      */
      // return [[40, 39, 10, 40, 39, 80, 40], [60, 55, 32, 10, 2, 12, 53]]
    }
  }
}
</script>

<style lang="styl">
  .container {
    padding: 20px;
  }
</style>
