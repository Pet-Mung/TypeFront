import axios ,{ AxiosInstance, AxiosResponse }from "axios";

export const API : AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Accept: "*/*",
    },
});

//api 요청이 있을때마다 header로 token 보내는 함수
 function setAuthToken(userId : string ,type : string) {
  const AUTH_TOKEN = `${type} ${userId}`;
  try {
    API.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    console.log('aa',API.defaults.headers.common.Authorization);
  } catch(error){
    console.error(error);
  }
}
export default {
  setAuthToken,
}
