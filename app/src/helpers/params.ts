import { useLocation } from "react-router-dom";
import { FilterParams } from "store/models/WindowTypes";

export function createQueryAtribute(filters: FilterParams): string {
    const attributesString = filters
        .map((attribute: { key: string, value: string }) => `${encodeURIComponent(attribute.key)}__${encodeURIComponent(attribute.value)}`)
        .join('|');
    return attributesString;
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

type FilterParamss = {
    attribute: { key: string, value: string }[]
    [key: string]: any
};
export function parseQueryString(queryString: string): FilterParamss {
    const params = new URLSearchParams(queryString);
    console.log('call');




    const filters: FilterParamss = {
        attribute: []
    };
    const atrributeArray: any = [];


    params.forEach((value, key) => {
        console.log('call params:', { key: key, value: value });
        filters.attribute = [];

        if (key === 'attribute' && value.includes('__')) {
            value.split('|').forEach((value, key) => {
                if (value.includes('__')) {
                    const [attrKey, attrValue] = value.split('__');


                    atrributeArray.push({ key: decodeURIComponent(attrKey), value: decodeURIComponent(attrValue) });
                }
            })
        }
        else {
            if (key === 'limit' || key === 'offset' || key === 'price_min' || key === 'price_max') {
                filters[key] = parseInt(value, 10);
            } else {
                filters[key] = decodeURIComponent(value);
            }
        }
    });
    // console.log('atribute ', atrributeArray);
    filters.attribute = atrributeArray
    return filters;
}