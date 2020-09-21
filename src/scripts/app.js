import "../styles/app.scss";
import Vue from 'vue';
import App from '../views/App.vue';
import '@fortawesome/fontawesome-free/css/all.css'

new Vue({ render: createElement => createElement(App) }).$mount('#app');