<template>
  <div class="container">    
    <h2>Ahlll</h2>

      <vue-chart
          chart-type="LineChart"
          :columns="chart.columns"
          :rows="chart.rows"
          :options="chart.options"
          >
      </vue-chart>
  </div>
</template>

<script>

export default {
  computed: {
    chart() {
      let rows = this.$store.getters.powerForecast
      console.log(rows)
      return {
        columns: [{
          'type': 'string',
          'label': 'Year'
        }, {
          'type': 'number',
          'label': 'Sales'
        }, {
          'type': 'number',
          'label': 'Expenses'
        }],
        rows: [
          ['2004', 1000, 400],
          ['2005', 1170, 460],
          ['2006', 660, 1120],
          ['2007', 1030, 540]
        ],
        options: {
          chart: {
            title: 'Chart Title',
            subtitle: 'Subtitle'
          },
          hAxis: {title: 'Date'},
          vAxis: {title: ''},
          height: 500,
          animation: {
            duration: 500,
            easing: 'out'
          }
        }
      }
    }
  }
}
</script>

<style lang="styl">
  .container {
    padding: 20px;
  }
</style>
