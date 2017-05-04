<template>
  <div>
    <h4>new task</h4>
    <label for="">select device</label>
    <q-select type="list" v-model.number="newTask.deviceId" :options="selectOptions"></q-select>

    <div>start time</div>
    <label for="">h:mm</label><input type="text" v-model="newTask.startTime">

    <div>Stop time</div>
    <label for="">h:mm</label><input type="text" v-model="newTask.stopTime">

    <button class="primary" @click="addTask">
      <i>add</i>
      new Task
    </button>
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
