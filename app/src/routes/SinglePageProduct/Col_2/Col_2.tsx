import { FC } from "react";
import classes from './Col_2.module.scss';
import SinglePageTop2 from "../SingleTop/SinglePageTop2";
import ADBlock from "../ADBlock/ADBlock";

const Col_2: FC = () =>{
    return (
        <div className={classes.col_2}>
            <SinglePageTop2 />
            <ADBlock />
        </div>
    )
}

export default Col_2;
