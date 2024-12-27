<template>
    <div class="pd-20">
        <h2 class="mb-20 ff_02 fl fs-40">Manage Dashboard</h2>
        <ul class="tab_cat_02">
            <li v-for="menu in manageMenu" :key="menu.key" :class="{ active: menu.isActive }" @click="selectAdminTab(menu.key)">
                <router-link to="/manage/products">{{ menu.name }}</router-link>
            </li>
        </ul>
        <div class="flex_center">
            <h3 class="fl text-center fs-30 pd-20">{{ manageMenu[selectTab].name }}</h3>
            <router-view></router-view>
        </div>

    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
interface IManageMenu {
    key : number,
    name : string,
    isActive : boolean,
    label : string, 
}

const route = useRoute();
const selectTab = ref(1);
const subPath = computed(() => route.path.split("/")[2]);
const manageMenu : IManageMenu[] = [
    { key : 1 , name : "상품/재고 관리" , isActive : false , label : "products"},
    { key : 2 , name : "주문/결제 관리" , isActive : false , label : "orders"},
    { key : 3 , name : "사용자 관리"    , isActive : false , label : "users"},
]

const selectAdminTab = (key : number) => {
    selectTab.value = key;
    manageMenu.map(item=>{
        item.isActive = key === item.key;
    })
};
// created
manageMenu.map((item)=>{
    if( item.label === subPath.value ) selectAdminTab(item.key);
});

</script>

<style lang="scss" scoped></style>