import { FC } from "react";
import classes from './SinglePage.module.scss';
import arrowIcon from './icons/arrow-icon.svg';
import wishListIcon from './icons/wishlist-icon.svg';
import SinglePageTop from "./SingleTop/SinglePageTop";
import Col_1 from "./Col_1/Col_1";
import Col_2 from "./Col_2/Col_2";
import { Promotion } from "Components";

const SinglePageProduct: FC = () =>{

    return (
        <div className={classes.singlePage}>
            <div className={classes.singlePage_nav}>
                <button className={classes.singlePage_nav_btn}>
                Электроника
                    <img src={arrowIcon} alt="" />
                </button>
                <button className={classes.singlePage_nav_btn}>
                Смартфоны
                    <img src={arrowIcon} alt="" />
                </button>
                <button className={classes.singlePage_nav_btn}>
                Мобильные телефоны
                    <img src={arrowIcon} alt="" />
                </button>
                <button className={classes.singlePage_nav_btn}>
                Apple
                    <img src={arrowIcon} alt="" />
                </button>
            </div>

             <div className={classes.singlePage_top_row}>
                    <h2 className={classes.singlePage_title}>Apple iPhone 15 256Gb Dual: nano SIM <br /> + eSIN, черный (new)</h2>

                    <button className={classes.singlePage_wishlist_btn}>
                        <img src={wishListIcon} alt="" />
                        В избранное
                    </button>
             </div>

            <div className={classes.singlePage_row}>
                <Col_1 />
                <Col_2 />
            </div>
            <br />
            <br />
            <br />
        <Promotion title="Еще может подойти" />
        <Promotion title="Аксессуары" />
        <Promotion title="С этим товаром покупают" />
        </div>
    )
}

export default SinglePageProduct;
