import VueRouter from 'vue-router';
import Overview from '../components/Overview.vue';
import Counter from '../components/Counter.vue';

let routes = 
[{ path: '/', component: Overview },
 { path: '/counter', component: Counter }]

export const router = new VueRouter({
    routes
  })