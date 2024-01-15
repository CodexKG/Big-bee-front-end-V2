export interface AddFavoriteProduct {
    user_id: number,
    porduct_id: number
}
export interface FavoriteProduct {
    id:number
}
export interface FavoriteProductData {
    count: number,
    next: string,
    previous: null | string,
    results: FavoriteProduct[]
}