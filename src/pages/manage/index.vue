<template>
    <div class="pd-20">
        <h2 class="mb-20 ff_02 fl fs-40">Manage Dashboard</h2>
        <ul class="tab_cat_02">
            <li :class="{ active: adminTab == 1 }" @click="selectAdminTab(1)">
                <router-link to="/manage/products">Manage Products</router-link>
            </li>
            <li :class="{ active: adminTab == 2 }" @click="selectAdminTab(2)">
                <router-link to="/manage/orders">Manage Orders</router-link>
            </li>
            <li :class="{ active: adminTab == 3 }" @click="selectAdminTab(3)">
                <router-link to="/manage/users">Manage Users</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const adminTab = computed(() =>  store.state.user.adminTab);
const subPath = computed(() =>  route.path.split("/")[2]);
const selectAdminTab = (num : number) => {
    store.commit("user/setAdminTab", num);
};
// created
if (subPath.value === 'products') selectAdminTab(1);
else if (subPath.value === 'orders') selectAdminTab(2);
else if (subPath.value === 'users') selectAdminTab(3);
</script>

<style lang="scss" scoped></style>