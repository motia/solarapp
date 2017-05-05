<template>
  <div class="layout-padding">
    <div class="card">

      <h6>Add New Task</h6>
      <label for="">select device</label>

      <q-select type="list" v-model.number="newTask.deviceId" :options="selectOptions" class="full-width"></q-select>

      <div class="floating-label">
        <!-- Date & Time -->
        <q-datetime
          v-model="newTask.startTime"
          type="datetime"
          :min="minDateTime"
        ></q-datetime>
        
        <label>Start Time | h:mm</label>
      </div>

      <div class="floating-label">
        <!-- Date & Time -->
        <q-datetime
          v-model="newTask.endTime"
          type="datetime"
          :min="newTask.startTime"
        ></q-datetime>
        
        <label>Stop Time | h:mm</label>
      </div>

      <button class="primary" @click="addTask">
        <i>add</i>
        new Task
      </button>
    </div>

    <div class="card">
      <h6>Task List</h6>
      <div class="list item-delimiter">
        <div class="item" v-for="task in tasks">
          <div class="item-content">
            <span>{{ task.device.name }}</span>
            <span>{{ task.startTime|formatDate }} To {{ task.endTime|formatDate }}</span>
            <span class="pull-right">{{task.device.power}} W</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        minDateTime: '',
        newTask: {
          deviceId: '',
          startTime: '',
          endTime: ''
        }
      }
    },
    mounted () {
      this.minDateTime = moment().format()
    },
    computed: {
      selectOptions () {
        let offDevices = this.$store.state.devices
        return offDevices.map(device => {
          return {
            label: device.name,
            value: device.id
          }
        })
      },
      tasks () {
        return this.$store.state.tasks
      }
    },
    methods: {
      addTask () {
        let temp = {
          deviceId: this.newTask.deviceId,
          startTime: this.newTask.startTime.unix(),
          endTime: this.newTask.endTime.unix()
        }
        this.$store.commit('addTask', temp)
      }
    }
  }
</script>
