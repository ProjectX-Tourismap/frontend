import Vue from 'vue';
import axios from 'axios';
import VueMapbox from 'vue-mapbox';
import Mapbox from 'mapbox-gl';
import { SquareSpinLoader } from 'vue-loaders';

import 'vue-loaders/dist/vue-loaders.css';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './stylus/main.styl';

Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  method: 'get',
  baseURL: 'http://backend.syuchan.work',
  url: '/api',
});

Vue.use(VueMapbox, { mapboxgl: Mapbox });

Vue.component(SquareSpinLoader.name, SquareSpinLoader);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
