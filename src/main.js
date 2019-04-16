import Vue from 'vue'


import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss'
import 'normalize.css/normalize.css'

import './icons'


import App from './App.vue'
import router from './router'
import store from './store'



Vue.use(Element,{
  size:'medium'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
