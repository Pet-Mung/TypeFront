<template>
  <div class="mypage_wrap">
    <div class="pd-30 lect_type_01">
      <div class="cont_area">
        <h2 class="fs-40 mb-30 fc-w">마이 페이지</h2>
        <div class="profile">
          <img src="@/assets/img/profile_icon.png" alt="프로필 아이콘" />
          <h3 class="fc-w ml-5 mr-15 pd-10 fs-30">
            {{ data ? data.user_name : "" }}<span class="fs-15"> 님</span>
          </h3>
          <button class="pd-10 fs-15 bx-shadow" @click="router.push('profile')">
            내정보 수정
          </button>
          <button class="pd-10 fs-15 bx-shadow del_btn" @click="deleteUserInfo">
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
    <div class="pd-30">
      <div class="cont_area">
        <div class="title_s pd-10">
          <img src="@/assets/img/common/add_cart.png" alt="장바구니" />
          <h4 class="fs-18 mlr-10">장바구니</h4>
          <button @click="router.push('basket')" class="fb">더 보기 +</button>
        </div>
        <SliderView :flag="flag" :sliderData="basketInfo" />
      </div>
    </div>
    <div class="pd-30 lect_type_02">
      <div class="cont_area">
        <div class="title_s pd-10">
          <img src="@/assets/img/purchase_icon.png" alt="구매내역" />
          <h4 class="fs-18 mlr-10">구매내역</h4>
          <button @click="router.push('purchase')" class="fb">더 보기 +</button>
        </div>
        <SliderView :flag="flag" :sliderData="purchaseData" />
      </div>
    </div>
    <div class="pd-30">
      <div class="cont_area">
        <div class="title_s pd-10">
          <h4 class="fs-18 mlr-10">주문/배송조회</h4>
          <button @click="router.push('delivery')" class="fb">배송 현황</button>
        </div>
        <ul class="delivery_area">
          <li>
            <img src="@/assets/img/delivery/delivery_01.png" alt="주문 접수" />
            <p class="mt-10 text-center">주문 접수</p>
          </li>
          <li class="arrow_r">
            <img src="@/assets/img/delivery/right_arrow.png" alt="오른쪽 화살표" />
          </li>
          <li>
            <img src="@/assets/img/delivery/delivery_02.png" alt="결제 완료" />
            <p class="mt-10 text-center">결제 완료</p>
          </li>
          <li class="arrow_r">
            <img src="@/assets/img/delivery/right_arrow.png" alt="오른쪽 화살표" />
          </li>
          <li>
            <img src="@/assets/img/delivery/delivery_03.png" alt="배송 준비중" />
            <p class="mt-10 text-center">배송 준비중</p>
          </li>
          <li class="arrow_r">
            <img src="@/assets/img/delivery/right_arrow.png" alt="오른쪽 화살표" />
          </li>
          <li>
            <img src="@/assets/img/delivery/delivery_04.png" alt="배송 중" />
            <p class="mt-10 text-center">배송 중</p>
          </li>
          <li class="arrow_r">
            <img src="@/assets/img/delivery/right_arrow.png" alt="오른쪽 화살표" />
          </li>
          <li>
            <img src="@/assets/img/delivery/delivery_m.png" alt="배송 완료" />
            <p class="mt-10 text-center">배송 완료</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "@/api/apiUser.js";
import { computed, onBeforeMount, ref } from "vue";
import SliderView from "@/components/comn/ComnSlider.vue";
import { useRouter } from "vue-router";
import { getItemWithExpireTime } from "@/utils/common";
import { useStore } from "vuex";
import { IPurchaseData } from "@/types/user";

export interface IUserName {
    user_name: string | undefined;
}

const store =useStore();
const router = useRouter();
const data = ref<IUserName | null>(null);
const flag = 1; // slider type
const purchaseData  : IPurchaseData[] = [
  {
    id: 1,
    user_id: 5,
    product_id: 1,
    count: 1,
    purchase_chk: true,
    created_at: "2024-07-09T13:21:56",
    updated_at: null,
    name: "aaaa",
    image: require("@/assets/img/default.png"),
  },
  {
    id: 2,
    user_id: 5,
    product_id: 1,
    count: 1,
    purchase_chk: true,
    created_at: "2024-07-09T13:22:24",
    updated_at: null,
    name: "aaaa",
    image: require("@/assets/img/default.png"),
  },
];
const basketInfo = computed(()=> store.state.user.basketInfo);

// const imgAdd = (image) => {
//   this.imgSrc = require(image);
// }
const user_idx = computed(() => {
  return getItemWithExpireTime("userInfoObj")?.user_idx;
});

const getUserInfo = async () => {
  try {
    const result = await api.getOnlyUser(user_idx.value);
    data.value = result[0];
    // data.value = result;
  } catch (error) {
    console.error(error);
  }
};
const getBasketView = async () => {
  await store.dispatch("user/getBasket");
};


const deleteUserInfo = () => {
  if (confirm("정말 삭제하시겠습니까?") ==true){
    store.dispatch('user/delUserInfo',user_idx.value);
    store.commit('login/setLoginStatus',false);
    window.sessionStorage.clear();
    router.push('/');
  }
}
await Promise.all([ getUserInfo(),getBasketView()]);
</script>