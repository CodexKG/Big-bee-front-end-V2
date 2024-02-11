
import { CancelToken } from "axios";
import { instance } from "./index";
import { OrderPlacing, ProductData, SingleProduct } from 'types/types';

const orders = (data: OrderPlacing, sourceToken?: CancelToken) =>
    instance.post('/billing/orders/', {
        apartment: "134",
        billing_receipt_type
            :
            'Delivery',
        city
            :
            "OSH",
        country
            :
            "1234",
        email
            :
            "justworking8888@gmail.com",
        first_name
            :
            "bekbolot",
        last_name
            :
            "zairbekov",
        note
            :
            "",
        phone
            :
            "+996772218466",
        region
            :
            "OSH",
        street
            :
            "Tomiris",
        user
            :
            2,
        zip_code
            :
            "1234",
    }, { cancelToken: sourceToken });

const endpoints = { orders };
export default endpoints;
