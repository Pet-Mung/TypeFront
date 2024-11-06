<template>
  <div class="layout_wrapper">
    <ComnHeader />
    <div :class="mainPath == '' || subPath == 'mypage' ? 'main_wrap main_wt' : mainPath == 'join' ? 'main_wrap join_bg' :('main_wrap')">
      <router-view></router-view>
    </div>
    <ComnFooter />
  </div>
</template>

<script setup lang="ts">
import "@/assets/css/style.css";
import "@/assets/css/reset.css";
import "@/assets/css/header.scss";
import "@/assets/css/footer.scss";
import "@/assets/css/modal.scss";
import "@/assets/css/_variable.scss";
import "@/assets/css/user.scss";
import "@/assets/css/product.scss";


import { useRoute } from "vue-router";
import { computed, defineComponent } from "vue";
import API from "./api/apiAuth";
import { getItemWithExpireTime } from "@/utils/common";
import { useStore } from "vuex";

import ComnHeader from "@/components/common/ComnHeader.vue";
import ComnFooter from "@/components/common/ComnFooter.vue";


const store = useStore();
const route = useRoute();
const mainPath = computed<string>(() => route.path.split("/")[1]);
const subPath = computed<string>(() => route.path.split("/")[2]);
const userId = computed<string>(() =>  getItemWithExpireTime('userInfoObj')?.userId );
const type = computed<string>(() => getItemWithExpireTime('userInfoObj')?.type );

const setLoginData = async () => {
  API.setAuthToken(userId.value, type.value);
}
store.watch((state) => {
  if (state.user.loginSuccess) {
    setLoginData();
  }
}, setLoginData);
</script>


<style>
#app {
  overflow: auto;
}
#app.hidden {
  overflow: hidden;
}
</style>