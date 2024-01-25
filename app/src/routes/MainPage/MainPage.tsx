<<<<<<< HEAD
import { Advantages, TopOffer } from "Components";
=======
import { CategoryComponent, TopOffer } from "Components";
>>>>>>> 3c97e0b50376800c60673ff5e3f59db125c690cd
import classes from "./MainPage.module.scss";
import { FC } from "react";
import { MainCaruselComponent, CompanyListComponent } from "Components";
import { Promotion } from '../../Components/index'
import exampleProducts, { productfff } from "Components/TopOffer/exampleProducts";



const MainPage: FC = () => {
  return (
    <div className={classes.main}>
      <MainCaruselComponent />
      <CompanyListComponent />
      <TopOffer products={exampleProducts} />
      <Promotion title="Акции и скидки" />
      <CategoryComponent />
      <Promotion title="Специально для вас" />
      <TopOffer products={productfff} />
      <Promotion title="Хиты продаж" />

    </div >
  );
};

export default MainPage;
