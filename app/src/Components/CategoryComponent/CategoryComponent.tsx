import React, { useEffect } from "react";
import classes from './Category.module.scss';
import moreIcon from './img/icon.svg';
import CategoryCardComponent from '../CategoryCardComponent/CategoryCardComponent';
import { Carousel } from "antd";
import { CaretLeftFilled, CaretRightFilled, } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "store/hook";
import axios from "axios";
import { fetchPopularCategories } from "store/reducers/categoryReduser";

const CategoryComponent: React.FC = () => {
  const { popular } = useAppSelector((state) => state.category)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatch(fetchPopularCategories({ cancelToken: source.token, }))
    return () => {
      source.cancel('Запрос отменен, компонент размонтирован');
    };
  }, []);


  return (
    <div className={classes.category}>
      <div className={classes.category_block}>
        <h1 className={classes.category_title}>Популярные категории</h1>
        <a href="#">Все товары <img src={moreIcon} alt="" /></a>
      </div>

      <Carousel
        slidesToShow={4}
        dots={false}
        prevArrow={<ArrowLeft />}
        nextArrow={<ArrowRight />}
        slidesToScroll={2}
        arrows={true}
        swipe={true}
      >
        {
          popular.map(item => {
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
