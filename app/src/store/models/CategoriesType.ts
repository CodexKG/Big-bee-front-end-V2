export interface PopularCategories {
    id: number;
    title: string;
    banner: string;
    icon: string;
    slug: string;
    min_price: number;
    subcategories: []
}[]

export interface PopularCategory {
    id: number;
    title: string;
    banner: string;
    icon: string;
    slug: string;
    min_price: number;
    subcategories: []
} 