<template>
  <!-- configurations form -->
  <div class="layout-padding">
    <form class="card">
      <h6> Geolocation </h6>
      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.latitude">
        <label>latitude</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.longitude">
        <label>longitude</label>
      </div>

      <button @click.prevent="loadCordinates" class="secondary full-width">Use GPS</button>

      <h6>Panels Settings</h6>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.number">
        <label>number of panels</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.area">
        <label>area of panel</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.efficiency">
        <label>efficiency</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.tilt">
        <label>Tilt</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.temperatureDerating">
        <label>temperature derating</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.batteryCapacity">
        <label>Battery Capacity</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newConfigs.batteryLevel">
        <label>Current Battery Level (replaces sensors for demo)</label>
      </div>

      <button class="primary full-width" @click="savePanelsConfigs">
        <i>save</i>
        save configurations
      </button>
    </form>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        newConfigs: {
          latitude: null,
          longitude: null,
          number: null,
          area: null,
          efficiency: null,
          tilt: null,
          temperatureDerating: null,
          batteryCapacity: null,
          batteryLevel: null
        }
      }
    },
    mounted () {
      let initConfig = this.$store.getters.getConfig.panels
      for (let key in this.newConfigs) {
        this.newConfigs[key] = initConfig[key]
      }
    },
    computed: {
      config () {
        return this.$store.getters.getConfig
      }
    },
    methods: {
      loadCordinates () {
        alert('TODO')
      },
      savePanelsConfigs () {
        this.$store.commit('savePanelsConfigs', this.newConfigs)
      }
    }
  }
</script>

<style scoped>
  .card {
    padding: 20px;
  }
  button.primary {
    margin-left: 20px;
  }
</style>
