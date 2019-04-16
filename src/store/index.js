import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modelesFiles = require.context('./modules', false, /\.js$/)

const modules = modelesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modelesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
export default new Vuex.Store({
  modules,
})
