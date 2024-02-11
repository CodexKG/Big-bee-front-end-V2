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

            {/* <div className={classes.options_option}>
                <p className={classes.options_name}>Версия</p>
                <div className={classes.options_line}></div>
                <p className={classes.options_value}>для других стран</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Версия ОС на начало продаж</p>
                <div className={classes.options_line}></div>
                <p className={`${classes.options_value} ${classes.options_value_blue}`}>iOS 17</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Тип корпуса</p>
                <div className={classes.options_line}></div>
                <p className={classes.options_value}>классический</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Материал корпуса</p>
                <div className={classes.options_line}></div>
                <p className={classes.options_value}>алюминий и стекло</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Степень защиты</p>
                <div className={classes.options_line}></div>
                <p className={classes.options_value}>IP68</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Количество SIM-карт</p>
                <div className={classes.options_line}></div>
                <p className={`${classes.options_value} ${classes.options_value_blue}`}>Dual nano SIM</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Вес</p>
                <div className={classes.options_line}></div>
                <p className={classes.options_value}>171 г</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Размеры (ШxВxТ)</p>
                <div className={classes.options_line}></div>
                <p className={classes.options_value}>71.6x147.6x7.8 мм</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Дисплей</p>
                <div className={classes.options_line}></div>
                <p className={`${classes.options_value} ${classes.options_value_blue}`}>6.1" (2556x1179), OLED</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Особенности экрана</p>
                <div className={classes.options_line}></div>
                <p className={classes.options_value}>Dynamic Island, сенсорный экран</p>
            </div>
            <div className={classes.options_option}>
                <p className={classes.options_name}>Число пикселей на дюйм (PPI)</p>
                <div className={classes.options_line}></div>
                <p className={classes.options_value}>461</p>
            </div> */}

            <a href="#" className={classes.options_value_blue}>Все характеристики <img src={moreIcon} alt="" /></a>
            <p className={classes.options_text}>Перед покупкой уточняйте характеристики и комплектацию у продавца.</p>
            <a href="#" className={classes.options_complain}>Пожаловаться на товар</a>
        </div>
    )
}
export default Options;
