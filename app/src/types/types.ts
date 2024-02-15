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


export interface ProductPopular {
    top_products: Product[]
    products_of_day: Product[]
}

export interface SingleProduct {
    id: number,
    shop: number,
    category: number[],
    brand: number,
    title: string,
    description: string,
    image: string,
    product_images: {
        id: number,
        product: number,
        image: string
    }[],
    shop_name: string,
    shop_logo: string,
    review_count: number,
    product_reviews: {
        id: number,
        user: number,
        username: string, 
        term_of_use: string,
        product: number,
        text: string,
        stars: number,
        disadvantages: string,
        count_dislike: number,
        count_like: number,
        advantages: string,
        created_at: Date,
    }[],
    average_rating: null,
    product_attributes: {
        key: string,
        value: string
    }[],
    product_configurator: {
        id: number,
        key: string,
        value: string[],
    }[],
    old_price: number,
    price: number,
    currency: string,
    product_code: null,
    created: string
}



export interface OrderPlacing {
    user: number,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
    billing_receipt_type: string,
    country: string,
    region: string,
    city: string,
    street: string,
    apartment: string,
    zip_code: string,
    note: string,
    billing_products: {
        product: number,
        quantity: number,
        price: number,
        configurator: string[]
    }[]
}