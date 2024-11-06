<template>
  <div class="find_wrap">
    <ul class="tab_cat_01">
      <li :class="{active : selectTab === 1}" @click="selectTab = 1">Find by ID</li>
      <li :class="{active : selectTab === 2}" @click="selectTab = 2">Find by Email</li>
    </ul>
    <div class="user_input" v-if="selectTab == 1">
      <label for="userName">ID</label>
      <input type="text" id="userName"/>
    </div>
    <div class="user_input" v-if="selectTab == 2">
      <label for="userEmail">EMAIL</label>
      <input type="text" id="userEmail"/>
    </div>
    <div class="confirm_box">
        <button type="button" class="confirm_btn">
          CONFIRM
        </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let selectTab = ref(1);
</script>