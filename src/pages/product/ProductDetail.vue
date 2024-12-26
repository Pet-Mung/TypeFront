<template>
    <div>
        <h3 class="pd-20 fs-20">상품 상세정보</h3>
        <div class="flex_center row mb-30">
            <Slider :flag="flag" :sliderData="product.image" />
            <div class="detail_cont">
                <p class="fs-18 mb-10">
                    {{ product.animal_category }} {{ product.category }} /
                    {{ product.user_name }}
                </p>
                <p class="fs-30 mb-10">{{ product.name }}</p>
                <div class="cell_area">
                    <p class="fs-18 mb-10">판매가 {{ commonNumber(product.price) }} 원</p>
                    <div class="cell flex_center row">
                        <span class="mr-20">수량</span>
                        <button type="button" @click="count == 1 ? count : count--">
                            -
                        </button>
                        <label>
                            <input type="text" v-model="count" readonly />
                        </label>
                        <button type="button" @click="count++">+</button>
                    </div>
                </div>

                <p class="text-right">
                    주문 금액 <span class="fb fs-30 mlr-5">{{ commonNumber(product.price * count) }}</span>원
                </p>
                <div class="btn_wrap">
                    <button type="button">장바구니</button>
                    <button type="button">구매하기</button>
                </div>
                <div class="caution_box">
                    <dl>
                        <dt>배송정보</dt>
                        <dd>배송비 3,000원</dd>
                        <dd>무료배송 조건 50,000원~</dd>
                        <dd>추가 배송비 3,000원</dd>
                    </dl>
                    <dl>
                        <dt>혜택</dt>
                        <dd class="txt-strong">신규회원가입 20% APP 쿠폰</dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="detail_info">
            <ul class="tab_cat_03">
                <li :class="{ active: selectTab == 1 }">상세정보</li>
                <li>리뷰</li>
                <li>상품Q&A</li>
                <li>판매자 정보</li>
            </ul>
            <div class="detail_info_wrap ql-editor">
                <div v-html="product.content"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Slider from "@/components/common/ComnSlider.vue";
import productApi from "@/api/apiProduct";
import { computed, ref } from "vue";
import { commonNumber } from "@/utils/common";
import { IProductResult } from "@/types/product";
const productId = computed(() => window.sessionStorage.getItem("productId"));
const product = ref<IProductResult>({
    image: [],
    animal_category: '',
    category: '',
    user_name: '',
    name: '',
    price: 0,
});

let flag = 2; // slider type 2
let count = ref(1); // 구매갯수
let selectTab = ref(1);

//상품 정보 개별 조회 api 호출
const getOnlyProduct = async () => {
    try {
       const result : IProductResult  | null = await productApi.viewIndividualProduct(productId.value || "");
        if(result) product.value = result;
    } catch (error) {
        console.error(error);
    }
};

//created
getOnlyProduct();

</script>

<style lang="scss" scoped></style>