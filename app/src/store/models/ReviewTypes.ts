export interface AddReview {
    user_id: number,
    product_id: number,
    text: string,
    stars: number,
    advantages: string
}
export interface Reviews {
    id: number,
    user_id: number,
    product_id: number,
    text: string,
    created_at: string,
    stars: number,
}
export interface ReviewsData {
    count: number,
    next: string,
    previous: null | string,
    results: Reviews[]
}