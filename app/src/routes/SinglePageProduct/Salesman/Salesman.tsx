import { FC } from "react";
import classes from './Salesman.module.scss';
import starIcon from '../icons/gold-star-icon.svg';

type props = {
    discount: string,
    oldPrice: string,
    currentPrice: string,
    selected: boolean,
    delivery_date: string,
    pickup_available: boolean,
    payment_method: string,
    review_count: number,
    average_rating: number,
}

const Salesman: FC<props> = ({ discount, oldPrice, currentPrice, selected, delivery_date, pickup_available, payment_method, average_rating, review_count }) => {

    return (
        <div className={
            selected
                ? `${classes.salesman} ${classes.salesman_active}`
                : classes.salesman
        }>
            {
                discount
                    ? <>
                        <div className={classes.salesman_discount_row}>
                            <p className={classes.salesman_discount_oldPrice}>{oldPrice}</p>
                            <p className={classes.salesman_discount_text}>Скидка</p>

                        </div>
                        <div className={classes.salesman_discount_row}>
                            <p className={classes.salesman_discount_current_price}>{currentPrice}</p>
                            <p className={classes.salesman_discount_discount}>{discount}</p>
                        </div>
                    </>
                    : <h3 className={classes.salesman_price}>{currentPrice}</h3>
            }

            <p className={classes.salesman_text}>{delivery_date}</p>
            <p className={classes.salesman_text}>
                {
                    pickup_available === true ? <>Самовывоз завтра,
                        <span className={classes.salesman_text_green}>бесплатно</span></> : <>
                        недоступен,

                    </>
                }

            </p>
            <p className={classes.salesman_payment}>{payment_method}</p>

            <div className={classes.salesman_icon_block}>
                <img className={classes.salesman_icon} src="https://klike.net/uploads/posts/2019-03/medium/1551512888_2.jpg" alt="" />
                <p className={classes.salesman_text}>Продавец</p>
            </div>

            <div className={classes.salesman_raiting}>
                <img src={starIcon} alt="" />
                <div className={classes.salesman_text}>
                    {average_rating}
                    <span className={classes.salesman_raiting_full}>/{review_count}</span>
                </div>
            </div>
            {
                selected
                    ? <button className={classes.salesman_active_btn}>Добавить в корзину</button>
                    : ''
            }
        </div>

    )
}

export default Salesman;
