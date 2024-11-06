<template>
  <JoinSelect v-if="isJoinSelect == false" @callFn="callFn" />

  <div class="user_wrap" v-if="isJoinSelect == true">
    <!-- email -->
    <div class="user_input">
      <label for="userEmail">E-MAIL</label>
      <input
        type="text"
        id="userEmail"
        v-model.trim="info.email"
        autocomplete="off"
        @keyup.enter="isEmailCheck"
      />
      <button
        type="button"
        class="confirm_btn"
        @click="isEmailCheck"
        v-if="!isCheck.isEm"
      >
        NEXT
      </button>
    </div>
    <transition name="fade">
      <!-- name -->
      <div class="user_input" v-if="isCheck.isEm">
        <label for="userName">ID</label>
        <input
          type="text"
          id="userName"
          v-model.trim="info.username"
          autocomplete="off"
          @keyup.enter="isNameCheck"
        />
        <button
          type="button"
          class="confirm_btn"
          @click="isNameCheck"
          v-if="!isCheck.isNm"
        >
          NEXT
        </button>
      </div>
    </transition>
    <transition name="fade">
      <!-- password -->
      <div class="user_input" v-if="isCheck.isNm">
        <label for="userPw">PASSWORD</label>
        <input
          type="password"
          @keyup="pwdCheck"
          id="userPw"
          autocomplete="off"
          v-model.trim="info.password"
        />
      </div>
    </transition>
    <transition name="fade">
      <div class="user_input" v-if="isCheck.isNm">
        <label for="userPwChk">CONFIRM PASSWORD</label>
        <input
          type="password"
          @keyup="pwdCheck"
          @keyup.enter="isPwCheck"
          id="userPwChk"
          autocomplete="off"
          v-model.trim="info.password_check"
        />
        <img
          v-if="isInput"
          :src="
            chkPw
              ? require('@/assets/img/o.png')
              : require('@/assets/img/x.png')
          "
          :alt="chkPw ? 'Matched' : 'Not Matched'"
        />
      </div>
    </transition>
    <transition name="fade">
      <div class="confirm_box" v-if="isCheck.isNm">
        <p>Please enter a password between 8 and 12 characters long, including numbers, letters, and special characters.</p>
        <button type="button" class="confirm_btn" @click="isPwCheck">
          CONFIRM
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, toRef, ref } from "vue";
import api from "@/api/apiUser";
import { emailCheck, nameCheck, passwordCheck } from "@/utils/common";
import { useRouter } from "vue-router";
import JoinSelect from "./ViewJoinSelect.vue";
let router = useRouter();

let isCheck = reactive({
  isPw: false,
  //   isPwChk: "",
  isNm: false,
  isEm: false,
});
let isJoinSelect = ref(false);
let isInput = toRef(false);
let chkPw = toRef(false);
let info = reactive({
  password: "",
  password_check: "",
  username: "",
  email: "",
});
// 회원가입 api 호출
const createUser = async (info) => {
  try {
    const result = await api.joinUser(info);
    if (result.status === "201") {
      alert("You have successfully registered.");
      router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
};

//회원가입 flag 선택했을 때
const callFn = (flagBool) => {
  if (flagBool) isJoinSelect.value = true;
};

// 이메일 확인
const isEmailCheck = () => {
  if (info.email === "") {
    alert("Please enter your email.");
  } else if (!emailCheck(info.email)) {
    alert("Please check if the email was entered incorrectly.");
  } else isCheck.isEm = true;
};

// 이름 확인
const isNameCheck = () => {
  if (isCheck.isEm) {
    if (info.username === "") {
      alert("Please enter your ID.");
    } else if (!nameCheck(info.username)) {
      alert("Please check if the ID was entered incorrectly.");
    } else isCheck.isNm = true;
  }
};

// 비밀번호 확인
const isPwCheck = () => {
  if (isCheck.isNm) {
    if (info.password === "") {
      alert("Please enter your password");
    } else if (info.password_check === "") {
      alert("Please enter your confirm password.");
    } else if (!passwordCheck(info.password, info.password_check)) {
      alert(
        "Please enter a password between 8 and 12 characters, including numbers, letters, and special characters."
      );
    } else {
      isCheck.isPw = true;
      joinBtn();
    }
  }
};

// 비밀번호 확인 (span)
const pwdCheck = () => {
  if (info.password !== "" && info.password_check !== "") {
    isInput.value = true;
    if (info.password == info.password_check) chkPw.value = true;
    else chkPw.value = false;
  }
};

// 회원가입 버튼 클릭시
const joinBtn = () => {
  isEmailCheck();
  isNameCheck();
  if (isCheck.isEm && isCheck.isNm && isCheck.isPw) {
    createUser(info);
  }
};
</script>
