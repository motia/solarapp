<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" class="q-app"> 
    <router-view class="layout-view">  
    </router-view>

    <div v-if="offlineMode" class="offline-mode-warning">
      <p>Could not connect to the internet !</p>
      <small>Using old forecast data for Algiers/Algeria in 30/04/17</small>
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
  .toolbar button {
    color: white;
  }

  .card button {
    margin-top: 20px;
  }

  .card,
  form.card {
    padding: 15px 8px;
  }

  .offline-mode-warning {
    text-align: center;
    padding: 4px 8px;
    background-color: #f87516;
    color: white;
  }
  
  .offline-mode-warning p {
    margin: 0px;
  }
</style>
