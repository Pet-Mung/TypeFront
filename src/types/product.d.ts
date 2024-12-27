export interface IProductsResult {
    created_at: datetime,
    updated_at: datetime,
    thumbnail: string,
    name: string,
    user_name? : string,
    animal_category: string,
    category: string,
    price: number,
    id : number,
    isCart? : boolean,
    updatedNumA? : number,
    updatedNumB? : number,
}

export interface IProductResult {
    image: array,
    animal_category: string,
    category: string,
    user_name: string,
    name: string,
    price: number,
    content?: string,
}