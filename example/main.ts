import { FacecontrolPlugin } from '@src/main';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(FacecontrolPlugin);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
