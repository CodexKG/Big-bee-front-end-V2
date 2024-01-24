import { Advantages, TopOffer } from "Components";
import classes from "./MainPage.module.scss";
import { FC } from "react";
import exampleProducts from "Components/TopOffer/exampleProducts";


const MainPage: FC = () => {
  return (
    <div className={classes.main}>
      hello
      <TopOffer products={exampleProducts} />
    </div >
  );
};

export default MainPage;
