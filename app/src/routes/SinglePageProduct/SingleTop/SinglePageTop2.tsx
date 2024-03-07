import { FC } from "react";
import Salesman from "../Salesman/Salesman";
import singleClass from '../SinglePage.module.scss';
import { useAppSelector } from "store/hook";
import { getDiscount } from "helpers/getDiscount";

const SinglePageTop2: FC = () => {
    const { selectedProduct } = useAppSelector((state) => state.produckt)
    return (
        <div >
            {
                selectedProduct?.product_delivery.map((item, index) => <Salesman
                    review_count={item.review_count}
                    average_rating={item.average_rating}
                    pickup_available={item.pickup_available}
                    payment_method={item.payment_method}
                    key={index}
                    discount={`${getDiscount(item.price, item.old_price)}%`}
                    oldPrice={`${item.old_price}`}
                    currentPrice={`${item.price} c`}
                    selected={index === 0 ? true : false}
                    delivery_date={item.delivery_date}
                    selectedProduct={selectedProduct}
                />)
            }


            <a href="#" className={singleClass.singlePage_more_link}>Все 91 предложения</a>
        </div>
    )
}

export default SinglePageTop2;
