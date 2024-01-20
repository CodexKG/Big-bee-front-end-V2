import { TopOffer } from "Components";
import classes from "./MainPage.module.scss";
import { FC } from "react";
import exampleProducts from "Components/TopOffer/exampleProducts";

import {Promotion} from '../../Components/index'

const MainPage: FC = () => {
  return (
    <div className={classes.main}>
     <Promotion/>
      <TopOffer products={exampleProducts} />
    </div >
  );
};

export default MainPage;
