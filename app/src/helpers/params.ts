import { useLocation } from "react-router-dom";
import { FilterParams } from "store/models/WindowTypes";

export function createQueryAtribute(filters: FilterParams): string {
    const queryParts: string[] = [];

    for (const key in filters) {
        const value = filters[key];
        if (value !== undefined) { // Игнорировать поля с неопределенными значениями
            queryParts.push(`${encodeURIComponent(key)}__${encodeURIComponent(value)}`);
        }
    }

    return queryParts.join('&');
}
export function createQueryString(filters: FilterParams): string {
    const queryParts: string[] = [];

    for (const key in filters) {
        const value = filters[key];
        if (value !== undefined) { // Игнорировать поля с неопределенными значениями
            if (key === 'attribute') {
                queryParts.push(`${encodeURIComponent(key)}=${createQueryAtribute(value)}`);
            } else {
                queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
    }

    return queryParts.join('&');
}

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export function parseQueryString(queryString: string): FilterParams {
    const params = new URLSearchParams(queryString);
    const filters: FilterParams = {};

    params.forEach((value, key) => {
        // Проверка, является ли параметр атрибутом
        if (key.startsWith('attribute__')) {
            const attributeKey = key.replace('attribute__', '');
            // Создание объекта атрибутов, если он ещё не существует
            if (!filters.attribute) {
                filters.attribute = {};
            }
            // Добавление атрибута в объект
            filters.attribute[attributeKey] = value;
        } else {
            // Обработка обычных параметров
            filters[key] = value;
        }
    });

    // Преобразование числовых значений для известных полей
    ['price_min', 'price_max', 'limit', 'offset'].forEach((field) => {
        if (filters[field]) {
            filters[field] = Number(filters[field]);
        }
    });

    return filters;
}