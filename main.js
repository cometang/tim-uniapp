import Vue from 'vue'
import App from './App'
import tim from './commen/tim/tim.js'
import commen from './commen/commen.js'
import TIM from 'tim-js-sdk'
import store from './store/index.js'


Vue.config.productionTip = false
Vue.prototype.tim = tim.tim  			//tim sdk 引入后生成的tim服务
Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量
Vue.prototype.$store = store
Vue.prototype.$commen = commen

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
