import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/app.css"
import DashboardLayout from './layouts/DashboardLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';
//app.component('default-layout', DashboardLayout);
//app.component('empty-layout', EmptyLayout);

createApp(App)
  .use(store)
  .use(router)
  .component('default-layout', DashboardLayout)
  .component('empty-layout', EmptyLayout)
  .mount('#app')

