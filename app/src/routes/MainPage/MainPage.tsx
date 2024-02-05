import { Advantages } from "Components";
import { CategoryComponent, TopOffer } from "Components";
import classes from "./MainPage.module.scss";
import { FC } from "react";
import { MainCaruselComponent, CompanyListComponent } from "Components";
import { Promotion } from '../../Components/index'



const MainPage: FC = () => {
  return (
    <div className={classes.main}>
      <MainCaruselComponent />
      <CompanyListComponent />
      <TopOffer products_quantity={3} />
      <Advantages />
      <Promotion title="Акции и скидки" />
      <CategoryComponent />
      <Promotion title="Специально для вас" />
      <TopOffer products_quantity={2} />
      <Promotion title="Хиты продаж" />

    </div >
  );
};

export default MainPage;
