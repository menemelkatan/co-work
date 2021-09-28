import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueResource from 'vue-resource'
import '@mdi/font/scss/materialdesignicons.scss'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import StarRating from 'vue-star-rating'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'


Vue.use(vueResource)
Vue.component('v-select', vSelect)
Vue.component('VueSlider', VueSlider)
Vue.component('star-rating', StarRating)
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


Vue.config.productionTip = false
var config = {
  apiKey: "AIzaSyCaMvVDklQH7G2Y7B8t9qXHyp88cLsEPes",
  authDomain: "spacetia-c9ca7.firebaseapp.com",
  databaseURL: "https://spacetia-c9ca7.firebaseio.com",
  projectId: "spacetia-c9ca7",
  storageBucket: "",
  messagingSenderId: "113645812196",
  appId: "1:113645812196:web:f3d34f3940612200"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
