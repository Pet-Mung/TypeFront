<template>
  <div class="flex_center no_wrap">
    <img src="@/assets/img/logo.png" alt="logo" />
    <p class="fb fs-20">The page you are looking for could not be found.</p>
    <p>
      The address may have been entered incorrectly, <br />
      or the page may have been moved or deleted.<br />
      Please double-check the URL you entered.
    </p>
    <button @click="router.push('/')">Back to Home</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style lang="scss" scoped>
.no_wrap {
  height: 50vh;
  img {
    border-radius: 50%;
    border: 1px solid #b4b4b4;
    width: 100px;
    background-color: #fff;
    padding:10px;
  }
  p {
    margin: 10px;
    line-height: 1.5rem;
    text-align: center;
  }
  button {
    background-color: #fff;
    color: #3a3a3a;
    border: 1px solid #c9c9c9;
    padding: 10px;
    border-radius: 20px;
    font-weight: 700;
  }
}
</style>
