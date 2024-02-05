import { FC } from "react";
import classes from './ShortDescr.module.scss';


const ShortDescr: FC = () =>{

    return (
        <div className={classes.short}>
            <p className={classes.short_title}>Коротко о товаре</p>
            <div className={classes.short_config}>
            <p className={classes.short_name}>Код товара</p>
                <div className={classes.short_config_line}></div>
                <p className={classes.short_value_black}>102322338911</p>
            </div>

            <div className={classes.short_config}>
            <p className={classes.short_name}>Экран</p>
                <div className={classes.short_config_line}></div>
                <p className={classes.short_value}>6.1" (2556x1179) OLED</p>
            </div>

            <div className={classes.short_config}>
            <p className={classes.short_name}>Память</p>
                <div className={classes.short_config_line}></div>
                <p className={classes.short_value}>встроенная 128 ГБ</p>
            </div>

            <div className={classes.short_config}>
            <p className={classes.short_name}>Фото</p>
                <div className={classes.short_config_line}></div>
                <p className={classes.short_value}>двойная камера, основная 48 МП</p>
            </div>

            <div className={classes.short_config}>
            <p className={classes.short_name}>Процессор</p>
                <div className={classes.short_config_line}></div>
                <p className={classes.short_value}>Apple A16 Bionic</p>
            </div>

            <div className={classes.short_config}>
            <p className={classes.short_name}>SIM-карты</p>
                <div className={classes.short_config_line}></div>
                <p className={classes.short_value}>Dual nano SIM</p>
            </div>

            <div className={classes.short_config}>
            <p className={classes.short_name}>Операционная система</p>
                <div className={classes.short_config_line}></div>
                <p className={classes.short_value}>iOS 17</p>
            </div>

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
