<template>
  <div class="page_wrap" v-if="!props.isEmpty">
    <ul class="pagination flex_center row">
      <li
        class="page-item previous"
        v-if="props.currentPage > 1"
        @click="emit('changePage', 'prev')"
      >
  Previous
      </li>
      <li
        v-for="page in props.totalPages"
        :key="page"
        :class="props.currentPage == page ? 'active page-item' : 'page-item'"
        @click="emit('changePage', page)"
      >

          {{ page }}

      </li>
      <li
        class="page-item next"
        v-if="props.currentPage != props.totalPages && totalPages > 1"
        @click="emit('changePage', 'next')"
      >
        Next
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps<{
  currentPage : number;
  totalPages : number;
  isEmpty: boolean;
}>();
const emit = defineEmits(["changePage"]);
</script>

<style lang="scss" scoped></style>
