import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './TopOffer.module.scss';
import { CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'store/hook';
import axios, { CancelToken } from 'axios';
import { fetchProductOfDay } from 'store/reducers/producRedusers';

const getDynamicClass = (quantityOfBlocks: number) => {
  if (quantityOfBlocks >= 1 && quantityOfBlocks <= 4) {
    return `x${quantityOfBlocks}`;
  }

  return 'default';
};

const TopOffer: React.FC = () => {
  const dispatch = useAppDispatch();
  const productOfDay = useAppSelector((state) => state.produckt.selectedProduct);
  // const topOfferBlockCount = productOfDay.length || 0;

  const dynamicClass = getDynamicClass(4);
  const source = axios.CancelToken.source();
  console.log(productOfDay);


  useEffect(() => {
      dispatch(fetchProductOfDay({ cancelToken: source.token }))
  }, [dispatch, source]);

  return (
    <div className={`${classes.topOffer} ${classes[dynamicClass]}`}>
      {productOfDay && (
        <div className={`${classes.topOffer_Block} ${classes[dynamicClass]}`}>
          <div className={classes.topOffer_Block_Up}>
            <div className={classes.topOffer_Block_Up_Discount}>
              {/* Скидка {productOfDay.discount}% */}
            </div>
            <h3 className={classes.topOffer_Block_Up_Title}>{productOfDay.title}</h3>
            <p className={classes.topOffer_Block_Up_Price}>
              {`Price: $${productOfDay.price.toFixed(2)} ${productOfDay.currency}`}
            </p>
          </div>
          <div className={classes.topOffer_Block_Down}>
            <a className={classes.topOffer_Block_Down_Link}>
              Перейти в каталог <CaretRightOutlined />
            </a>
            <div className={classes.topOffer_Block_Down_Image}>
              <img src={productOfDay.image} alt={productOfDay.title} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopOffer;
