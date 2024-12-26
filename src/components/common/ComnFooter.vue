<template>
  <!-- footer -->
  <div class="footer_wrap">
    <footer>
      <ul class="footer-list">
        <li>
          <ul class="each-list">
            <li>MENU</li>
            <li @click="goProduct(1)">ALL</li>
            <li @click="goProduct(2)">CAT</li>
            <li @click="goProduct(3)">DOG</li>
          </ul>
        </li>
        <li class="mlr-50">
          <dl>
            <dt>ADDRESS :</dt>
            <dd>Seoul, South Korea</dd>
          </dl>
          <dl>
            <dt>E-MAIL</dt>
            <dd>97poolbbang@naver.com</dd>
          </dl>
          <dl>
            <dt>PHONE :</dt>
            <dd>010 - 9954 - 8079</dd>
          </dl>
          <small>Copyrights ⓒ CATTUS</small>
        </li>
        <li>
          <ul class="each-list">
            <li>Support</li>
            <li><router-link to="/icons">Icon Copyright</router-link></li>
            <li><a href="#">Company Directions</a></li>
            <li><a href="#">Customer Center</a></li>
          </ul>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const goProduct = (idx : number) : void => {
  router.push(`/products`);
  store.commit("product/setAnimalTab", idx);
  store.commit("product/setIsChange", true);
  store.commit("product/setCtgyName", "ALL");
};
</script>

<style lang="scss" scoped></style>
