import { Module } from "vuex";
import userApi from "@/api/apiUser";
// import purchaseApi from '@/api/purchaseApi';
import { RootState } from '@/types/index'
import { ActionContext } from 'vuex';
import { ILoginInfo, } from "@/types/user"
interface Basket {
  id: string;
  productId: string;
  count: number;
}
export interface IUserStore {
  loginSuccess: boolean;
  joinFlag: number;
  isModalOpen: boolean,
  basketInfo: Basket[],
  adminTab: number,
}


const user: Module<IUserStore, RootState> = {
  namespaced: true,
  state: (): IUserStore => ({
    loginSuccess: false,
    // flag 0 = 판매자, flag 1 = 구매자
    joinFlag: 1,
    isModalOpen: false,
    basketInfo: [],
    adminTab: 1,
  }),
  mutations: {
    setLoginStatus(state: IUserStore, payload: boolean) {
      state.loginSuccess = payload;
    },
    setJoinFlag(state: IUserStore, payload: number) {
      state.joinFlag = payload;
    },
    // modal open / close
    setIsModalOpen(state: IUserStore, payload: boolean) {
      state.isModalOpen = payload;
    },
    // 관리자 선택한 탭
    setAdminTab(state: IUserStore, payload: number) {
      state.adminTab = payload;
    },
    // 장바구니 정보
    setBasketInfo(state: IUserStore, payload : Basket[]) {
      state.basketInfo = payload;
    },
  },
  actions: {
    async getLoginUser(
      { commit }: ActionContext<IUserStore, RootState>,
      info: ILoginInfo
    ) {
      try {
        const result = await userApi.loginUser(info);
        if (result.data.access_token) {
          const now = new Date();
          const ttl = 1800000; //로그인 만료시간 30분으로 설정
          const expire = now.getTime() + ttl;
          console.log(result);
          const userInfoObj = {
            userId: result.data.access_token,
            type: result.data.token_type,
            username: result.data.username,
            user_idx: result.data.user_id,
            expire: expire,
          }
          window.sessionStorage.setItem('userInfoObj', JSON.stringify(userInfoObj));
          commit('setLoginStatus', true);
        }
      } catch (error) {
        console.error(error);
      }
    },
    // async getBasket(context: ActionContext<any, RootState>) {
    //   try {
    //     const result = await purchaseApi.viewCart();
    //     context.commit("setBasketInfo", result);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // // 장바구니 추가 api 호출
    // async addBasket(
    //   context: ActionContext<any, RootState>,
    //   addBasketInfo: { productId: string; count: number }) {
    //   try {
    //     const result = await purchaseApi.addCart(
    //       addBasketInfo.productId,
    //       addBasketInfo.count
    //     );
    //     // context.commit('setBasketInfo',result);
    //     console.log(result);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // // 장바구니 삭제 api 호출
    // async delBasket(context: ActionContext<any, RootState>, basketId: string) {
    //   try {
    //     console.log(basketId);
    //     const result = await purchaseApi.deleteCart(basketId);
    //     if (result.status == "404") {
    //       alert(result.detail);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    //회원탈퇴
    // async delUserInfo(context: ActionContext<any, RootState>, userId: string) {
    //   try {
    //     const result = await userApi.delOnlyUser(userId);
    //     console.log(result);
    //     if (result.status == "404") {
    //       alert(result.detail);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  }
}

export default user;
