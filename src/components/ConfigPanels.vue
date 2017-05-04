<template>
  <!-- configurations form -->
  <div>
    <form class="card">
      <div class="floating-label">
        <input required class="full-width" :value="config.panels.number" @input="updateNumber">
        <label>number of panels</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.surface" @input="updateSurface">
        <label>surface of panel</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.efficiency" @input="updateEfficiency">
        <label>efficiency</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.azimuth" @input="updateAzimuth">
        <label>azimuth</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.inclination" @input="updateInclination">
        <label>inclination</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" :value="config.panels.temperatureDerating" @input="updateTemperatureDerating">
        <label>temperature derating</label>
      </div>

    </form>

    <button class="primary" @click="savePanelsConfigs">
      <i>save</i>
      save configurations
    </button>
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
      updateSurface (e) {
        this.newConfigs.surface = Number(e.target.value)
      },
      updateEfficiency (e) {
        this.newConfigs.efficiency = Number(e.target.value)
      },
      updateAzimuth (e) {
        this.newConfigs.azimuth = Number(e.target.value)
      },
      updateInclination (e) {
        this.newConfigs.inclination = Number(e.target.value)
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
