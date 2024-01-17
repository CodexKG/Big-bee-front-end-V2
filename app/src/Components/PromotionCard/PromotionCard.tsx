import { useState } from 'react'
import classes from './PromotionCard.module.scss'
import { IPromotionCard } from 'interfaces/IPromotion'
import { Row, Col, Typography, Button, Carousel } from 'antd'
import starIcon from '../../assets/icon/promotion/star.svg'
import messageIcon from '../../assets/icon/promotion/message.svg'
import heartIcon from '../../assets/icon/promotion/heart.svg'
import type { CarouselProps } from 'antd'
type DotPosition = CarouselProps['dotPosition'];

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
  } = props

  const { Title, Text } = Typography

  const [dotPosition, setDotPosition] = useState<DotPosition>('top');



  return (
    <div className={classes.promotionCard}>
      <div className={classes.img_block}>
        <Carousel dotPosition={dotPosition}>
          <div className={classes.img_block_item}>
            <img src={product_img} alt="" />
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
        <Row gutter={0} align={'middle'}>
          <Col span={2}><img src={salesman_img} className={classes.salesman_img} alt="" /></Col>
          <Col span={2}>Продавец</Col>
        </Row>
      </div>
      <Title level={3}>
        Apple iPhone 15 + SIM + SIM
        256Gb (new)
      </Title>
      <div className={classes.subtitle}>
        <Text>
          Our most powerful chip in Apple Watch ever. A magical new way.
        </Text>
      </div>
      <Text strong>
        <Title level={3}>
          94 990 с
        </Title>
      </Text>
      <Row className={classes.old_price_wrap}>
        <Col span={14}><span className={classes.old_price}>124 990</span></Col>
        <Col span={10} className={classes.old_price_item}><span><img src={starIcon} alt="" />4.9</span> <span><img src={messageIcon} alt="" />282 отзыва</span></Col>
      </Row>
      <Row style={{ justifyContent: 'space-between' }}>
        <Button className={classes.cart_button}>Добавить в корзину</Button>
        <Button className={classes.cart_favorites}><img src={heartIcon} alt="" /></Button>
      </Row>
    </div>
  )
}

export default PromotionCard