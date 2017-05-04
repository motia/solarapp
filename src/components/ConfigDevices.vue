<template>
  <!-- configurations form -->
  <div>
    <form class="card">

      <div class="floating-label">
        <input required class="full-width" v-model="newDevice.name">
        <label>device name</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newDevice.power">
        <label>power (W)</label>
      </div>

    </form>

    <button class="primary" @click="addDevice">
      <i>add</i>
      add device
    </button>

    <h5>List of all devices</h5>
    {{devices.length}}
    <div v-for="device in devices">
      <span>{{device.name}}</span>
      <span>{{device.power}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        newDevice: {
          name: '',
          power: '',
          isOn: false,
          startTime: 0,
          stopTime: 0
        }
      }
    },
    computed: {
      devices () {
        return this.$store.state.devices
      }
    },
    methods: {
      addDevice () {
        this.$store.commit('addDevice', this.newDevice)
        this.newDevice.name = ''
        this.newDevice.power = ''
      }
    }
  }

</script>
