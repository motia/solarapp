<template>
  <div>
    <div class="layout-view">
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
          Solar Control
        </q-toolbar-title>

        <!-- statistics -->
        <button class="hide-on-drawer-visible">
          <i>assessment</i>
        </button>

        <!-- settings -->
        <router-link to="/config">
          <button class="hide-on-drawer-visible">
            <i>settings</i>
          </button>
        </router-link>
      </div>

    </div>

    <!-- Tabs -->
    <q-tabs>
      <q-tab icon="assessment" route="/chart" exact>
        Graph
      </q-tab>

      <q-tab icon="alarm" route="/tasks" exact>
        tasks
      </q-tab>
    </q-tabs>

    <router-view class="router-view"></router-view>
</div>
</template>

<style lang="styl">
  .toolbar button
    color white
</style>
