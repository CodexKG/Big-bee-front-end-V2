import { Advantages } from "Components";
import { CategoryComponent, TopOffer } from "Components";
import classes from "./MainPage.module.scss";
import { FC } from "react";
import { MainCaruselComponent, CompanyListComponent } from "Components";
import { Promotion } from "../../Components/index";
import exampleProducts from "Components/TopOffer/exampleProducts";
import { api } from "api";
import Corset from "Components/Corset/Corset";

const MainPage: FC = () => {
  return (
    <div className={classes.main}>
      <MainCaruselComponent />
      <CompanyListComponent />
      <TopOffer products={exampleProducts} />
      <Advantages />
      <Corset>
        <Promotion
          title="Акции и скидки  "
          getCarts={api.getProductBestSellers}
        />
      </Corset>
      <CategoryComponent />
      <Corset>
        {" "}
        <Promotion
          title="Специально для вас"
          getCarts={api.getForYouRandomProducts}
        />
      </Corset>
      <TopOffer products={exampleProducts} />
      <Corset>
        <Promotion
          title="Хиты продаж"
          getCarts={api.getPromotionRandomProducts}
        />
      </Corset>
    </div>
  );
};

export default MainPage;
