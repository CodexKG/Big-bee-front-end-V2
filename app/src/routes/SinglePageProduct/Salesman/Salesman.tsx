import { FC, useEffect, useState } from "react";
import classes from './Salesman.module.scss';
import starIcon from '../icons/gold-star-icon.svg';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "store/hook";
import { getCookie } from "helpers/cookies";
import { Flex, message } from "antd";
import { delFavoriteProducts, getFavoriteProducts } from "store/reducers/favoritesReducers";
import { useNavigate } from "react-router-dom";
import { api } from "api";
import axios from "axios";
import { addCartItem, addLocalCartItem } from "store/reducers/cartRedusers";
import { SingleProduct } from "types/types";
import { CartProduct } from "store/models/CartTypes";
type props = {
  discount: string,
  oldPrice: string,
  currentPrice: string,
  selected: boolean,
  delivery_date: string,
  pickup_available: boolean,
  payment_method: string,
  review_count: number,
  average_rating: number,
  selectedProduct: SingleProduct
}

const Salesman: FC<props> = ({ discount, oldPrice, currentPrice, selected, delivery_date, pickup_available, payment_method, average_rating, review_count, selectedProduct }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.favorite)
  const [fav, setFav] = useState(false)
  const [fav_id, setFavId] = useState(0)
  const is_auth = getCookie('access_token')
  const navigate = useNavigate();
  const delFav = () => {
    dispatch(delFavoriteProducts({ id: fav_id }))
    setFav(!fav)
    message.open({
      type: "success",
      content: "Successfully deleted",
      onClick: () => navigate("/favorites"),
    });
  }
  const add_item = async () => {
    if (is_auth) {
      try {
        const cart_id = Number(getCookie('cart_id'))
        await dispatch(addCartItem({ cart: cart_id, product_id: selectedProduct.id, quantity: 1 }))
        message.open({
          type: "success",
          content: "Продукт добавлен в корзину",
          onClick: () => navigate("/cart"),
        });

      }
      catch {
        message.error('Не получилось добавить в корзинку')
      }
    } else {
      const cart_info: CartProduct = {
        id: selectedProduct.id,
        title: selectedProduct.title,
        description: selectedProduct.description,
        image: selectedProduct.product_images[0] ? selectedProduct.product_images[0].image : '',
        product_attributes: [{ key: "Основная камера", value: "48 Mpx + 12 Mpx + 12 Mpx" }],
        price: selectedProduct.price,
        old_price: selectedProduct.old_price,
        product_code: 12312,
      }
      await dispatch(addLocalCartItem({ cartItem: cart_info }))
    }
  }
  const onFavorites = async () => {
    if (!is_auth) {
      message.open({
        type: "error",
        content: "You are not logged in",
        onClick: () => navigate("/login"),
      });
    } else {
      try {
        const favorite = await api.addProductToFavorite(selectedProduct.id, +getCookie("user_id"));
        setFav(!fav)
        setFavId(favorite.data['id'])
        message.open({
          type: "success",
          content: "Successfully added",
          onClick: () => navigate("/favorites"),
        });
      } catch {
        setFav(true)

        message.open({
          type: "success",
          content: "Продукт уже в избранных",
          onClick: () => navigate("/favorites"),
        });
      }
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();

    dispatch(getFavoriteProducts({ cancelToken: source.token }))
  }, [])
  useEffect(() => {
    const is_fav = data.filter(function (obj) {
      return obj.product.id === selectedProduct.id;
    });
    if (is_fav.length != 0) {
      setFav(true)
      setFavId(is_fav[0].id)
    }
  }, [data])
  return (
    <div className={
      selected
        ? `${classes.salesman} ${classes.salesman_active}`
        : classes.salesman
    }>
      {
        discount
          ? <>
            <div className={classes.salesman_discount_row}>
              <p className={classes.salesman_discount_oldPrice}>{oldPrice}</p>
              <p className={classes.salesman_discount_text}>Скидка</p>

            </div>
            <div className={classes.salesman_discount_row}>
              <p className={classes.salesman_discount_current_price}>{currentPrice}</p>
              <p className={classes.salesman_discount_discount}>{discount}</p>
            </div>
          </>
          : <h3 className={classes.salesman_price}>{currentPrice}</h3>
      }

      <p className={classes.salesman_text}>{delivery_date}</p>
      <p className={classes.salesman_text}>
        {
          pickup_available === true ? <>Самовывоз завтра,
            <span className={classes.salesman_text_green}>бесплатно</span></> : <>
            недоступен,

          </>
        }

      </p>
      <p className={classes.salesman_payment}>{payment_method}</p>

      <div className={classes.salesman_icon_block}>
        <img className={classes.salesman_icon} src="https://klike.net/uploads/posts/2019-03/medium/1551512888_2.jpg" alt="" />
        <p className={classes.salesman_text}>Продавец</p>
      </div>

      <div className={classes.salesman_raiting}>
        <img src={starIcon} alt="" />
        <div className={classes.salesman_text}>
          {average_rating}
          <span className={classes.salesman_raiting_full}>/{review_count}</span>
        </div>
      </div>
      <Flex align="center" gap={5} className={classes.salesman_active_flex}>
        {
          selected
            ? <button onClick={() => add_item()} className={classes.salesman_active_btn}>Добавить в корзину</button>
            : ''
        }
        {
          fav ?
            <HeartFilled onClick={() => delFav()} className={classes.salesman_active_btn}></HeartFilled>
            :
            <HeartOutlined className={classes.salesman_active_btn} onClick={() => onFavorites()}></HeartOutlined>
        }
      </Flex>
    </div>

  )
}

export default Salesman;
