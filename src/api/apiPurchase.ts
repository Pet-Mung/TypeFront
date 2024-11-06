// import { API } from "./apiAuth";

// // 장바구니 조회 api 호출
// const viewCart = async () => {
//   try {
//     const response = await API.get(`basket/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 장바구니 추가 api 호출
// const addCart = async (productId, count) => {
//   try {
//     const response = await API.post(`basket?product_id=${productId}&count=${count}`);
//     return response.data;
//   } catch (error) {
//     if(error.response.status === 400){
//       alert(error.response.data.detail)
//   } else{
//       console.error(error);
//   }

//   }
// };

// // 장바구니 삭제 api 호출
// const deleteCart = async (basket_id) => {
//   try {
//     const response = await API.delete(`basket?basket_id=${basket_id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 구매목록 조회 api 호출
// const viewPurchaseList = async () => {
//   try {
//     const response = await API.get(`purchase/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 구매목록 추가 (장바구니 안 거치고 바로 구매시) api 호출
// const addPurchaseList = async () => {
//   try {
//     const response = await API.post(`purchase/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 배송 현황 조회 api 호출
// const viewDelivery = async () => {
//   try {
//     const response = await API.get(`delivery/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 배송 현황 수정 api 호출
// const editDelivery = async () => {
//   try {
//     const response = await API.put(`delivery/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default {
//   viewCart,
//   addCart,
//   deleteCart,
//   viewPurchaseList,
//   addPurchaseList,
//   viewDelivery,
//   editDelivery,
// };
