import { SubWithNews } from "Components";
import classes from "./MainPage.module.scss";
import { FC } from "react";



const MainPage: FC = () => {



  return (
    <div className={classes.main}>
      <SubWithNews />
      <br />
      <br />
    </div >
  );
};

export default MainPage;
