import classes from "./MainPage.module.scss";
import { FC } from "react";
import { CategoryComponent, MainCaruselComponent, CompanyListComponent } from "Components";


const MainPage: FC = () => {



  return (
    <div className={classes.main}>
      <MainCaruselComponent/>
      <CompanyListComponent/>
      <CategoryComponent />
    </div >
  );
};

export default MainPage;
