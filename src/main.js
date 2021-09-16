import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// "globalize" db in order to use it from various components
Vue.prototype.$db = [
  {
    code: "IT01",
    name: "First",
    description: "First Item Desc",
    active: true,
  },
  {
    code: "IT02",
    name: "Second",
    description: "Second Item Desc",
    active: true,
  },
  {
    code: "IT03",
    name: "Third",
    description: "Third Item Desc",
    active: true,
  },
];

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
