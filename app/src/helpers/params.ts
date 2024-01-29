import { useLocation } from "react-router-dom";
import { FilterParams } from "store/models/WindowTypes";

export function createQueryString(filters: FilterParams): string {
    const queryParts: string[] = [];

    for (const key in filters) {
        const value = filters[key];
        if (value !== undefined) { // Игнорировать поля с неопределенными значениями
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
    }

    return queryParts.join('&');
}
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
