<template>
  <div :class="isNav ? 'nav_btn active' : 'nav_btn'" @click="isNav = !isNav">
    <span class="line line1"></span>
    <span class="line line2"></span>
    <span class="line line3"></span>
  </div>
  <nav :class="isNav ? 'nav active' : 'nav'">
    <ul class="nav_bar nv_left">
      <li
        @click="selectCtgy('ALL')"
        :class="{ active: categoryName == 'ALL' && mainPath == 'shop' }"
      >
        ALL
      </li>
      <li
        v-for="(item, idx) in ctgy"
        :key="item"
        @click="selectCtgy(item, idx)"
        :class="{ active: categoryName == item && mainPath == 'shop' }"
      >
        {{ item }}
      </li>
    </ul>
    <ul class="nav_bar nv_right">
      <li
        v-if="!loginSuccess"
        :class="{ active: mainPath == 'join' }"
        @click="isNav = false"
      >
        <router-link to="/join">Sign Up</router-link>
      </li>
      <li
        v-if="!loginSuccess"
        :class="{ active: mainPath == 'login' }"
        @click="isNav = false"
      >
        <router-link to="/login"
          ><img
            src="@/assets/img/power_icon.png"
            class="sm_icon"
          />Log in</router-link
        >
      </li>
      <li v-if="loginSuccess" @click="isNav = false">
        <router-link to="/login"
          ><img
            src="@/assets/img/power_icon.png"
            class="sm_icon"
          />Log Out</router-link
        >
      </li>
      <li
        v-if="loginSuccess"
        :class="{ active: subPath == 'basket' }"
        @click="isNav = false"
      >
        <router-link to="/user/basket"
          ><img
            src="@/assets/img/cart.png"
            class="sm_icon"
          />BASKET</router-link
        >
      </li>
      <li
        v-if="loginSuccess"
        :class="{ active: subPath == 'mypage' || subPath == 'profile' }"
        @click="isNav = false"
      >
        <router-link to="/user/mypage"
          ><img
            src="@/assets/img/mypage.png"
            class="sm_icon"
          />MY PAGE</router-link
        >
      </li>
      <li
        v-if="loginSuccess"
        :class="mainPath == 'manage' ? 'active txtlink' : 'txtlink'"
        @click="isNav = false"
      >
        <router-link to="/manage/products"
          ><img
            src="@/assets/img/settings_icon.png"
            class="sm_icon"
          />SETTINGS</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import productApi from "@/api/apiProduct";
import { getItemWithExpireTime } from "@/utils/common";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
const subPath = computed(() => {
  return route.path.split("/")[2];
});
const loginSuccess = computed(() => {
  return store.state.user.loginSuccess;
});
let isNav = ref(false);
let userId = ref(getItemWithExpireTime("userInfoObj")?.userId);
if (userId.value != "" && userId.value != undefined) {
  store.commit("user/setLoginStatus", true);
}
let ctgy = ref([]);
const categoryName = computed(() => {
  return 1;
  // return store.state.product.category_name;
});

// 용품 카테고리 api 호출
const getCtgy = async () => {
  // let result = await productApi.getCategory();
  // ctgy.value = result;
};
// 선택한 카테고리 이름 store 저장
const selectCtgy = (ctgyName, idx) => {
  idx += 1;
  store.commit("product/setCtgyName", ctgyName);
  isNav.value = false;
  if (idx) router.push(`/shop/products/${idx}`);
  else router.push(`/shop/products`);
};
// created
getCtgy();
</script>

<style lang="scss" scoped></style>
