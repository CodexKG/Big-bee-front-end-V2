export interface attrType {
    key: string,
    value:string
}
export interface CartProduct {
    id: number,
    title: string,
    description: string,
    image: string,
    product_attributes: attrType[],
    price:number,
    old_price:number,
    product_code:number,
}
export interface CartItem {
    id: number,
    cart: number,
    product:CartProduct,
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
    title: string,
    description: string,
    image: string,
    product_attributes: attrType[],
    price:number,
    old_price:number,
    product_code:number,
}
export interface localCartItem {
    id: number,
    cart: number,
    product:localCartProduct;
    quantity: number,
    is_selected:boolean,
}
export interface user {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    date_joined: string,
    profile_image: string,
}