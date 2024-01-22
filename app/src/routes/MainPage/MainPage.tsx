import { TopOffer } from "Components";
import classes from "./MainPage.module.scss";
import { FC } from "react";
import exampleProducts from "Components/TopOffer/exampleProducts";

import { Promotion } from '../../Components/index'
import Protected from "routes/Protected/Protected";

const MainPage: FC = () => {
  const foolBackComponent = <div>Your fallback content</div>;

  return (
    <div className={classes.main}>
      <TopOffer products={exampleProducts} />
      <Promotion title="Акции и скидки" />
      <Promotion title="Специально для вас" />
      <Promotion title="Хиты продаж" />



    </div >
  );
};

export default MainPage;
