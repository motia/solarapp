<template>
  <div class="layout-padding">

    <!-- add a new device -->
    <form class="card">
      <h6>Add New Device</h6>

      <div class="floating-label">
        <input required class="full-width" v-model="newDevice.name">
        <label>device name</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" v-model.number="newDevice.power">
        <label>power (W)</label>
      </div>
      
      <button class="primary" @click="addDevice">
        <i>add</i>
        add device
      </button>

    </form>

    <!-- list of all devices -->
    <div class="card">
      <h6>List of all devices</h6>
      <div class="list item-delimiter">
        <div class="item" v-for="device in devices">
          <div class="item-content">
            <span>{{device.name}}</span>
            <span class="pull-right">{{device.power}} W</span>
          </div>
        </div>
      </div>
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

<style>
  .card button {
    margin-top: 20px
  }
  .card {
    padding: 15px 8px;
  }
</style>
