import {createRouter, createWebHashHistory} from 'vue-router';
import HomePage from '/@/components/HomePage.vue';

const routes = [
  {path: '/', name: 'Home', component: HomePage},
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
