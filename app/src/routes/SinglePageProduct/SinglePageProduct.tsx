import { FC, useEffect } from "react";
import classes from './SinglePage.module.scss';
import arrowIcon from './icons/arrow-icon.svg';
import wishListIcon from './icons/wishlist-icon.svg';
import SinglePageTop from "./SingleTop/SinglePageTop";
import Col_1 from "./Col_1/Col_1";
import Col_2 from "./Col_2/Col_2";
import { Promotion } from "Components";
import { api } from "api";
import { useAppDispatch, useAppSelector } from "store/hook";
import { useParams } from "react-router-dom";
import { fetchProductById } from "store/reducers/producRedusers";
import axios from "axios";
import { fetchBanners } from "store/reducers/BannerReducesr";

const SinglePageProduct: FC = () => {
    const { id } = useParams()
    const { selectedProduct } = useAppSelector((state) => state.produckt)

    const { data, status } = useAppSelector((state) => state.baner)

    const dispatch = useAppDispatch()
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchProductById({ id: Number(id), cancelToken: source.token }))
    }, [id])

    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchBanners({ cancelToken: source.token, }))


        return () => {
            source.cancel('Запрос отменен, Слайдер приостоновлен');
        };
    }, [])
    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth', // Для плавной прокрутки
        });
    }, [id])

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
                <h2 className={classes.singlePage_title}>{selectedProduct?.title}</h2>

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
            <Promotion title="Акции и скидки" getCarts={api.getProductBestSellers} />
            <Promotion title="Хиты продаж" getCarts={api.getPromotionRandomProducts} />
        </div>
    )
}

export default SinglePageProduct;
