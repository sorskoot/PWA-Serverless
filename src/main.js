import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import './registerServiceWorker';
import {router} from "./lib";
import { store } from './store';

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
