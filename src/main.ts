import View from '@/pages';
import { router } from '@/router/router';
import { createApp } from 'vue';

createApp(View).use(router).mount('#app');
