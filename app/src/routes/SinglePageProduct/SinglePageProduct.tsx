import { FC, useEffect } from "react";
import classes from './SinglePage.module.scss';
import arrowIcon from './icons/arrow-icon.svg';
import wishListIcon from './icons/wishlist-icon.svg';
import Col_1 from "./Col_1/Col_1";
import Col_2 from "./Col_2/Col_2";
import { Promotion } from "Components";
import { api } from "api";
import { useAppDispatch, useAppSelector } from "store/hook";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "store/reducers/producRedusers";
import axios from "axios";
import { fetchBanners } from "store/reducers/BannerReducesr";
import { clearFilters } from "store/slices/WindowSlice";

const SinglePageProduct: FC = () => {
    const { id } = useParams()
    const { selectedProduct } = useAppSelector((state) => state.produckt)
    const navigate = useNavigate()

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
        <div className={classes.conteiner}>

            <div className={classes.singlePage}>
                <div className={classes.singlePage_nav}>
                    {selectedProduct?.breadcrumbs[0]?.map((item: { id: number, title: string }) => (<button key={item.id} onClick={() => {
                        navigate(`/catalog/${item.id}`)
                        dispatch(clearFilters({ id: Number(item.id) }))
                    }} className={classes.singlePage_nav_btn}>
                        {item.title}

                        <img src={arrowIcon} alt="" />
                    </button>))}


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
                <div className={classes.section}>
                    <Promotion title="Акции и скидки" getCarts={api.getProductBestSellers} />
                    <Promotion title="Хиты продаж" getCarts={api.getPromotionRandomProducts} />
                </div>

            </div>

        </div>

    )
}

export default SinglePageProduct;
