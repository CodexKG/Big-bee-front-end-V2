

export function getBredCrumps(title: string, subTitle: string, subSubTitle?: string) {
    console.log(title, subTitle, subSubTitle);

    return [
        {
            title: title,
        },
        {
            title: subTitle,
            href: '',
        },
        {
            title: subSubTitle ? subSubTitle : '',
            href: '',
        }
    ]

}
interface Category {
    id: number;
    title: string;
    banner: string | null;
    icon: string | null;
    slug: string;
    subcategories: Category[];
}

export function findCategoryById(id: number, category: Category, path: any[] = []): any[] | null {
    if (category.id === id) {
        const result = path.map(cat => ({ title: cat.title, href: '' }));
        result.unshift({ title: category.title, href: '' });
        return result;
    }

    for (const subcategory of category.subcategories) {
        const result = findCategoryById(id, subcategory, [...path, subcategory]);
        if (result) {
            return result;
        }
    }

    return null;
}