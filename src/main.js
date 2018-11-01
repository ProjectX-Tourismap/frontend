import Vue from 'vue';
import VueMapbox from 'vue-mapbox';
import Mapbox from 'mapbox-gl';
import { BallBeatLoader } from 'vue-loaders';

import 'vue-loaders/dist/vue-loaders.css';
import axios from './util/AxiosMock';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './stylus/main.styl';

Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  method: 'get',
  baseURL: 'https://backend.syuchan.work',
  url: '/api',
});

Vue.use(VueMapbox, { mapboxgl: Mapbox });

Vue.component(BallBeatLoader.name, BallBeatLoader);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
