import Vue from 'vue';
import App from './components/App';
import './styles.scss';

const vm = new Vue({
  render: (h) => h(App),
});
vm.$mount('#app');
