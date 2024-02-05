export interface CartItem {
    id: number,
    cart: number,
    product_id:number;
    quantity: number
}
export interface CartData {
    id: number,
    user_id: number,
    total_cost?: number,
    cart_items?: CartItem[]
}

export interface localCartItem {
    id: number;
    image: string;
    title: string;
    description: string;
    old_price: number;
    price: number;
    quantity: number;
    is_selected:boolean;
    code:number;
    category:any;
}