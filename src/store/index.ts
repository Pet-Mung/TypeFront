import { createStore } from "vuex";
import user from "./user";
import { RootState } from '@/types/index'
// import product from "./product";
// import product from './modules/product';  // product 모듈 임포트


export default createStore<RootState>({
  modules : {
    // user,
    user,
    // product,
}
});
