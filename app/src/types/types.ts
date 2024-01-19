
export interface loginValues {
    username: string
    password: string
}

export interface signUpValues extends loginValues {
    confirm_password: string
}
export interface Product {
    id: number;
    shop: number;
    category: string[]; // Массив строк, предположим, что категории являются строками
    title: string;
    description: string;
    image: string;
    product_images: string[]; // Массив строк с URL-адресами изображений
    price: number;
    currency: string;
    created: string; // Дата в формате строки
}
export interface ProductData {
    count: number,
    next: string,
    previous: null | string,
    results: Product[]
}

export interface Shop {
    id: number,
    name: string,
    description: string,
    logo: string,
    banner: string,
    domain: null | string,
    slug: string,
    category: [],
    created: string
}
export interface ShopData {
    count: number,
    next: string,
    previous: null | string,
    results: Shop[]
}





export interface CartItem {
    id: number,
    cart: number,
    product: {
        id: number,
        shop: number,
        category: [],
        title: string,
        description: string,
        image: string,
        product_images: [],
        price: number,
        currency: string,
        created: string
    },
    quantity: number
}
export interface CartData {
    id: number,
    session_key: string,
    cart_items: CartItem[]
}
export interface localCartItem {
    image: string;
    title: string;
    name: string;
    price: number;
    id: number;
    quantity: number;
}
export interface Categories {
    id: number,
    title: string,
    slug: string,
    subcategories: number[]
}
