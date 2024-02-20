export interface AddFavoriteProduct {
    user_id: number,
    porduct_id: number
}
export interface FavoriteProduct{
    id: number,
    title: string,
    image: string,
    product_images: Array<{
        id: number,
        product: number,
        image: string
    }>;
    price: number,
    old_price: number,
    currency: string,
    review_count: number,
    average_rating: number,
    created: string
}
export interface FavoriteProductData {
    id: number,
    product: FavoriteProduct
}