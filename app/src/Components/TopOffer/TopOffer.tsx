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
  const productOfDay = useAppSelector((state) => state.produckt.productsDay);
  // const topOfferBlockCount = productOfDay.length || 0;


  const dynamicClass = getDynamicClass(3);


  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatch(fetchProductOfDay({ cancelToken: source.token }))
  }, []);

  console.log(productOfDay?.top_products);


  return (
    <div className={`${classes.topOffer} ${classes[dynamicClass]}`}>
      {productOfDay?.top_products.slice(0, 3).map((product, index) => (
        <div key={index} style={{position:"relative"}} className={`${classes.topOffer_Block} ${classes[dynamicClass]}`}>
          <div className={classes.topOffer_Block_Up}>
            <div className={classes.topOffer_Block_Up_Discount}>
              {/* Скидка {productOfDay.discount}% */}
              <p>Скидка - 45%</p>
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
            <div className={classes.topOffer_Block_Down_Image} style={{position:"absolute", bottom:"20px", right:"20px"}}>
              <img src={product.image} alt={product.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopOffer;
