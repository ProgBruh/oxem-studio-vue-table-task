import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCaretUp,
  faCaretDown,
  faSearch,
  faTimes,
  faArrowLeft,
  faArrowRight,
  faSpinner,
  faFeather,
  faWeightHanging,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import App from './components/App';
import './styles.scss';

Vue.use(Vuelidate);

library.add(
  faCaretUp,
  faCaretDown,
  faSearch,
  faTimes,
  faArrowLeft,
  faArrowRight,
  faSpinner,
  faFeather,
  faWeightHanging,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const vm = new Vue({
  render: (h) => h(App),
  store,
});
vm.$mount('#app');
