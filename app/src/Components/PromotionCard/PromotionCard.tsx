import { useState, useRef, useEffect } from "react";
import classes from "./PromotionCard.module.scss";
import { IPromotionCard } from "interfaces";
import { Row, Col, Typography, Button, Carousel, message } from "antd";
import messageIcon from "../../assets/icon/message.svg";
import type { CarouselProps } from "antd";
import { numberWithSpaces } from "helpers";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { addCartItem, addLocalCartItem } from "store/reducers/cartRedusers"
import { CartProduct } from "store/models/CartTypes";
import { useAppDispatch } from "store/hook";
import { getCookie } from "helpers/cookies";
import { useNavigate } from "react-router-dom";

type DotPosition = CarouselProps["dotPosition"];

const PromotionCard: React.FC<IPromotionCard> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

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
  const add_item = async () => {
    if (getCookie('access_token')) {
      try {
        const cart_id = Number(getCookie('cart_id'))
        await dispatch(addCartItem({ cart: cart_id, product_id: id, quantity: 1 }))
        message.success('Добавлен 1 продукт в корзину')
      }
      catch {
        message.error('Не получилось добавить в корзинку')
      }
    } else {
      const cart_info: CartProduct = {
        id: id,
        title: title,
        description: subtitle,
        image: product_images[0] ? product_images[0].image : '',
        product_attributes: [{ key: "Основная камера", value: "48 Mpx + 12 Mpx + 12 Mpx" }],
        price: price,
        old_price: old_price,
        product_code: 12312,
      }
      await dispatch(addLocalCartItem({ cartItem: cart_info }))
    }
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
      <Title style={{cursor:'pointer'}} onClick={() => navigate(`/product/${id}`)} level={3}>{title}</Title>
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
        <Button onClick={() => { add_item() }} className={classes.cart_button}>Добавить в корзину</Button>
        <Button className={classes.cart_favorites}>
          <HeartOutlined />
        </Button>
      </Row>
    </div>
  );
};

export default PromotionCard;
