import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`pages/${component}.vue`)
}

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/',
      component: load('index'),
      children: [
        {
          path: '',
          component: load('index/charts')
        },
        {
          path: 'tasks',
          component: load('index/tasks')
        }
      ]
    }, // Default
    {
      path: '/config',
      component: load('config'),
      children: [
        {
          path: '',
          component: load('config/panels')
        },
        {
          path: 'devices',
          component: load('config/devices')
        }
      ]
    }, // Configuration
    { path: '*', component: load('error404') } // Not found
  ]
})
