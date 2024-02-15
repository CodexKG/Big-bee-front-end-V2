import { FC, useEffect, useState } from "react";
import classes from "./FavoritesProduct.module.scss";
import FavoritesCarusel from "../FavoritesCarusel/FavoritesCarusel";
import { api } from "api";
import { getCookie,setCookie } from "helpers/cookies";
import FavoritesEmpty from "../FavoritesEmpty/FavoritesEmpty";

const FavoritesProduct: FC = () => {
  const [data, setData] = useState<any>();
  const getProducts = async () => {
    try {
      const data = await api.getFavoriteProducts();
      
      setData(data);
    } catch(error) {
      console.log('error fav',error);
      
      const response = await api.refreshToken()
      console.log(response);
      if(response.status>199 && response.status<300){
        setCookie('access_token', response.data.access, 30);
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className={classes.favoritesProduct}>
      {data?.results?.length === 0 ? (
        <FavoritesEmpty />
      ) : (
        <FavoritesCarusel title=" " getCarts={api.getFavoriteProducts} />

        // <Promotion title=" " getCarts={api.getProductBestSellers} />
      )}
    </div>
  );
};

export default FavoritesProduct;
