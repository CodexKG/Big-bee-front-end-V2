export interface CartProduct {
    id: number,
    shop: number,
    title: string,
    description: string,
    image: string,
    product_attributes: object[],
    price:number,
    old_price:number,
    product_code:number,
}
export interface CartItem {
    id: number,
    cart: number,
    product:CartProduct[];
    quantity: number,
    is_selected:boolean,
}
export interface CartData {
    id: number,
    user_id: number,
    total_cost?: number,
    cart_items: CartItem[]
}

export interface localCartProduct {
    id: number,
    shop: number,
    title: string,
    description: string,
    image: string,
    product_attributes: object[],
    price:number,
    old_price:number,
    product_code:number,
}

export interface localCartItem {
    id: number,
    cart: number,
    product:localCartProduct[];
    quantity: number,
    is_selected:boolean,
}