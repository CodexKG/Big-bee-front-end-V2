import React, {useEffect} from "react";
import classes from './Category.module.scss';
import moreIcon from './img/icon.svg';
import CategoryCardComponent from '../CategoryCardComponent/CategoryCardComponent';
import { Carousel } from "antd";
import { CaretLeftFilled, CaretRightFilled, } from "@ant-design/icons";
import {api} from '../../api/index';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularCategories } from "store/reducers/popularCategoryRedusers";
import { Categories } from 'types/types';
import { useAppDispatch, useAppSelector } from 'store/hook';
import axios from "axios";

const CategoryComponent: React.FC = () =>{
  const { data, children, status } = useAppSelector((state) => state.popularCategories);
  const dispatch = useAppDispatch();
    const categories = [
        {
            id: 1,
            title: 'Наушники',
            price: 'от 14 990 с',
            image: 'https://gadgetstore.kz/wa-data/public/shop/products/42/03/342/images/1873/1873.970.jpeg'
        },
        {
            id: 2,
            title: 'Телефоны',
            price: 'от 94 990 с',
            image: 'https://www.myphone.kg/files/media/22/22499.png'
        },
        {
            id: 3,
            title: 'Ноутбуки',
            price: 'от 74 990 с',
            image: 'https://abi.kg/upload/iblock/fb3/ghpwpxfzumw64fazw1i0f9n72h8vrc9j.jpg   '
        },
        {
            id: 4,
            title: 'Фото и видео',
            price: 'от 74 990 с',
            image: 'https://s1.iconbird.com/ico/2013/7/391/w512h51213727793707dside.png'
        },
    ]

    useEffect(() => {
      const source = axios.CancelToken.source();
      dispatch(fetchPopularCategories({ cancelToken: source.token, }))
      return () => {
          source.cancel('Запрос отменен, компонент размонтирован');
      };
  }, []);
  useEffect(()=>{
    console.log(data);

  },[data])
    return (
        <div className={classes.category}>
            <div className={classes.category_block}>
                <h1 className={classes.category_title}>Популярные категории</h1>
                <a href="#">Все товары <img src={moreIcon} alt="" /></a>
            </div>

            <Carousel
              slidesToShow={3}
              dots={false}
              prevArrow={<ArrowLeft />}
              nextArrow={<ArrowRight />}
              slidesToScroll={1}
              infinite={false}
              arrows={true}
            >
                {
                    data.map(item =>{
                        return <CategoryCardComponent key={item.id} item={item} />
                    })
                }
            </Carousel>
        </div>
    )
}

export default CategoryComponent;


const ArrowLeft: React.FC<any> = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={`slick-prev slick-arrow ${classes.prevBtn}`}
      style={{ display: currentSlide === 0 ? "none" : "block" }}
    >
      <CaretLeftFilled style={{ color: "black", fontSize: 15 }} />
    </button>
  );
  const ArrowRight: React.FC<any> = ({ currentSlide, slideCount, ...props }) => {
    return (
      <button
        {...props}
        className={`slick-next slick-arrow ${classes.nextBtn}`}
        style={{ display: currentSlide === 2 ? "none" : "block" }}
        type="button"
      >
        <CaretRightFilled style={{ color: "black", fontSize: 15 }} />
      </button>
    );
  };
