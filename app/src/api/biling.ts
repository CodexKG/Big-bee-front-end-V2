
import { CancelToken } from "axios";
import { instance } from "./index";
import { OrderPlacing, ProductData, SingleProduct } from 'types/types';
import accessToken from "service";

const orders = (data: OrderPlacing, sourceToken?: CancelToken) =>
    instance.post('/billing/orders/', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }, cancelToken: sourceToken
    });

const endpoints = { orders };
export default endpoints;
