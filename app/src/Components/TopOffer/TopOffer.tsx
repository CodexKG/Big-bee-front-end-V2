import React from 'react';
import { Product } from 'types/types';
import classes from './TopOffer.module.scss';
import { CaretRightOutlined } from "@ant-design/icons"


interface TopOfferProps {
  products: Product[];
}

const getDynamicClass = (quantityOfBlocks: number) => {
  if (quantityOfBlocks >= 1 && quantityOfBlocks <= 4) {
    return `x${quantityOfBlocks}`;
  }

  return 'default';
};

const TopOffer: React.FC<TopOfferProps> = ({ products }) => {
  const quantityOfBlocks = products.length;
  const dynamicClass = getDynamicClass(quantityOfBlocks);


  return (
    <div className={`${classes.topOffer} ${classes[dynamicClass]}`}>
      {products.map((product, index) => (
        <div key={index} className={`${classes.topOffer_Block} ${classes[dynamicClass]}`}>
          <div className={classes.topOffer_Block_Up}>
            <div className={classes.topOffer_Block_Up_Discount}>
              {/* {product.discount} */}
              Скидка 40%
            </div>
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
  );
};

export default TopOffer;
