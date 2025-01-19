import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient  } from 'vue-query';
import App from './App.vue'
import router from './router'
import { registerGlobalComponents } from '@/plugins/globalComponents';
const queryClient = new QueryClient();
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient });

registerGlobalComponents(app);
app.mount('#app')
