<template>
  <!-- configurations form -->
  <div class="layout-padding">
    <form class="card">
      
      <h6>Panels Settings</h6>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.number" @input="updateNumber">
        <label>number of panels</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.area" @input="updateArea">
        <label>area of panel</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.efficiency" @input="updateEfficiency">
        <label>efficiency</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.tilt" @input="updateTilt">
        <label>Tilt</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.temperatureDerating" @input="updateTemperatureDerating">
        <label>temperature derating</label>
      </div>

      <button class="primary" @click="savePanelsConfigs">
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
        newConfigs: {}
      }
    },
    computed: {
      config () {
        return this.$store.getters.getConfig
      }
    },
    methods: {
      updateNumber (e) {
        this.newConfigs.number = Number(e.target.value)
      },
      updateArea (e) {
        this.newConfigs.area = Number(e.target.value)
      },
      updateEfficiency (e) {
        this.newConfigs.efficiency = Number(e.target.value)
      },
      updateTilt (e) {
        this.newConfigs.tilt = Number(e.target.value)
      },
      updateTemperatureDerating (e) {
        this.newConfigs.temperatureDerating = Number(e.target.value)
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
