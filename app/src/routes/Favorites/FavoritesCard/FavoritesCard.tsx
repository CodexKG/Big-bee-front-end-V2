import { useState, useRef } from "react";
import classes from "./FavoritesCard.module.scss";
import { IPromotionCard } from "interfaces";
import { Row, Col, Typography, Button, Carousel, message } from "antd";
import messageIcon from "../../../assets/icon/message.svg";
import type { CarouselProps } from "antd";
import { numberWithSpaces } from "helpers";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { useNavigate } from "react-router-dom";
import { api } from "api";
import { getCookie } from "helpers/cookies";
type DotPosition = CarouselProps["dotPosition"];

const FavoritesCard: React.FC<IPromotionCard> = (props) => {
  const {
    salesman_img,
    title,
    description,
    price,
    old_price,
    average_rating,
    review_count,
    product_images,
  } = props;

  const { Title, Text } = Typography;
  const [dotPosition, setDotPosition] = useState<DotPosition>("top");
  const carouselRef = useRef<CarouselRef>(null);

  const imgHover = (index: number) => {
    carouselRef.current?.goTo(index, true);
  };

  return (
    <div className={classes.favoritesCard}>
      <div className={classes.img_block}>
        <div className={classes.discount_block}>-14%</div>
        <div className={classes.img_block_hover}>
          {product_images.map((item, index) => {
            return (
              <div
                className={classes.img_block_hover_it}
                onMouseMove={() => imgHover(index)}
                key={item.id}
              ></div>
            );
          })}
        </div>
        <Carousel dotPosition={dotPosition} ref={carouselRef}>
          {product_images.map((item, index) => {
            return (
              <div className={classes.img_block_item} key={index}>
                <img src={item.image} alt={title} />
              </div>
            );
          })}
        </Carousel>
      </div>

      <Row gutter={0}>
        <Col span={8}>
          <Text strong>
            <Title
              level={3}
              style={{
                alignItems: "center",
                display: "flex",
                marginBottom: "2px",
              }}
            >
              {numberWithSpaces(price)} с
            </Title>
          </Text>
        </Col>
        <Col span={12} className={classes.old_price_wrap}>
          <span className={classes.old_price}>
            {numberWithSpaces(old_price)}
          </span>
        </Col>
      </Row>
      <Title level={3}>{title}</Title>
      <div>
        <div className={classes.row}>
          <span>
            <StarFilled style={{ color: "#F5C423" }} />
            {average_rating}
          </span>
          <span>
            <img src={messageIcon} alt="message" />
            {numberWithSpaces(review_count)} отзыва
          </span>
        </div>
        <Text>Доставка продавца, завтра</Text>
      </div>

      <Row style={{ justifyContent: "space-between" }}>
        <Button className={classes.cart_button}>В корзину</Button>
      </Row>
    </div>
  );
};

export default FavoritesCard;
