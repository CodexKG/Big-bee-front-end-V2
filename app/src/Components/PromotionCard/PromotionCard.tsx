import { useState, useRef } from "react";
import classes from "./PromotionCard.module.scss";
import { IPromotionCard } from "interfaces";
import { Row, Col, Typography, Button, Carousel } from "antd";
import messageIcon from "../../assets/icon/message.svg";
import type { CarouselProps } from "antd";
import { numberWithSpaces } from "helpers";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { saveCartToLocalStorage } from "store/reducers/cartRedusers"

type DotPosition = CarouselProps["dotPosition"];

const PromotionCard: React.FC<IPromotionCard> = (props) => {
  const {
    salesman_img,
    title,
    subtitle,
    description,
    price,
    old_price,
    average_rating,
    review_count,
    product_images,
    id,
    product_img,
    
  } = props;
  const { Title, Text } = Typography;
  const [dotPosition, setDotPosition] = useState<DotPosition>("top");
  const carouselRef = useRef<CarouselRef>(null);
  const imgHover = (index: number) => {
    carouselRef.current?.goTo(index, true);
  };
  const cart_info = {
    id: id,
    image: product_img,
    title: title,
    description: subtitle,
    old_price: old_price,
    price: price,
    quantity: 1,
    is_selected: false,
    code: 12312,
    category: 'Чёрный',
  }


  return (
    <div className={classes.promotionCard}>
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
              <div className={classes.img_block_item}>
                <img src={item.image} alt={title} key={item.id} />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className={classes.salesman}>
        <Row gutter={0} align={"middle"}>
          <Col span={2}>
            <img
              src={salesman_img}
              className={classes.salesman_img}
              alt={title}
            />
          </Col>
          <Col span={2}>Продавец</Col>
        </Row>
      </div>
      <Title level={3}>{title}</Title>
      <div className={classes.subtitle}>
        <Text>{description}</Text>
      </div>
      <Text strong>
        <Title level={3}>{numberWithSpaces(price)} с</Title>
      </Text>
      <Row className={classes.old_price_wrap}>
        <Col span={12}>
          <span className={classes.old_price}>
            {numberWithSpaces(old_price)}
          </span>
        </Col>
        <Col span={12} className={classes.old_price_item}>
          <span>
            <StarFilled style={{ color: "#F5C423" }} />
            {average_rating}
          </span>
          <span>
            <img src={messageIcon} alt="message" />
            {numberWithSpaces(review_count)} отзыва
          </span>
        </Col>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <Button onClick={() => { saveCartToLocalStorage(cart_info) }} className={classes.cart_button}>Добавить в корзину</Button>

        <Button className={classes.cart_favorites}>
          <HeartOutlined />
        </Button>
      </Row>
    </div>
  );
};

export default PromotionCard;
