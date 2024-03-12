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
    product_configurator: {
        id: number,
        configurator_key: string,
        key: string,
        values: {
            price: number,
            title: string
        }[]
    }[],
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
    breadcrumbs: {
        id: number
        slug: string
        title: string
    }[]
    category_attributes: { [key: string]: string[] };
}


export interface ProductPopular {
    top_products: Product[]
    products_of_day: Product[]
}

type ProductDelivery = {
    id: null | number; // Поскольку id указано как null, возможно это поле предназначено для автогенерируемого идентификатора, который может быть числом
    old_price: number; // Старая цена товара
    price: number; // Текущая цена товара
    product: number; // Идентификатор продукта
    average_rating: number; // Средний рейтинг
    delivery_date: string; // Дата доставки в текстовом формате
    payment_method: string; // Методы оплаты, перечисленные через запятую в строке
    pickup_available: boolean; // Доступность самовывоза
    review_count: number; // Количество обзоров
    shop: string; // Название магазина
}
export interface SingleProduct {
    average_rating: number;
    brand: number;
    category: Array<number>;
    created: string;
    description: string;
    id: number;
    image: string;
    length: null; // Assuming 'null' as the only type since no other type is visible
    old_price: number;
    price: number;
    breadcrumbs: { id: number, title: string }[][]
    product_attributes: Array<{
        key: string;
        value: string;
    }>,
    product_delivery: ProductDelivery[],
    product_code: string;
    product_configurator: Array<{
        id: number;
        configurator_key: string;
        key: string;
        values: Array<{
            id: number;
            title: string;
            price?: number; // Optional as it's not visible for all values
            key?: string; // Optional as it's not visible for all values
        }>;
    }>;
    product_images: Array<{
        id: number;
        product: number;
        image: string;
    }>;
    product_reviews: Array<{
        id: number;
        user: number;
        username: string;
        product: number;
        text: string;
        stars: number;
        advantages: string; // Assuming a string although the content is masked
        count_dislike: number;
        count_like: number;
        created_at: string;
        disadvantages: string;
        terms_of_use?: string; // Optional as it's not visible for all reviews
    }>;
    review_count: number;
    shop_logo: string;
    shop_name: string;
    title: string;
    weight: null; // Assuming 'null' as the only type since no other type is visible
    width: null; // Assuming 'null' as the only type since no other type is visible
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