import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import "dropzone/dist/dropzone.css";
import { quillEditor } from "vue3-quill";

createApp(App).use(store).use(router).use(quillEditor).mount("#app");
