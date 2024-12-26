export interface IProductsResult {
    created_at: datetime,
    updated_at: datetime,
    thumbnail: string,
    name: string,
    animal_category: string,
    category: string,
    price: number,
    id : number,
    isCart? : boolean,
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