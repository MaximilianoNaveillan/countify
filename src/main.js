import { createApp } from "vue";
import { createPinia } from "pinia";
import "./components/axios";
import App from "./App.vue";
import router from "./router";

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

const app = createApp(App).use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
