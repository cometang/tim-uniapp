import Vue from 'vue'
import App from './App'
import tim from './commen/tim/tim.js'
import commen from './commen/commen.js'


Vue.config.productionTip = false
Vue.prototype.tim = tim.tim

Vue.prototype.genTestUserSig = tim.genTestUserSig
Vue.prototype.$commen = commen

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
