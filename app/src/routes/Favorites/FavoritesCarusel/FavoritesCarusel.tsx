import React, { useEffect, useState } from "react";
import classes from "./FavoritesCarusel.module.scss";
import Title from "antd/es/typography/Title";
import { Typography, Carousel } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import "./FavoritesCarusel.scss";
import "swiper/css";
import { IPromotionCard } from "interfaces";
import { sliceText } from "helpers/sliceText";
import { PromotionSkeleton } from "Components/Skeleton";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
const { Text } = Typography;

interface IFavoritesCarusel {
  title?: string;
  getCarts: () => any;
}
type Status = "fullfiled" | "rejected" | "pending";

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

const FavoritesCarusel: React.FC<IFavoritesCarusel> = ({ title, getCarts }) => {
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState<Status>("pending");
  const getProducts = async () => {
    setStatus("pending");
    try {
      const data = await getCarts();
      if (data.status === 200) {
        setCards(data.data);
        setStatus("fullfiled");
      }
    } catch (err) {
      setStatus("rejected");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

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
          prevArrow={<ArrowLeft slideCount={cards.length} />}
          nextArrow={<ArrowRight slideCount={cards.length} />}
          slidesToScroll={1}
          infinite={false}
          arrows={true}
          swipeEvent={(swiper) => {
            console.log(swiper);
          }}
        >
          {cards.map((item: IPromotionCard, index) => {
   
              return (
                <FavoritesCard
                  key={index}
                  salesman_img="https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg"
                  title={item.title}
                  description={sliceText(item.description)}
                  price={item.price}
                  old_price={item.old_price}
                  average_rating={item.average_rating}
                  review_count={item.review_count}
                  product_images={item.product_images}
                  id={item.id}
                  product_code={item.product_code}
                />
              );
            
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default FavoritesCarusel;