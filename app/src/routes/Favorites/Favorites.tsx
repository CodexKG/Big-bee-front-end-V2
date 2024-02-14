import { FC } from "react";
import FavoritesEmpty from "./FavoritesEmpty/FavoritesEmpty";
import FavoritesProduct from "./FavoritesProduct/FavoritesProduct";
import Protected from "routes/Protected/Protected";
import classes from "./Favorites.module.scss";
import Title from "antd/es/typography/Title";
import NoLogin from "./NoLogin/NoLogin";
import { Corset } from "Components";

const Favorites: FC = () => {
  return (
    <Corset>
      <div className={classes.favorites}>
        <Title level={1}>Избранное</Title>
        <Protected fallback={<NoLogin />}>
          <FavoritesProduct />
        </Protected>
      </div>
    </Corset>
  );
};

export default Favorites;
