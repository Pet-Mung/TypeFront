export interface IJoinInfo {
  password: string,
  password_check: string,
  username: string,
  email: string,
}

export interface ILoginInfo {
  password: string,
  username: string,
  grant_type : string,
  scope : string,
  client_id : string,
  client_secret : string,
}

export interface IUsers {
  id: number;
  username?: string;
  user_name?: string;
  email: string;
  created_at : datetime;
  updated_at : datetime;
  address : string;
  phone_number : string;
  is_active : string;
  // 다른 사용자 정보 필드 추가
}

export interface IUser {
  id: number;
  user_name: string;
  email: string;
  created_at : datetime;
  updated_at : datetime;
  address : string;
  phone_number : string;
  is_active : string;
  // 다른 사용자 정보 필드 추가
}

export interface IResultLogin {
  access_token: string;
  token_type:string
  username:string
  user_id:string
}