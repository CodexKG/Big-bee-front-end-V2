import { FC } from "react";
import FavoritesProduct from "./FavoritesProduct/FavoritesProduct";
import Protected from "routes/Protected/Protected";
import classes from "./Favorites.module.scss";
import NoLogin from "./NoLogin/NoLogin";
import Corset from "Components/Corset/Corset";

const Favorites: FC = () => {
  return (
    <Corset>
      <div className={classes.favorites}>
        {/* <Title level={1}>Избранное</Title> */}
        hello world
        <Protected fallback={<NoLogin />}>
          <FavoritesProduct />
        </Protected>
      </div>
    </Corset>
  );
};

export default Favorites;