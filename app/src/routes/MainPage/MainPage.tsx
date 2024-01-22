import { TopOffer } from "Components";
import classes from "./MainPage.module.scss";
import { FC } from "react";

import { MainCaruselComponent, CompanyListComponent } from "Components";


import { Promotion } from '../../Components/index'
import exampleProducts from "Components/TopOffer/exampleProducts";

const MainPage: FC = () => {
  return (
    <div className={classes.main}>
      <MainCaruselComponent />
      <CompanyListComponent />
      <Promotion />
      <TopOffer products={exampleProducts} />


    </div >
  );
};

export default MainPage;
