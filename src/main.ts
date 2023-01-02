import { createApp } from 'vue';
import 'normalize.css';
import 'assets/css/index.css';
import App from './App.vue';
import router from '@/router';
import pinia from './store';
import { syncStore } from './store/init';
import { globalRegister } from './global';

const app = createApp(App);
syncStore();
app.use(globalRegister).use(router).use(pinia).mount('#app');
