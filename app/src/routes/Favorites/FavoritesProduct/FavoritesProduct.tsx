import { FC, useEffect } from "react";
import classes from "./FavoritesProduct.module.scss";
import FavoritesCarusel from "../FavoritesCarusel/FavoritesCarusel";
import FavoritesEmpty from "../FavoritesEmpty/FavoritesEmpty";
import { useAppDispatch, useAppSelector } from "store/hook";
import { getFavoriteProducts } from "store/reducers/favoritesReducers";
import axios from "axios";

const FavoritesProduct: FC = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.favorite)
  const source = axios.CancelToken.source();
  useEffect(() => {
    dispatch(getFavoriteProducts({cancelToken:source.token}))
  }, []);
  return (
    <div className={classes.favoritesProduct}>
      {data.length === 0 ? (
        <FavoritesEmpty/>
      ) : (
        <FavoritesCarusel title='Избранное' data={data} status={status}/>
      )}
    </div>
  );
};

export default FavoritesProduct;