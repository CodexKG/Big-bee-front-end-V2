
export interface IPromotionCard {

    id: number;
    product_img: string;
    subtitle: string
    salesman_img: string;
    title: string;
    description: string;
    price: number;
    old_price: number;
    average_rating: number;
    review_count: number;
    product_images: Array<{
        id: number,
        product: number,
        image: string
    }>
}