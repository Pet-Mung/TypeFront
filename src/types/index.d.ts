import { IUserStore } from '@/store/user'; 

export interface RootState {
  login: IUserStore; 
}
export interface IBanner{
  backgroundImage : string,
  color : string
}

export interface IImage{
  backgroundImage? : string,
  color? : string,
  image? : string,
  product_image? : string,
  product_name? : string,
  name? : string,
  count? : number
}