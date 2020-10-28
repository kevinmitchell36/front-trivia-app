import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "https://damp-atoll-89484.herokuapp.com/api/questions" :

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
