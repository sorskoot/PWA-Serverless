import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import './registerServiceWorker';
import {router} from "./lib";

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
