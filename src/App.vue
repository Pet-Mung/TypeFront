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
import "@/assets/scss/comn/_style.scss";
import "@/assets/scss/comn/_variable.scss";
import "@/assets/scss/comn/reset.scss";
import "@/assets/scss/layout/header.scss";
import "@/assets/scss/layout/footer.scss";
import "@/assets/scss/layout/modal.scss";
import "@/assets/scss/pages/user.scss";
import "@/assets/scss/pages/product.scss";

import { useRoute } from "vue-router";
import { computed, defineComponent } from "vue";
import API from "./api/apiAuth";
import { getItemWithExpireTime } from "@/utils/common";
import { useStore } from "vuex";

import ComnHeader from "@/components/layout/Header.vue";
import ComnFooter from "@/components/layout/Footer.vue";


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