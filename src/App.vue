<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" class="q-app"> 
    <router-view class="layout-view">  
    </router-view>

    <div v-if="offlineMode" class="offline-mode-warning">
      <h5>Could not connect to the internet</h5>
      <p>Using old forecast data for Algiers/Algeria in 30 April 2017</p>
    </div>
  </div>
</template>

<script>
  /*
   * Root component
   */
  export default {
    computed: {
      offlineMode () {
        return this.$store.state.offlineMode
      }
    }
  }
</script>

<style>
  .offline-mode-warning {

    background-color: orange;
    color: black;
  }
</style>
