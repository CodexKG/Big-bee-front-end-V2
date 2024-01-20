import classes from "./MainPage.module.scss";
import { FC } from "react";
import { MainCaruselComponent, CompanyListComponent } from "Components";


const MainPage: FC = () => {



  return (
    <div className={classes.main}>
      <MainCaruselComponent/>
      <CompanyListComponent/>
    </div >
  );
};

export default MainPage;
