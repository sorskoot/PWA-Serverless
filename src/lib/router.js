import VueRouter from 'vue-router';
import Overview from '../components/Overview.vue';

let routes = 
[{ path: '/', component: Overview }]

export const router = new VueRouter({
    routes
  })