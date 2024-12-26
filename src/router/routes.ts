// view
// import UserView from "@/views/UserView.vue";

// components

// // user
// import UserDelivery from "@/components/user/UserDelivery.vue";
// import UserMypage from "@/components/user/UserMypage.vue";
// import UserProfile from "@/components/user/UserProfile.vue";
// import UserPurchase from "@/components/user/UserPurchase.vue";
// import UserBasket from "@/components/user/UserBasket.vue";

// // admin
// import ManageDashboard from "@/components/manage/ManageDashboard.vue";
// import ManageOrders from "@/components/manage/ManageOrders.vue";
// import ManageProducts from "@/components/manage/ManageProducts.vue";
// import ManageUsers from "@/components/manage/ManageUsers.vue";
// import ProductItem from "@/components/manage/sub/ProductItem.vue";

// //comn
// import ComnNotFound from "@/components/comn/ComnNotFound.vue";

//icon
import iconView from "@/components/common/ComnIcon.vue";
import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  // 메인 페이지
  {
    path: "/",
    name: "MainView",
    component: () => import("@/pages/views/ViewMain.vue"),
    props: true,
  },
  // 로그인 페이지
  {
    path: "/login",
    name: "LoginView",
    component: () => import("@/pages/views/ViewLogin.vue"),
    props: true,
  },
  // 회원가입 페이지
  {
    path: "/join",
    name: "JoinView",
    component: () => import("@/pages/views/ViewJoin.vue"),
    props: true,
  },
  //상품 페이지
  {
    path: "/products",
    component:  ()=> import("@/pages/product/index.vue"),
    children: [
      { path: "", component: ()=> import("@/pages/product/ProductList.vue") },
      { path: ":id", component: ()=> import("@/pages/product/ProductList.vue") },
      { path: "detail/:id", component: ()=> import("@/pages/product/ProductDetail.vue") },
    ],
  },
  // //유저 페이지
  // {
  //   path: "/user",
  //   component: UserView,
  //   children: [
  //     { path: "mypage", component: UserMypage },
  //     { path: "delivery", component: UserDelivery },
  //     { path: "profile", component: UserProfile },
  //     { path: "purchase", component: UserPurchase },
  //     { path: "basket", component: UserBasket },
  //   ],
  // },
  // //관리자 페이지
  // {
  //   path: "/manage",
  //   component: ManageDashboard,
  //   children: [
  //     { path: "orders", component: ManageOrders },
  //     {
  //       path: "products",
  //       children: [
  //         { path: "", component: ManageProducts },
  //         { path: ":id", component: ProductItem },
  //       ],
  //     },
  //     {
  //       path: "users",
  //       // component: ManageUsers,
  //       children: [
  //         { path: "", component: ManageUsers },
  //         { path: "profile", component: UserProfile },
  //       ],
  //     },
  //   ],
  // },
  // icon 저작권 페이지
  {
    path: "/icons",
    name: "iconView",
    component: iconView,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/views/ViewNotFound.vue"),
  },

];

export default routes;
