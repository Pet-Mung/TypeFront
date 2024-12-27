import { Module } from "vuex";
import userApi from "@/api/apiUser";
// import purchaseApi from '@/api/purchaseApi';
import { RootState } from '@/types/index'
import { ActionContext } from 'vuex';
import { ILoginInfo, } from "@/types/user"
export interface Basket {
  id: string;
  productId: string;
  product_name: string;
  count: number;
}
export interface IUserStore {
  loginSuccess: boolean;
  joinFlag: number;
  basketInfo: Basket[],
  adminTab: number,
  fetchStatus : number,
}


const user: Module<IUserStore, RootState> = {
  namespaced: true,
  state: (): IUserStore => ({
    loginSuccess: false,
    // flag 0 = 판매자, flag 1 = 구매자
    joinFlag: 1,
    basketInfo: [],
    adminTab: 1,
    fetchStatus : 200,
  }),
  mutations: {
    setLoginStatus(state: IUserStore, payload: boolean) {
      state.loginSuccess = payload;
    },
    setJoinFlag(state: IUserStore, payload: number) {
      state.joinFlag = payload;
    },
    // 관리자 선택한 탭
    setAdminTab(state: IUserStore, payload: number) {
      state.adminTab = payload;
    },
    // 장바구니 정보
    setBasketInfo(state: IUserStore, payload : Basket[]) {
      state.basketInfo = payload;
    },
    //삭제 등 http status로 에러값 구별
    setFetchStatus(state: IUserStore, payload : number) {
      state.fetchStatus = payload;
    }
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
    // 회원탈퇴
    async delUserInfo(context: ActionContext<any, RootState>, userId: string) {
      try {
        const status = await userApi.delOnlyUser(userId);
        context.commit("setFetchStatus",status);
      } catch (error) {
        console.error(error);
      }
    },
  }
}

export default user;
