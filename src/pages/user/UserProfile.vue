<template>
  <div class="profile_wrap">
    <!-- email -->
    <div class="user_input">
      <label for="userEmail">이메일</label>
      <input type="text" id="userEmail" v-model.trim="info.email" />
    </div>

    <!-- name -->
    <div class="user_input">
      <label for="userName">아이디</label>
      <input type="text" id="userName" v-model.trim="info.user_name" />
    </div>
    <!-- name -->
    <div class="user_input">
      <label for="userPhone">핸드폰 번호</label>
      <input type="text" id="userPhone" v-model.trim="info.phone_number" />
    </div>
    <!-- name -->
    <div class="input_addr">
      <div class="user_input">
        <label>우편번호</label>
        <input type="text" name="zoneCode" v-model.trim="info.zonecode" readonly @mousedown="$event.preventDefault()"
          @click="addressSearch" />
        <button @click="addressSearch" class="btn_type_01 ml-20">
          주소 검색
        </button>
      </div>
      <div class="user_input">
        <label>주소</label>
        <input type="text" v-model="info.address" readonly @mousedown="$event.preventDefault()"
          @click="addressSearch" />
      </div>
      <div class="user_input">
        <label>상세주소</label>
        <input type="text" name="detailAddr" placeholder="oo동 ,oo호 입력" v-model="info.detail_address" />
      </div>
    </div>
    <div class="user_input radio_area" v-if="mainPath == 'manage'">
      <label>판매자 여부</label>
      <input type="radio" name="isSeller" id="se_true" value="se_true" />
      <label for="se_true">O</label>
      <input type="radio" name="isSeller" id="se_false" value="se_false" />
      <label for="se_false">X</label>
    </div>
    <div class="user_input radio_area" v-if="mainPath == 'manage'">
      <label>관리자 여부</label>
      <input type="radio" name="isAdmin" id="ad_true" v-model="info.is_admin" value="true" />
      <label for="ad_true">O</label>
      <input type="radio" name="isAdmin" id="ad_false" v-model="info.is_admin" value="false" />
      <label for="ad_false">X</label>
    </div>
    <div class="confirm_box">
      <button type="button" class="confirm_btn" @click="modifyBtn">확인</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "@/api/apiUser.js";
import { reactive, computed, onBeforeMount, ref } from "vue";
import {
  emailCheck,
  getItemWithExpireTime,
  nameCheck,
  phoneCheck,
} from "@/utils/common.js";
import { useRoute, useRouter } from "vue-router";
import { IProfile, IExtendInfo } from "@/types/user";



const router = useRouter();
const route = useRoute();
const info = reactive<IProfile>({
  user_name: "",
  email: "",
  address: "",
  detail_address: "",
  phone_number: "",
  zonecode: "",
  is_admin: "",
});

const originInfo = ref<IExtendInfo | null>(null);
const isCheck = ref(false);
const modifyBool = ref(false);
const mainPath = computed(() => route.path.split("/")[1]);
const user_idx = computed(() => {
  if (mainPath.value == "manage") {
    return window.sessionStorage.getItem("click_idx");
  } else {
    return getItemWithExpireTime("userInfoObj")?.user_idx;
  }
});
// user 정보 조회 api 호출
const getUserInfo = async () : Promise<void> => {
  try {
    const result = await api.getOnlyUser(user_idx.value);
    const data = result[0];
    originInfo.value = result[0];
    const { user_name, email, phone_number, address, is_admin } = data;
    info.user_name = user_name;
    info.email = email;
    info.phone_number = phone_number;
    info.is_admin = is_admin;
    if (address) {
      const [mainAddr, subAddr] = address.split("&");
      info.address = mainAddr || "";
      info.detail_address = subAddr || "";
    } else {
      info.address = "";
      info.detail_address = "";
    }

  } catch (error) {
    return;
  }
};

// user 정보 수정 api 호출
const putUserInfo = async () : Promise<void> => {
  try {
    if (info.address == undefined) info.address = '';
    if (info.detail_address == undefined) info.detail_address = '';
    if (info.phone_number == undefined) info.address = '';
    const result = await api.putOnlyUser(user_idx.value, info);
    if (result.status == "200") {
      alert(result.detail);
      if (mainPath.value == "manage") router.push("/manage/users");
      else router.push("mypage");
    }
  } catch (error) {
    console.error(error);
  }
};

// 이메일 확인
const isEmailCheck = () => {
  if (info.email === "") {
    alert("이메일을 입력해주세요.");
  } else if (!emailCheck(info.email)) {
    alert("이메일 형식을 확인하세요.");
  } else isNameCheck();
};

// 이름 확인
const isNameCheck = () => {
  if (info.user_name === "") {
    alert("아이디를 입력해주세요.");
  } else if (!nameCheck(info.user_name)) {
    alert("아이디를 확인하세요.");
  } else isPhoneCheck();
};

//핸드폰 번호 확인
const isPhoneCheck = () => {
  if (!phoneCheck(info.phone_number)) {
    alert("핸드폰 번호를 확인하세요.");
  } else isCheck.value = true;
};

// 회원정보 수정 버튼 클릭시
const modifyBtn = () : void => {
  if (originInfo.value) {
    if (
      originInfo.value.user_name == info.user_name &&
      originInfo.value.email == info.email &&
      originInfo.value.phone_number == info.phone_number &&
      originInfo.value.address?.split("&")[0] == info.address &&
      originInfo.value.address?.split("&")[1] == info.detail_address
      // originInfo.value.is_admin == info.is_admin 
    ) {
      modifyBool.value = false;
    } else modifyBool.value = true;
  }

  if (modifyBool) {
    // 이메일, 아이디 필수값
    isEmailCheck();
    if (isCheck) putUserInfo();
  } else {
    alert("변경된 사항이 없습니다.");
  }
};

// 주소 검색 다음 api 사용
const addressSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      info.zonecode = data.zonecode;
      info.address = data.roadAddress;
      info.detail_address = data.detailAddress;
    },
  }).open();
};

await getUserInfo();
</script>
