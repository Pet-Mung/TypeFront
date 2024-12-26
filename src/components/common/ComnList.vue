<template>
  <div>
    <ul class="mb-30" v-if="props.list.length == 0">
      <li class="no_data">
        <img src="@/assets/img/nodata_icon.png" alt="no_data" />
        <p>데이터가 없습니다.</p>
      </li>
    </ul>
    <ul class="list_style">
      <li
        class="list_content pr"
        v-for="(item, index) in displayedPosts"
        :key="index"
      >
        <img
          :src="imageCheck(item.thumbnail)"
          :alt="item.name"
          class="pd-10"
          @click="clickProduct(item.id)"
        />
        <div class="txt_wrap pd-10">
          <div @click="clickProduct(item.id)" class="txt_cursor">
            <p class="mb-10">{{ item.animal_category }} {{ item.category }}</p>
            <p class="mb-10 fb fs-18">{{ item.name }}</p>
          </div>
          <div class="txt_flex">
            <p>{{ commonNumber(item.price) }}<span>원</span></p>
            <div v-if="isLogin">
              <button
                type="button"
                class="btn-cart bx-shadow"
                v-if="item.isCart"
                @click.stop="delCartBtn(item)"
              >
                <span>Delete CART</span>
              </button>
              <button
                type="button"
                class="btn-cart bx-shadow"
                v-else
                @click.capture="addCartBtn(item)"
              >
                <span>ADD CART +</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <PagingView
    :currentPage="currentPage"
    :totalPages="totalPages"
    :isEmpty="isEmpty"
    @changePage="changePage"
  />
</template>

<script setup lang="ts">
import {
  getItemWithExpireTime,
  commonNumber,
  imageCheck,
} from "@/utils/common";
import PagingView from "@/components/common/ComnPaging.vue";
import { computed, defineProps, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { IProductsResult } from "@/types/product";
import { Basket } from "@/store/user";
const store = useStore();
const router = useRouter();
const props = defineProps<{
  list: IProductsResult[],
  tabChange: number,
}>();

let currentPage = ref(1); //현재 페이지 번호
let postsperPage = 10; //한 페이지 게시글 갯수
let isEmpty = ref(false); 
const totalPages = computed(() => {
  return Math.ceil(props.list.length / postsperPage);
});

const displayedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsperPage;
  const endIndex = startIndex + postsperPage;
  if (!props.list) return [];
  else return props.list.slice(startIndex, endIndex);
});
const isLogin = computed(() => {
  const userId = getItemWithExpireTime("userInfoObj")?.userId;
  if (userId !== null && userId !== undefined) return true;
  else return false;
});
const animalTab = computed(() => {
  return store.state.product.animalTab;
});
const basketInfo = computed(() => {
  return store.state.user.basketInfo;
});
const user_idx = computed(() => {
  return getItemWithExpireTime("userInfoObj")?.user_idx;
});
// const arr = ref([...props.list]);
// 장바구니 조회 api 호출
const getBasketView = async () => {
  await store.dispatch("user/getBasket");
  // if (basketInfo.value.length >= 1) {
  //   console.log('aa')
  //   basketInfo.value.forEach((basket) => {
  //     arr.value.filter((item) => {
  //       if (item.name == basket.product_name) {
  //         item.isCart = true;
  //       } else {
  //         item.isCart = false;
  //       }
  //     });
  //   });
  // }
};

// 장바구니 추가 api 호출
const addCartBtn = async (pdt : IProductsResult) => {
  let count = 1;
  const addBasketinfo = {
    productId: pdt.id,
    count: count,
  };
  await store.dispatch("user/addBasket", addBasketinfo);
  pdt.isCart = true;
  // getBasketView();
};
// 장바구니 삭제 api 호출
const delCartBtn = (pdt : IProductsResult) => {
  console.log("basketInfo", basketInfo.value);
  const nameArr = basketInfo.value.filter((item: Basket) => {
    return pdt.name == item.product_name;
  });
  // nameArr.forEach((item) => {
  //   store.dispatch("common/delBasket", item.id);
  // });
  store.dispatch("user/delBasket", nameArr[0].id);
  pdt.isCart = false;
  // getBasketView();
};

// detail page
const clickProduct = (id : number) => {
  window.sessionStorage.setItem("productId", String(id));
  router.push(`/products/detail/${id}`);
};

//페이지 변경
const changePage = (str : string | number) => {
  if (str == "prev") currentPage.value--;
  else if (str == "next") currentPage.value++;
  else if(typeof str === "number") currentPage.value = str;
};

// const selectListChange = (e,id) => {

//   selectList.value.push(id);
//   console.log(id);
//   console.log(e,e);
// }

// created

if (user_idx.value) getBasketView();

watch(animalTab, () => {
  changePage(1);
});
</script>
