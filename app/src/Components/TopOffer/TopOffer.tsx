import React, { useEffect } from 'react';
import classes from './TopOffer.module.scss';
import { CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'store/hook';
import axios, { CancelToken } from 'axios';
import { fetchProductOfDay } from 'store/reducers/producRedusers';

interface TopOfferProps {
  products_quantity: number;
}

const getDynamicClass = (quantityOfBlocks: number) => {
  if (quantityOfBlocks >= 1 && quantityOfBlocks <= 4) {
    return `x${quantityOfBlocks}`;
  }
  return 'default';
};

const getDiscount = (newPrice: number, oldPrice: number) => {
  const parsedNewPrice = parseFloat(newPrice.toFixed(2));
  const parsedOldPrice = parseFloat(oldPrice.toFixed(2));

  return 100 - (parsedNewPrice * 100 / parsedOldPrice);
}


const TopOffer: React.FC<TopOfferProps> = ({ products_quantity }) => {
  const dispatch = useAppDispatch();
  const productOfDay = useAppSelector((state) => state.produckt.productsDay);

  const dynamicClass = getDynamicClass(products_quantity);



  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatch(fetchProductOfDay({ cancelToken: source.token }))
  }, []);

  console.log(productOfDay?.top_products);


  return (
    <div className={`${classes.topOffer} ${classes[dynamicClass]}`}>
      {productOfDay?.top_products.slice(0, products_quantity).map((product, index) => (
        <div key={index} style={{ position: "relative" }} className={`${classes.topOffer_Block} ${classes[dynamicClass]}`}>
          <div className={classes.topOffer_Block_Up}>
            <div className={classes.topOffer_Block_Up_Discount}>
              <p>Скидка - {getDiscount(product.price, product.old_price ).toFixed(0)}%</p>

            </div>
            <h3 className={classes.topOffer_Block_Up_Title}>{product.title}</h3>
            <p className={classes.topOffer_Block_Up_Price}>
              {`${product.price} ${product.currency}`}
              <span className={classes.topOffer_Block_Up_Price_Old}>
                {`${product.old_price}`}
              </span>

            </p>
          </div>
          <div className={classes.topOffer_Block_Down}>
            <a className={classes.topOffer_Block_Down_Link}>
              Перейти в каталог <CaretRightOutlined />
            </a>
            <div className={classes.topOffer_Block_Down_Image} style={{ position: "absolute", bottom: "20px", right: "20px" }}>
              <img src={product.image} alt={product.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopOffer;
