import { useState } from "react";
import classes from "./PromotionCard.module.scss";
import { IPromotionCard } from "interfaces";
import { Row, Col, Typography, Button, Carousel } from "antd";
import messageIcon from "../../assets/icon/message.svg";
import type { CarouselProps } from "antd";
import { numberWithSpaces } from "helpers";
import { StarFilled,HeartOutlined  } from "@ant-design/icons";
type DotPosition = CarouselProps["dotPosition"];

const PromotionCard: React.FC<IPromotionCard> = (props) => {
  const {
    product_img,
    salesman_img,
    title,
    subtitle,
    price,
    old_price,
    rating,
    review,
  } = props;
  const { Title, Text } = Typography;
  const [dotPosition, setDotPosition] = useState<DotPosition>("top");

  return (
    <div className={classes.promotionCard}>
      <div className={classes.img_block}>
        <Carousel dotPosition={dotPosition}>
          <div className={classes.img_block_item}>
            <img src={product_img} alt={title} />
          </div>
          <div className={classes.img_block_item}>
            <img src={product_img} alt="" />
          </div>
          <div className={classes.img_block_item}>
            <img src={product_img} alt="" />
          </div>
          <div className={classes.img_block_item}>
            <img src={product_img} alt="" />
          </div>
        </Carousel>
      </div>
      <div className={classes.salesman}>
        <Row gutter={0} align={"middle"}>
          <Col span={2}>
            <img src={salesman_img} className={classes.salesman_img} alt="" />
          </Col>
          <Col span={2}>Продавец</Col>
        </Row>
      </div>
      <Title level={3}>{title}</Title>
      <div className={classes.subtitle}>
        <Text>{subtitle}</Text>
      </div>
      <Text strong>
        <Title level={3}>{numberWithSpaces(price)} с</Title>
      </Text>
      <Row className={classes.old_price_wrap}>
        <Col span={14}>
          <span className={classes.old_price}>
            {numberWithSpaces(old_price)}
          </span>
        </Col>
        <Col span={10} className={classes.old_price_item}>
          <span>
            <StarFilled style={{color:'#F5C423'}}/>
            {rating}
          </span>
          <span>
            <img src={messageIcon} alt="" />
            {numberWithSpaces(review)} отзыва
          </span>
        </Col>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <Button className={classes.cart_button}>Добавить в корзину</Button>
        <Button className={classes.cart_favorites}>
          <HeartOutlined/>
        </Button>
      </Row>
    </div>
  );
};

export default PromotionCard;
