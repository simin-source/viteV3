import View from '@/pages';
import { createPinia } from 'pinia';
import { router } from '@/router/router';
import { createApp } from 'vue';
const pinia = createPinia();

createApp(View).use(pinia).use(router).mount('#app');
