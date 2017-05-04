<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">

    <!-- Header -->
    <div slot="header" class="toolbar">

      <!-- opens left-side drawer using its ref -->
      <button class="hide-on-drawer-visible">
        <i>menu</i>
      </button>

      <q-toolbar-title :padding="1">
        Seasons Control
      </q-toolbar-title>

      <!-- statistics -->
      <button class="hide-on-drawer-visible">
        <i>assessment</i>
      </button>

      <!-- configuration -->
      <button class="hide-on-drawer-visible">
        <i>settings</i>
      </button>
    </div>
    <router-view class="layout-view">
      
    </router-view>
  </div>
</template>

<script>
  /*
   * Root component
   */
  export default {}
</script>

<style></style>
