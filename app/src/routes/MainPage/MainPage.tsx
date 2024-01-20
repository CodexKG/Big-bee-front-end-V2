import classes from "./MainPage.module.scss";
import { FC } from "react";
import {Promotion} from '../../Components/index'


const MainPage: FC = () => {



  return (
    <main className={classes.main}>
      <Promotion/>
    </main >
  );
};

export default MainPage;
