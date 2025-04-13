import {createApp} from "vue";
import App from "./app/App.vue";
import {store, storeKey} from "./app/store";

createApp(App).use(store, storeKey).mount("#app");