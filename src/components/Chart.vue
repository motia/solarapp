<script>
import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
  mixins: [mixins.reactiveProp],
  data () {
    return {
      gradient: null,
      gradient2: null
    }
  },
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.labels)
  }
})
</script>
