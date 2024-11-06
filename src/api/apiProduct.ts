// import { API } from "./apiAuth";

// // 상품 정보 전체 조회 api 호출
// const viewAllProduct = async () => {
//   try {
//     const response = await API.get("product/");
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 개별 상품 조회 api 호출
// const viewIndividualProduct = async (product_id : string) => {
//   try {
//     const response = await API.get(`product/${product_id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 상품 등록 api 호출
// const postProduct = async (productData) => {
//   try {
//     const response = await API.post("product/", productData);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 상품 수정 api 호출
// const editProduct = async (product_id, productData) => {
//   try {
//     const response = await API.put(`product/${product_id}`, productData);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 상품 삭제 api 
// const deleteProduct = async (product_id) => {
//   try {
//     const response = await API.delete(`product/${product_id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 용품 카테고리 조회 api 
// const getCategory = async () => {
//   try {
//     const response = await API.get("category/");
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 동물 카테고리 조회 api 호출
// const getAnimalCategory = async () => {
//   try {
//     const response = await API.get("category/pet");
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };




// export default {
//   viewAllProduct,
//   viewIndividualProduct,
//   postProduct,
//   editProduct,
//   deleteProduct,
//   getCategory,
//   getAnimalCategory,
// };
