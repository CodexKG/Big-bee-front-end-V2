import { useRef } from "react";
import classes from "./FavoritesCard.module.scss";
import { Row, Col, Typography, Button, Carousel, Flex } from "antd";
import messageIcon from "../../../assets/icon/message.svg";
import { numberWithSpaces } from "helpers";
import { HeartFilled, StarFilled } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { FavoriteProductData } from "store/models/FavoriteTypes";
import { useAppDispatch } from "store/hook";
import { delFavoriteProducts, getFavoriteProducts } from "store/reducers/favoritesReducers";
import axios from "axios";

const FavoritesCard: React.FC<FavoriteProductData> = (props) => {
  const {
    id,
    product
  } = props;
  const source = axios.CancelToken.source();
  const dispatch = useAppDispatch();
  const delProduct = ()=>{
    dispatch(delFavoriteProducts({id:id}))
    dispatch(getFavoriteProducts({cancelToken:source.token}))
  }
  const { Title, Text } = Typography;
  const carouselRef = useRef<CarouselRef>(null);
  const imgHover = (index: number) => {
    carouselRef.current?.goTo(index, true);
  };

  return (
    <div className={classes.favoritesCard}>
      <div className={classes.img_block}>
        <div className={classes.discount_block}>-14%</div>
        <div className={classes.img_block_hover}>
          {product.product_images.map((item, index) => {
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
          {product.product_images.map((item, index) => {
            return (
              <div className={classes.img_block_item} key={index}>
                <img src={item.image} alt={product.title} />
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
              {numberWithSpaces(product.price)} {product.currency}
            </Title>
          </Text>
        </Col>
        <Col span={12} className={classes.old_price_wrap}>
          <span className={classes.old_price}>
            {numberWithSpaces(product.old_price)}
          </span>
        </Col>
      </Row>
      <Title level={3}>{product.title.slice(0,40)}{product.title.length >40? '...':''}</Title>
      <div>
        <div className={classes.row}>
          <span>
            <StarFilled style={{ color: "#F5C423" }} />
            {product.average_rating}
          </span>
          <span>
            <img src={messageIcon} alt="message" />
            {numberWithSpaces(product.review_count)} отзыва
          </span>
        </div>
        <Text>Доставка продавца, завтра</Text>
      </div>

      <Flex gap={15}>
        <Button className={classes.cart_button}>В корзину</Button>
        <Button 
          className={classes.cart_favorites}
          onClick={()=>{delProduct()}}
        >
          <HeartFilled />
        </Button>
      </Flex>
    </div>
  );
};

export default FavoritesCard;