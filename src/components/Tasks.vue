<template>
  <div class="layout-padding">
    <div class="card">

      <h6>Add New Task</h6>
      <hr>

      <!-- Select device -->
      <q-select 
        type="list" 
        v-model.number="newTask.deviceId" 
        :options="selectOptions" 
        class="full-width"
        placeholder="Select device"
      ></q-select>

      <!-- Start Time -->
      <q-datetime
        v-model="newTask.startTime"
        type="datetime"
        :min="minDateTime"
        class="full-width"
        placeholder="Start Time"
      ></q-datetime>

      <!-- End & Time -->
      <q-datetime
        v-model="newTask.endTime"
        type="datetime"
        :min="newTask.startTime"
        class="full-width" 
        placeholder="End Time"
      ></q-datetime>

      <button class="primary full-width" @click="addTask">
        <i>add</i>
        new Task
      </button>
    </div>

    <div class="card">
      <h6>Task List</h6>
      <hr>
      <div class="list item-delimiter">
        <div class="item two-lines" v-for="task in tasks">
          <div class="item-content has-secondary">
            <div>{{ task.device.name }}</div>
            <div>{{ task.startTime|formatDate }} To {{ task.endTime|formatDate }}</div>
          </div>
          <div class="item-secondary stamp">
             {{task.device.power}} W
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
    },
    filters: {
      formatDate (timestamp) {
        return moment(timestamp).format('MM-dd hh:mm')
      }
    }
  }
</script>
