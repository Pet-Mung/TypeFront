<template>
  <div v-if="props.flag == 1">
    <Carousel v-bind="setting" :breakpoints="breakpoints">
      <Slide class="" v-for="slide in props.sliderData" :key="slide">
        <div class="carousel__item">
          <img
            :src="imageCheck(slide.image || slide.product_image)"
            :alt="slide.name"
            class="slide_img"
          />
          <p>{{ slide.name || slide.product_name}}</p>
          <p class="fs-15 mt-10">{{ slide.count }} 개</p>
        </div>
      </Slide>
      <template #addons>
        <Navigation v-if="props.sliderData.length > 8" />
      </template>
    </Carousel>
  </div>

  <div v-if="props.flag == 2" class="slider_area">
    <Carousel
      v-bind="settings"
      :wrapAround="lenChk"
      :mouseDrag="lenChk"
      :touchDrag="lenChk"
    >
      <!-- -->
      <Slide class="" v-for="(slide, idx) in props.sliderData" :key="slide">
        <div class="carousel__item">
          <img
            :src="imageCheck(slide)"
            :alt="`상품사진 ${idx}`"
            class="slide_img"
          />
        </div>
      </Slide>
      <template #addons>
        <Navigation v-if="props.sliderData?.length > 1" />
        <Pagination />
      </template>
    </Carousel>
  </div>

  <div v-if="props.flag == 3">
    <!-- :style="customStyle(slide.backgroundImage)" style -->
    <Carousel
      v-bind="settings"
      :wrapAround=true
      :mouseDrag=true
      :touchDrag=true
    >
      <Slide class="" v-for="(slide, idx) in props.sliderData" :key="idx" :style="{padding : 0}">
        <div class="carousel__item banner__item"  :style="{ backgroundColor: slide.color }">
          <img
            :src="slide.backgroundImage"
            :alt="idx"
            class="slide_img"
          />
          <!-- <p>{{ slide.title }}</p> -->
          <!-- <p>{{ slide.content }}</p> -->
        </div>
      </Slide>
      <template #addons>
        <Navigation v-if="props.sliderData.length > 1" />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { imageCheck } from "@/utils/common";
import { computed, defineProps } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
const props = defineProps({
  sliderData: { type: Array },
  flag: { type: Number },
});

const lenChk = computed(() => {
  return props.sliderData.length > 1 ? true : false;
});
// const customStyle = (bg) =>{
//   return {'--bg' : bg};
// }
console.log(props.sliderData);
//mypage slide setting
const setting = {
  itemsToShow: 3,
  snapAlign: "start",
};
//product detail page slide setting
const settings = {
  itemsToShow: 1,
  snapAlign: "center",
  // autoplay: 5000,
};
const breakpoints = {
  // 500px and up
  500: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  // 700px and up
  700: {
    itemsToShow: 5,
    snapAlign: "start",
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: "start",
  },
};
</script>

<style>
/* .carousel__item{
  background : var(--bg);
} */
</style>
