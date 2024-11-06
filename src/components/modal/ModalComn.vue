<template>
    <div class="modal_overlay" @click.self="closeModal">
        <div :class="props.modalSize == 'large' ? 'modal_wrap mo_L' : 'modal_wrap mo_S'">
            <div class="modal_title">
                <h4>{{ props.modalName }}</h4>
                <div class="close_btn" @click="closeModal">닫기</div>  
            </div>
            <div class="modal_body">
                <findPw v-if="props.modalFlag == 1"/>
            </div>  
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import findPw from './sub/ModalFindPw.vue';
const store = useStore();
const props = defineProps({
    modalFlag : { type : Number },
    modalName : { type : String },
    modalSize : { type : String },
});
const body =document.querySelector('body');
body.style.overflow = 'hidden';
const closeModal = () => {
  body.style.overflow = 'auto';
  store.commit('user/setIsModalOpen',false);
}

</script>

<style lang="scss" scoped>

</style>