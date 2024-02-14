import { FC, useEffect, useState } from "react";
import classes from "./FavoritesProduct.module.scss";
import FavoritesCarusel from "../FavoritesCarusel/FavoritesCarusel";
import { api } from "api";
import { getCookie } from "helpers/cookies";
import FavoritesEmpty from "../FavoritesEmpty/FavoritesEmpty";

const FavoritesProduct: FC = () => {
  const accessToken = getCookie("access_token");
  const [data, setData] = useState<any>();
  const getProducts = async () => {
    console.log(accessToken);
    
    const data = await api.getFavoriteProducts(accessToken);  
    console.log(data);
    
    setData(data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className={classes.favoritesProduct}>
      {data?.results?.length === 0 ? (
        <FavoritesEmpty/>
      ) : (
        <FavoritesCarusel title=' ' getCarts={api.getProductBestSellers}/>
        
        // <Promotion title=" " getCarts={api.getProductBestSellers} />
      )}
    </div>
  );
};

export default FavoritesProduct;
