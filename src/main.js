import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vue-loaders/dist/vue-loaders.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// eslint-disable-next-line
import '@babel/polyfill';
import Vue from 'vue';
import VueMapbox from 'vue-mapbox';
import Mapbox from 'mapbox-gl';
import { BallBeatLoader } from 'vue-loaders';

import axios from './util/AxiosMock';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './plugins/vuetify';
import './stylus/main.styl';

Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  method: 'get',
  baseURL: 'https://backend.syuchan.site',
  url: '/api',
});

Vue.use(VueMapbox, { mapboxgl: Mapbox });

Vue.component(BallBeatLoader.name, BallBeatLoader);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
