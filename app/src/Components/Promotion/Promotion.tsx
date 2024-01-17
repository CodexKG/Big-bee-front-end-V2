import React from "react";
import classes from "./Promotion.module.scss";
import Title from "antd/es/typography/Title";
import Layout from "antd/es/layout/layout";
import { Typography, Carousel } from "antd";
import arrowRightIcon from "../../assets/icon/promotion/arrow-right.svg";
import { PromotionCard } from "../index";
import "./Promotion.scss";
import "swiper/css";
const { Text } = Typography;

const ArrowLeft: React.FC<any> = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={`slick-prev slick-arrow ${classes.prevBtn}`}
    style={{ display: currentSlide === 0 ? "none" : "block" }}
  >
    <img src={arrowRightIcon} alt="" />
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
      <img src={arrowRightIcon} alt="" />
    </button>
  );
};

const Promotion: React.FC = () => {
  return (
    <section className={classes.promotion + " promotion"}>
      <Layout>
        <div className={classes.promotion_header}>
          <Title level={1} className={classes.promotion_title}>
            Акции и скидки
          </Title>
          <Text>
            Все товары <img src={arrowRightIcon} alt="" />
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
            />
          </Carousel>
        </div>
      </Layout>
    </section>
  );
};

export default Promotion;
