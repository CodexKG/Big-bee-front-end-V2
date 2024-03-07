import { FC } from "react";
import classes from './Options.module.scss';
import moreIcon from './SVG.svg';
import { useAppSelector } from "store/hook";

const Options: FC = () => {
    const { selectedProduct } = useAppSelector((state) => state.produckt)
    return (
        <div className={classes.options}>
            <h2 className={classes.options_title}>Характеристики</h2>
            {
                selectedProduct?.product_attributes.map((item) =>
                    <div className={classes.options_option}>
                        <p className={classes.options_name}>{item.key}</p>
                        <div className={classes.options_line}></div>
                        <p className={classes.options_value}>{item.value}</p>
                    </div>)
            }



            <a href="#" className={classes.options_value_blue}>Все характеристики <img src={moreIcon} alt="" /></a>
            <p className={classes.options_text}>Перед покупкой уточняйте характеристики и комплектацию у продавца.</p>
            <a href="#" className={classes.options_complain}>Пожаловаться на товар</a>
        </div>
    )
}
export default Options;
