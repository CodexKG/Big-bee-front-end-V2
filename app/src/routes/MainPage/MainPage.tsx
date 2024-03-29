import { Advantages } from "Components";
import { CategoryComponent, TopOffer } from "Components";
import classes from "./MainPage.module.scss";
import { FC } from "react";
import { MainCaruselComponent, CompanyListComponent } from "Components";
import { Promotion } from '../../Components/index'
import { api } from "api";
import Protected from "routes/Protected/Protected";



const MainPage: FC = () => {
  return (
    <div className={classes.main}>
      <MainCaruselComponent />.
      <CompanyListComponent />
      <TopOffer products_quantity={3} />
      <Advantages />
      <Promotion title="Акции и скидки" getCarts={api.getProductBestSellers} />
      <CategoryComponent />
      <Protected fallback={<div></div>}>
        <Promotion title="Специально для вас" getCarts={api.getForYouRandomProducts} />
      </Protected>
      <TopOffer products_quantity={2} />
      <Promotion title="Хиты продаж" getCarts={api.getPromotionRandomProducts} />

    </div >
  );
};

export default MainPage;
