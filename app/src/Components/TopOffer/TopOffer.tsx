import React from 'react';
import { Product } from 'types/types';
import classes from './TopOffer.module.scss';
import { CaretRightOutlined } from "@ant-design/icons"
import icon1 from "../../assets/icon/TopOffer/percent-icon.svg";
import icon2 from "../../assets/icon/TopOffer/express-car.svg";
import icon3 from "../../assets/icon/TopOffer/settings-icon.svg";
import icon4 from "../../assets/icon/TopOffer/card-icon.svg";


interface TopOfferProps {
  products: Product[];
}

const getBlockSize = (quantityOfBlocks: number) => {
  if (quantityOfBlocks === 4) {
    return new Array(quantityOfBlocks).fill('50%');
  }

  if (quantityOfBlocks >= 1 && quantityOfBlocks <= 4) {
    const baseSize = 92 / quantityOfBlocks;
    const blockSizes = Array.from({ length: quantityOfBlocks }, (_, index) =>
      index === quantityOfBlocks - 1 ? baseSize * 2 : baseSize
    );

    return blockSizes.map(size => `${size}%`);
  }

  return new Array(quantityOfBlocks).fill('100%');
};

const getDynamicClass = (quantityOfBlocks: number) => {
  if (quantityOfBlocks >= 1 && quantityOfBlocks <= 4) {
    return `x${quantityOfBlocks}`;
  }

  return 'default';
};

const TopOffer: React.FC<TopOfferProps> = ({ products }) => {
  const quantityOfBlocks = products.length;
  const blockSizes = getBlockSize(quantityOfBlocks);
  const dynamicClass = getDynamicClass(quantityOfBlocks);


  return (
    <div className={classes.TopOfferDiv}>
      <div className={`${classes.topOffer} ${classes[dynamicClass]}`}>
        {products.map((product, index) => (
          <div key={index} style={{ flex: blockSizes[index] }} className={classes.topOffer_Block}>
            <div className={classes.topOffer_Block_Up}>
              <h3 className={classes.topOffer_Block_Up_Title}>{product.title}</h3>
              <p className={classes.topOffer_Block_Up_Price}>
                {`Price: $${product.price.toFixed(2)} ${product.currency}`}
              </p>
            </div>
            <div className={classes.topOffer_Block_Down}>
              <a className={classes.topOffer_Block_Down_Link}>
                Перейти в каталог <CaretRightOutlined />
              </a>
              <div className={classes.topOffer_Block_Down_Image}>
                <img src={product.image} alt={product.title} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.offers}>
        <div className={classes.offer}>
          <div className={classes.offer_Image}>
            <img src={icon1} alt="offer" />
          </div>
          <h3>Авторизуйтесь, чтобы применить Бонусные рубли</h3>
        </div>
        <div className={classes.offer}>
          <div className={classes.offer_Image}>
            <img src={icon2} alt="offer" />
          </div>
          <h3>Экспресс-доставка от 2 часов</h3>
        </div>
        <div className={classes.offer}>
          <div className={classes.offer_Image}>
            <img src={icon3} alt="offer" />
          </div>
          <h3>30 дней на обмен возврат товара</h3>
        </div>
        <div className={classes.offer}>
          <div className={classes.offer_Image}>
            <img src={icon4} alt="offer" />
          </div>

          <h3>Система быстрых платежей</h3>

        </div>
      </div>
    </div>
  );
};

export default TopOffer;
