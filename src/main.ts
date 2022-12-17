import { createApp } from 'vue';
import 'normalize.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'assets/css/index.css';
import App from './App.vue';
import router from '@/router';
import pinia from './store';
import { syncStore } from './store/init';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

syncStore();
app.use(router).use(pinia).mount('#app');
