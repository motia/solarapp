<template>
  <div class="layout-padding">
    <div class="card">

      <h6>Add New Task</h6>
      <label for="">select device</label>

      <q-select type="list" v-model.number="newTask.deviceId" :options="selectOptions" class="full-width"></q-select>

      <div class="floating-label">
        <input required class="full-width" type="text" v-model="newTask.startTime">
        <label>Start Time | h:mm</label>
      </div>

      <div class="floating-label">
        <input required class="full-width" type="text" v-model="newTask.stopTime">
        <label>Stop Time | h:mm</label>
      </div>

      <button class="primary" @click="addTask">
        <i>add</i>
        new Task
      </button>   
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newTask: {
          deviceId: '',
          startTime: '',
          stopTime: ''
        }
      }
    },
    computed: {
      selectOptions () {
        let offDevices = this.$store.state.devices.filter(device => {
          return device.isOn === false
        })
        return offDevices.map(device => {
          return {
            label: device.name,
            value: device.id
          }
        })
      }
    },
    methods: {
      addTask () {
        this.$store.commit('addTask', this.newTask)
      }
    }
  }
</script>
