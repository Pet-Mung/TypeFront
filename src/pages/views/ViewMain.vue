<template>
  <!-- <div>메인 페이지입니다.</div> -->
  <div class="main-wrapper">
    <section class="intro">
      <div class="intro_01"></div>
      <div class="intro_02"></div>
    </section>
    <section class="main-banner">
      <ComnSlider :flag="flag" :sliderData="bannerData" />
    </section>
  </div>
</template>

<script setup lang="ts">
import ComnSlider from "@/components/common/ComnSlider.vue";
import { IBanner } from "@/types";
let flag = 3;


let bannerData : IBanner[] = [
  {
    backgroundImage: require("@/assets/img/banner/banner01.jpg"),
    color:"#dfffcc",
  },
  {
    backgroundImage: require("@/assets/img/banner/banner02.jpg"),
    color:"#fa93be",
  },
  {
    backgroundImage: require("@/assets/img/banner/banner03.jpg"),
    color:"#f693fa",
  },
];
</script>

<style lang="scss" scoped>
/* mainpage */

.intro {
  /* display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden; */
  /* width: 100%;
  height: 100vh;
  margin-top: 200px; */
}
.intro_01 {
  /* width :  1200px;
  height : 500px;
  background-color: rgb(219, 219, 218);
  transform: rotate(45deg); */
}
.intro_02 {
  width: 100%;
  --section-gap: calc(24px);
  --gradient-padding: 30px;
  /* --gradient-title-margin: 100px; */
  --section-angle-sin: 0.212;
  --section-skew-Y: -5deg;
  --transform-origin-x: calc(var(--section-gap) * 0.8);
  will-change: auto;
  transform-origin: var(--transform-origin-x);
  transform: skewY(var(--section-skew-Y));
  background-color: #3d3d3d;
}

.main-banner {
  height: 300px;
  .flex {
    height: 100%;
    max-width: 1400px;
    width: 90%;
    margin: 0 auto;
    justify-content: space-between;
    img {
      height: 100%;
    }
  }
  .text {
    p {
      font-size: 32px;
    }
    span {
      font-size: 16px;
    }
  }
}
</style>
