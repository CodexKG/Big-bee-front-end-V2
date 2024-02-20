import React from "react";
import classes from "./FavoritesCarusel.module.scss";
import Title from "antd/es/typography/Title";
import { Typography, Carousel } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import "./FavoritesCarusel.scss";
import "swiper/css";
import { PromotionSkeleton } from "Components/Skeleton";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
import { FavoriteProductData } from "store/models/FavoriteTypes";

const { Text } = Typography;

interface IFavoritesCarusel {
  title?: string;
  data: FavoriteProductData[];
  status:string;
}

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
      style={{ display: currentSlide === slideCount - 4 ? "none" : "block" }}
      type="button"
    >
      <CaretRightFilled style={{ color: "black", fontSize: 15 }} />
    </button>
  );
};

const FavoritesCarusel: React.FC<IFavoritesCarusel> = ({ title, data,status }) => {

  if (status === "pending") {
    return (
      <section className={`${classes.favoritesCarusel} favoritesCarusel`}>
        <div className={classes.favoritesCarusel_skeleton}>
          <PromotionSkeleton />
          <PromotionSkeleton />
          <PromotionSkeleton />
          <PromotionSkeleton />
        </div>
      </section>
    );
  }
  if (status === "rejected") {
    return <Title level={1}>Произошла ошибка</Title>;
  }
  return (
    <section className={classes.favoritesCarusel + " favoritesCarusel"}>
      <div className={classes.favoritesCarusel_header}>
        <Title level={1} className={classes.favoritesCarusel_title}>
          {title ? title : "Акции и скидки"}
        </Title>
        <Text>
          Все товары <CaretRightFilled color="#000" />
        </Text>
      </div>
      <div className={classes.favoritesCarusel_body}>
        <Carousel
          slidesToShow={4}
          dots={false}
          prevArrow={<ArrowLeft slideCount={data.length} />}
          nextArrow={<ArrowRight slideCount={data.length} />}
          slidesToScroll={1}
          infinite={false}
          arrows={true}
        >
          {data.map((item: FavoriteProductData) => {
   
              return (
                <FavoritesCard
                  product={item.product}
                  id={item.id}
                  />
              );
            
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default FavoritesCarusel;
