import { FC } from "react";
import classes from './ShortDescr.module.scss';
import { useAppSelector } from "store/hook";


const ShortDescr: FC = () => {
    const { selectedProduct } = useAppSelector((state) => state.produckt)
    return (
        <div className={classes.short}>
            <p className={classes.short_title}>Коротко о товаре</p>
            <div className={classes.short_config}>
                <p className={classes.short_name}>Код товара</p>
                <div className={classes.short_config_line}></div>
                <p className={classes.short_value_black}>{selectedProduct?.product_code}</p>
            </div>
            {
                selectedProduct?.product_attributes.map((item) => (
                    <div className={classes.short_config}>
                        <p className={classes.short_name}>{item.key}</p>
                        <div className={classes.short_config_line}></div>
                        <p className={classes.short_value}>{item.value}</p>
                    </div>
                ))
            }


            <div className={classes.short_links}>
                <p>
                    <a href="#" className={classes.short_value}>Подробнее</a>
                </p>
                <p>
                    <a href="#" className={classes.short_value}>Задать вопрос о товаре</a>
                </p>
                <p>
                    <a href="#" className={classes.short_value}>Все товары линейки Apple</a>
                </p>
                <p>
                    <a href="#" className={classes.short_value}>Все товары Apple</a>
                </p>
            </div>
        </div>
    )
}

export default ShortDescr;
