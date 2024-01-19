import classes from "./MainPage.module.scss";
import { FC } from "react";
import {Promotion} from '../../Components/index'


const MainPage: FC = () => {



  return (
    <div className={classes.main}>
      
      <Promotion/>
      <div style={{ height: '100vh' }}></div>
    </div >
  );
};

export default MainPage;
