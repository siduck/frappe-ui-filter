import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import { frappeRequest, pageMetaPlugin, resourcesPlugin, setConfig } from "frappe-ui";

import "./index.css";

const app = createApp(App);

setConfig("resourceFetcher", frappeRequest);

app.use(router);
app.use(resourcesPlugin);
app.use(pageMetaPlugin);

app.mount("#app");
