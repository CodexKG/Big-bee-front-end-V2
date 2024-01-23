import React from 'react';
import { Product } from 'types/types';
import classes from './TopOffer.module.scss';
import { CaretRightOutlined } from "@ant-design/icons"

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
  );
};

export default TopOffer;
