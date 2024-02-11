import { FC } from "react";
import classes from './Col_1.module.scss';
import SinglePageTop from "../SingleTop/SinglePageTop";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Reviews from "../Reviews/Reviews";

const Col_1: FC = () => {
    return (
        <div className={classes.col_1}>
            <SinglePageTop />
            <Description />
            <Options />
            <Reviews />
        </div>
    )
}

export default Col_1;
