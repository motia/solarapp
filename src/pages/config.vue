<template>
  <div>
    <!-- Header -->
    <div slot="header" class="toolbar">

      <!-- home button -->
      <router-link to="/">
        <button class="hide-on-drawer-visible">
          <i>home</i>
        </button>
      </router-link>

      <!-- title -->
      <q-toolbar-title :padding="1">
        Settings
      </q-toolbar-title>

      <!-- settings -->
      <router-link to="/config">
        <button class="hide-on-drawer-visible">
          <i>settings</i>
        </button>
      </router-link>
    </div>

    <!-- Tabs -->
    <q-tabs>
      <q-tab icon="view_module" route="/config" exact>
        Panels
      </q-tab>

      <q-tab icon="alarm" route="/config/devices" exact>
        Devices
      </q-tab>
    </q-tabs>

    <router-view class="router-view"></router-view>

    
  </div>
</template>

<script>
  export default {}
</script>
