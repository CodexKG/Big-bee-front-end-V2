import { useRef } from "react";
import classes from "./PromotionCard.module.scss";
import { IPromotionCard } from "interfaces";
import { Row, Col, Typography, Button, Carousel, message } from "antd";
import messageIcon from "../../assets/icon/message.svg";
import { numberWithSpaces } from "helpers";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { useNavigate } from "react-router-dom";
import { api } from "api";
import { getCookie } from "helpers/cookies";
import { useAppDispatch } from "store/hook";
import { CartProduct } from "store/models/CartTypes";
import { addCartItem, addLocalCartItem } from "store/reducers/cartRedusers";

const PromotionCard: React.FC<IPromotionCard> = (props) => {
  const {
    salesman_img,
    title,
    description,
    price,
    old_price,
    average_rating,
    review_count,
    product_images,
    id,
  } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Title, Text } = Typography;
  const carouselRef = useRef<CarouselRef>(null);
  
  const imgHover = (index: number) => {
    carouselRef.current?.goTo(index, true);
  };
  const add_item = async () => {
    if (getCookie('access_token')) {
      try {
        const cart_id = Number(getCookie('cart_id'))
        await dispatch(addCartItem({ cart: cart_id, product_id: id, quantity: 1 }))
        message.open({
          type: "success",
          content: "Продукт добавлен в корзину",
          onClick: () => navigate("/cart"),
        });
        
      }
      catch {
        message.error('Не получилось добавить в корзинку')
      }
    } else {
      const cart_info: CartProduct = {
        id: id,
        title: title,
        description: description,
        image: product_images[0] ? product_images[0].image : '',
        product_attributes: [{ key: "Основная камера", value: "48 Mpx + 12 Mpx + 12 Mpx" }],
        price: price,
        old_price: old_price,
        product_code: 12312,
      }
      await dispatch(addLocalCartItem({ cartItem: cart_info }))
    }
  }
  const accessToken = getCookie("access_token");
  const onFavorites = async () => {
    if (!accessToken) {
      message.open({
        type: "error",
        content: "You are not logged in",
        onClick: () => navigate("/login"),
      });
    } else {
      
      try{
        await api.addProductToFavorite(
          Number(id),
          +getCookie("user_id"),
        );
        message.open({
          type: "success",
          content: "Successfully added",
          onClick: () => navigate("/favorites"),
        });
      }catch{
        message.open({
          type: "success",
          content: "Продукт уже в избранных",
          onClick: () => navigate("/favorites"),
        });
      }
    }
  };

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
        <Carousel dotPosition={'top'} ref={carouselRef}>
          {product_images.map((item, index) => {
            return (
              <div className={classes.img_block_item} key={index}>
                <img src={item.image} alt={title} />
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
      <Title onClick={() => navigate(`/product/${id}`)} level={3}>{title.slice(0,40)}{title.length >40? '...':''}</Title>
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
        <Button onClick={()=>add_item()} className={classes.cart_button}>Добавить в корзину</Button>
        <Button
          className={classes.cart_favorites}
          onClick={() => onFavorites()}
        >
          <HeartOutlined />
        </Button>
      </Row>
    </div>
  );
};

export default PromotionCard;
