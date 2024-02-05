import React from "react";
import classes from "./Promotion.module.scss";
import Title from "antd/es/typography/Title";
import { Typography, Carousel } from "antd";
import { PromotionCard } from "../index";
import { CaretLeftFilled, CaretRightFilled, } from "@ant-design/icons";
import "./Promotion.scss";
import "swiper/css";
const { Text } = Typography;

interface IPromotion{
  title?:string
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
      style={{ display: currentSlide === 2 ? "none" : "block" }}
      type="button"
    >
      <CaretRightFilled style={{ color: "black", fontSize: 15 }} />
    </button>
  );
};


const Promotion: React.FC<IPromotion> = ({title}) => {

  return (
    <section className={classes.promotion + " promotion"}>
      <div className={classes.promotion_header}>
        <Title level={1} className={classes.promotion_title}>
          {title?title:'Акции и скидки'}
        </Title>
        <Text>
          Все товары <CaretRightFilled color="#000" />
        </Text>
      </div>
      <div className={classes.promotion_body}>
        <Carousel
          slidesToShow={4}
          dots={false}
          prevArrow={<ArrowLeft />}
          nextArrow={<ArrowRight />}
          slidesToScroll={1}
          infinite={false}
          arrows={true}
        >
          <PromotionCard
            product_img="https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg"
            salesman_img="https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg"
            title="Apple iPhone 15 + SIM + SIM 256Gb (new)"
            subtitle="Our most powerful chip in Apple Watch ever. A magical new way."
            price={94990}
            old_price={124990}
            rating={4.9}
            review={203}
            id={1}
          />
          <PromotionCard
            product_img="https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg"
            salesman_img="https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg"
            title="Apple iPhone 15 + SIM + SIM 256Gb (new)"
            subtitle="Our most powerful chip in Apple Watch ever. A magical new way."
            price={94990}
            old_price={124990}
            rating={4.9}
            review={203}
            id={2}
          />
          <PromotionCard
            product_img="https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg"
            salesman_img="https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg"
            title="Apple iPhone 15 + SIM + SIM 256Gb (new)"
            subtitle="Our most powerful chip in Apple Watch ever. A magical new way."
            price={94990}
            old_price={124990}
            rating={4.9}
            review={203}
            id={3}
          />
          <PromotionCard
            product_img="https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg"
            salesman_img="https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg"
            title="Apple iPhone 15 + SIM + SIM 256Gb (new)"
            subtitle="Our most powerful chip in Apple Watch ever. A magical new way."
            price={94990}
            old_price={124990}
            rating={4.9}
            review={203}
            id={4}
          />
          <PromotionCard
            product_img="https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg"
            salesman_img="https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg"
            title="Apple iPhone 15 + SIM + SIM 256Gb (new)"
            subtitle="Our most powerful chip in Apple Watch ever. A magical new way."
            price={94990}
            old_price={124990}
            rating={4.9}
            review={203}
            id={5}
          />
          <PromotionCard
            product_img="https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg"
            salesman_img="https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg"
            title="Apple iPhone 15 + SIM + SIM 256Gb (new)"
            subtitle="Our most powerful chip in Apple Watch ever. A magical new way."
            price={94990}
            old_price={124990}
            rating={4.9}
            review={203}
            id={6}
          />
        </Carousel>
      </div>
    </section>
  );
};

export default Promotion;
