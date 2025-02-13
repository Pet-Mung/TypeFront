<template>
    <div class="detail_wrap">
        <h3 class="pd-20 fs-20">상품 상세정보</h3>
        <div class="flex_center row mb-30">
            <Slider :flag="flag" :sliderData="product.image" />
            <div class="detail_cont">
                <p class="mb-10 category_txt">
                    <span :class="product.animal_category === '강아지' ? 'dog' : 'cat'">#{{ product.animal_category
                        }}</span>
                    <span :class="categoryKey(product.category)">#{{ product.category }}</span> /
                    {{ product.user_name }}
                </p>
                <p class="fs-30 mb-10">{{ product.name }}</p>
                <div class="cell_area">
                    <p class="fs-18">판매가 {{ commonNumber(product.price) }} 원</p>
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
                <div class="count-area">
                    <p>주문 금액 </p>
                    <p><span class="fs-30 mlr-5">{{ commonNumber(orderCount) }}</span>원</p>
                </div>
                <div class="count-area">
                    <p><span class="plus">+</span>배송비</p>
                    <p v-if="deliveryCount === 0"><span class="del-line">3,000</span><span class="del-gray">></span><span class="fs-30 mlr-5">{{ commonNumber(deliveryCount) }}</span>원</p>
                    <p v-else><span class="fs-30 mlr-5">{{ commonNumber(deliveryCount) }}</span>원</p>
                </div>
                <div class="count-line"></div>
                <div class="count-area">
                    <p>총 금액</p>
                    <p><span class="fb fs-30 mlr-5 txt-strong">{{ commonNumber(orderCount + deliveryCount) }}</span> 원</p>
                </div>
                <div class="btn_wrap">
                    <button type="button">장바구니</button>
                    <button type="button">구매하기</button>
                </div>
                <div class="caution_box">
                    <dl>
                        <dt>배송정보</dt>
                        <dd>배송비 3,000원</dd>
                        <dd class="txt-strong">무료배송 조건 50,000원 이상</dd>
                    </dl>
                    <!-- <dl>
                        <dt>혜택</dt>
                        <dd class="txt-strong">신규회원가입 20% APP 쿠폰</dd>
                    </dl> -->
                </div>
            </div>
        </div>
        <div class="detail_info">
            <ul class="tab_cat_03">
                <li v-for="item in detailMenuList" :key="item.key" @click="handleTabClick(item)"
                    :class="{ active: item.is_active }">{{ item.label }}</li>
            </ul>
            <div class="detail_info_wrap ql-editor">
                <div v-html="product.content"></div>
            </div>
        </div>
    </div>
    <modal-alert :isVisible="dialog.isVisible" :isBtn="true" :content="dialog.content"
        @closeDialogHandler="closeDialogHandler" />
</template>
<script setup lang="ts">
import Slider from "@/components/common/ComnSlider.vue";
import ModalAlert from "@/components/modal/ModalAlert.vue";
import productApi from "@/api/apiProduct";
import { computed, ref } from "vue";
import { categoryKey, commonNumber } from "@/utils/common";
import { IProductResult } from "@/types/product";
import { useStore } from "vuex";
import { IMenu } from "@/store/menuList";
const store = useStore();
const dialog = ref({
    isVisible: false,
    content: "",
})
const productId = computed(() => window.sessionStorage.getItem("productId"));
const detailMenuList = computed(() => store.getters["menuList/detailMenuList"]);
const product = ref<IProductResult>({
    image: [],
    animal_category: '',
    category: '',
    user_name: '',
    name: '',
    price: 0,
});
const count = ref(1); // 구매갯수
const orderCount = computed(() => product.value.price * count.value);
const deliveryCount = computed(() => (orderCount.value >= 50000 ? 0 : 3000));
let flag = 2; // slider type 2


//상품 정보 개별 조회 api 호출
const getOnlyProduct = async (): Promise<void> => {
    try {
        const result: IProductResult | null = await productApi.viewIndividualProduct(productId.value || "");
        if (result) product.value = result;
    } catch (error) {
        console.error(error);
    }
};

const handleTabClick = (menu: IMenu) => {
    if (menu.is_beta) {
        dialog.value.isVisible = true;
        dialog.value.content = "아직 준비중입니다.";
        return;
    }
    store.commit("menuList/setActiveDetailMenu", menu.key);
}

const closeDialogHandler = () => {
    dialog.value.isVisible = false;
}

//created
getOnlyProduct();

</script>

<style lang="scss" scoped></style>