import { producktData } from '../data/test/testData';

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
    product_attributes: { key: string, value: string }[]
    shop_name: string
    shop_logo: string
    old_price: number
    average_rating: number | null
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

export interface Categories {
    banner: string
    icon: string
    id: number,
    title: string,
    slug: string,
    subcategories: Categories[]
    category_attributes: { [key: string]: string[] };
}


export interface ProductPopular{
    top_products:Product[]
    products_of_day:Product[]
}