
import { FC, useRef } from "react";
import classes from "./CatalogProductCard.module.scss";
import { Button, Carousel, Col, Layout, Row } from "antd";
import { Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DefaultButton } from "Components/UI";
import { HeartOutlined } from "@ant-design/icons";
import { numberWithSpaces } from "helpers";
import { CarouselProps } from "antd";

import { CarouselRef } from "antd/es/carousel";
interface ICatalogProductCart {
  product_imgs: Array<string>;
  title: string;
  colors: Array<string>;
  characteristics: { key: string | number, value: string | number }[];
  rating: number;
  price: number;
  old_price: number;
  salesman: string;
  salesman_img: string;
  offer: number;
}
type StringKeyObject = {
  [key: string]: any;
};
const CatalogProductCard: FC<ICatalogProductCart> = (props) => {
  const { Text, Title } = Typography;
  const {
    product_imgs,
    title,
    colors,
    characteristics,
    rating,
    price,
    old_price,
    salesman_img,
    salesman,
    offer,
  } = props;
  const characteristicsKeys: StringKeyObject = Object.keys(characteristics);
  // рендерить звезды | stars-кол-во звезд
  const getStarForNumber = (stars: number, classes?: string) => {
    let renderBlock = Array.from({ length: +stars.toFixed(0) }, (_, index) => {
      return (
        <div className={classes ? classes : ""}>
          <StarFilled style={{ color: "#F5C423" }} />
        </div>
      );
    });
    return renderBlock;
  };
  const carouselRef = useRef<CarouselRef>(null);
  const imgHover = (index: number) => {
    carouselRef.current?.goTo(index, true);
  };

  return (
    <section className={classes.catalogProductCard}>
      <div className={classes.catalogProductCard_item}>
        <div className={classes.img_block_hover}>
          <div
            className={classes.img_block_hover_it}
            onMouseMove={() => imgHover(0)}
          ></div>
          <div
            className={classes.img_block_hover_it}
            onMouseMove={() => imgHover(1)}
          ></div>
          <div
            className={classes.img_block_hover_it}
            onMouseMove={() => imgHover(2)}
          ></div>
          <div
            className={classes.img_block_hover_it}
            onMouseMove={() => imgHover(3)}
          ></div>
        </div>
        <Carousel
          dots={false}
          ref={carouselRef}
          style={{ alignItems: "center" }}
        >
          {product_imgs.map((src: any) => {
            return (
              <div className={classes.carousel_item}>
                <img src={src.image} alt={title} />

                <div className={classes.carousel_item_discount}>-14%</div>

              </div>
            );
          })}
        </Carousel>
      </div>
      <div className={classes.catalogProductCard_item}>
        <Title level={3}>{title}</Title>
        <div className={classes.colors}>
          {colors.map((color) => {
            return (
              <div
                className={classes.color}
                style={{ background: color }}
              ></div>
            );
          })}
        </div>
        <div className={classes.characteristics}>
          {/* {characteristicsKeys.map((el: string) => {
            return (
              <div>
                <Text className={classes.chctr_title}>{el}</Text>:
                {characteristics[el as keyof typeof characteristics]}
              </div>
            );
          })} */}
          {characteristics.map((el) => {
            return (
              <div>
                <Text className={classes.chctr_title}>{el.key}</Text>:
                {el.value}
              </div>
            );
          })}
        </div>
        <div className={classes.stars}>
          <span className={classes.wrap_star}>{getStarForNumber(rating)}</span>
          <span>{rating}/5</span>
        </div>
      </div>
      <div className={classes.catalogProductCard_item}>
        <Row align={"middle"} gutter={15}>
          <Col>
            <span className={classes.price}>{numberWithSpaces(price)} c</span>
          </Col>
          <Col>
            <span className={classes.old_price}>
              {numberWithSpaces(old_price)}
            </span>
          </Col>
        </Row>

        <Row className={classes.salesman} align={"middle"}>
          <Col>
            <img src={salesman_img} alt="" />
          </Col>
          <Col>{salesman}</Col>
        </Row>
        <Row justify={"space-between"} style={{ marginBottom: "15px" }}>
          <Col span={19}>
            <DefaultButton>Добавить в корзину</DefaultButton>
          </Col>
          <Col span={4}>
            <Button className={classes.heart_btn}>
              <HeartOutlined />
            </Button>
          </Col>
        </Row>

        <Link to={"?"}>Ёще {offer} предложений</Link>
      </div>
    </section>
  );
};

export default CatalogProductCard;
