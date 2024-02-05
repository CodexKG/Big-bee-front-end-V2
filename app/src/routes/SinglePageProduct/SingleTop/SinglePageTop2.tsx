import { FC } from "react";
import Salesman from "../Salesman/Salesman";
import singleClass from '../SinglePage.module.scss';
import classes from './SingleTop.module.scss';

const SinglePageTop2: FC = () => {
    return (
        <div >
            <Salesman
                discount="-14%"
                oldPrice="124 990"
                currentPrice="94 990 с"
                selected={true}
            />
            <Salesman
                discount="-14%"
                oldPrice="124 990"
                currentPrice="94 990 с"
                selected={false}
            />
            <Salesman
                discount=""
                oldPrice=""
                currentPrice="94 990 с"
                selected={false}
            />

            <a href="#" className={singleClass.singlePage_more_link}>Все 91 предложения</a>
        </div>
    )
}

export default SinglePageTop2;
