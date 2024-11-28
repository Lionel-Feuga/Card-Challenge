import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify'; 
import 'vuetify/styles'; 
import '@mdi/font/css/materialdesignicons.css'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; 
import { far } from '@fortawesome/free-regular-svg-icons';


library.add(fas, far);

const vuetify = createVuetify();

const app = createApp(App);

app.use(vuetify);
app.component('font-awesome-icon', FontAwesomeIcon) 

app.mount('#app');
