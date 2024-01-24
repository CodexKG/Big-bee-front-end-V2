import React from 'react';
import icon1 from "../../assets/icon/TopOffer/percent-icon.svg";
import icon2 from "../../assets/icon/TopOffer/express-car.svg";
import icon3 from "../../assets/icon/TopOffer/settings-icon.svg";
import icon4 from "../../assets/icon/TopOffer/card-icon.svg";
import classes from "./Advantages.module.scss"

const Advantages: React.FC = () => {
    return (
        <div className={classes.advantages}>
            <div className={classes.advantage}>
                <div className={classes.advantage_Image}>
                    <img src={icon1} alt="advantage" />
                </div>
                <h3>Авторизуйтесь, чтобы применить Бонусные рубли</h3>
            </div>
            <div className={classes.advantage}>
                <div className={classes.advantage_Image}>
                    <img src={icon2} alt="advantage" />
                </div>
                <h3>Экспресс-доставка от 2 часов</h3>
            </div>
            <div className={classes.advantage}>
                <div className={classes.advantage_Image}>
                    <img src={icon3} alt="advantage" />
                </div>
                <h3>30 дней на обмен возврат товара</h3>
            </div>
            <div className={classes.advantage}>
                <div className={classes.advantage_Image}>
                    <img src={icon4} alt="advantage" />
                </div>
                <h3>Система быстрых платежей</h3>
            </div>
        </div>
    );
};

export default Advantages;
