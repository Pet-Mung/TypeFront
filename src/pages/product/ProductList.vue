<template>
    <div class="shop_wrap">
        <ul class="tab_cat_06 pt-20">
            <li :class="{ active: categoryName == 'ALL' }" @click="selectCtgy('ALL',null)">
                ALL
            </li>
            <li v-for="(item, idx) in ctgy" :key="item" @click="selectCtgy(item, idx)"
                :class="{ active: categoryName == item && mainPath == 'shop' }">
                {{ item }}
            </li>

        </ul>
        <ul class="tab_cat_01 pt-20 pb-20">
            <li :class="{ active: animalTab === 1 }" @click="productDataChange(1)">
                ALL
            </li>
            <li :class="{ active: animalTab === 2 }" @click="productDataChange(2)">
                고양이
            </li>
            <li :class="{ active: animalTab === 3 }" @click="productDataChange(3)">
                강아지
            </li>
        </ul>
    </div>
    <ComnList :list="products" :tabChange="animalTab" />
</template>

<script setup lang="ts">
import productApi from "@/api/apiProduct";
import ComnList from "@/components/common/ComnList.vue";
import { computed, onMounted, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import { sortData } from "@/utils/common";
import { useRoute, useRouter } from "vue-router";
import { IProductsResult } from "@/types/product";
const store = useStore();
const route = useRoute();
const router = useRouter();
const originalProducts = ref<IProductsResult[]>([]);
const products = ref<IProductsResult[]>([]);
const mainPath = computed(() => route.path.split("/")[1]);
const thirdPath = computed(() => route.path.split("/")[3]);
const categoryName = computed(() => store.state.product.category_name);
const isChange = computed(() => store.state.product.isChange);
const animalTab = computed(() => store.state.product.animalTab);

let ctgy = ref([]);
// 용품 카테고리 api 호출
const getCtgy = async () => {
    let result = await productApi.getCategory();
    ctgy.value = result;
};
//상품 정보 전체 조회 api 호출
const getAllProduct = async (num : number) : Promise<void> => {
    try {
        const result : IProductsResult[] = await productApi.viewAllProduct();
        if (categoryName.value == "ALL") {
            originalProducts.value = sortData(result);
            productDataChange(num);
        } else {
            const filterData : IProductsResult[] = result.filter(
                (item) => categoryName.value == item.category
            );
            originalProducts.value = sortData(filterData);
            productDataChange(num);
        }
    } catch (error) {
        console.error(error);
    }
};

// tab 선택에 따라 data 변경
const productDataChange = (num : number) => {
    store.commit("product/setAnimalTab", num);
    if (animalTab.value === 1) {
        products.value = originalProducts.value;
    } else if (animalTab.value === 2) {
        products.value = originalProducts.value.filter((item) => {
            return item.animal_category == "고양이";
        });
    } else if (animalTab.value === 3) {
        products.value = originalProducts.value.filter((item) => {
            return item.animal_category == "강아지";
        });
    }
};

// 선택한 카테고리 이름 store 저장
const selectCtgy = (ctgyName : string, idx : number | null) => {
    store.commit("product/setCtgyName", ctgyName);
    if (idx) {
        idx += 1;
        router.push(`/products/${idx}`);
    }
    else router.push(`/products`);
};

// created
getCtgy();
store.commit('product/setFirstCtgy', thirdPath.value);

// mounted
onMounted(() => {
    getAllProduct(animalTab.value);
});

// updated
onUpdated(() => {
    if (isChange.value) {
        getAllProduct(animalTab.value);
        store.commit("product/setAnimalTab", animalTab.value);
    }
    store.commit("product/setIsChange", false);
});
</script>