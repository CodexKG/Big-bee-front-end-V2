import React from 'react';
import { Product } from 'types/types';
import classes from './TopOffer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface TopOfferProps {
  products: Product[];
}

const TopOffer: React.FC<TopOfferProps> = ({ products }) => {
  const getBlockSize = () => {
    const quantityOfBlocks = products.length;

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

  const blockSizes = getBlockSize();

  return (
    <div className={classes.topOffer}>
      {products.map((product, index) => (
        <div key={index} style={{ flex: blockSizes[index] }} className={classes.topOffer_Block}>
          <h3 className={classes.topOffer_Block_Title}>{product.title}</h3>
          <p className={classes.topOffer_Block_Price}>{`Price: $${product.price.toFixed(2)} ${product.currency}`}</p>
          <div className={classes.topOffer_Block_Image}>
            <img src={product.image} alt={product.title} />
          </div>
          <a className={classes.topOffer_Block_Link}>Перейти в каталог <FontAwesomeIcon icon={faCaretRight} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default TopOffer;
