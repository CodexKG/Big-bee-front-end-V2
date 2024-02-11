import { FC } from "react";
import classes from './TopConfig.module.scss'


const TopConfig: FC = () =>{

    return (
        <div>
 <div className={classes.config_block}>
                                <p className={classes.config_title}>
                                Цвет товара:
                                    <span className={classes.config_value}> Черный</span>
                                </p>
                                <div className={classes.config_row}>
                                    <div
                                    className={
                                        `${classes.config_color} ${classes.config_color_active}`
                                    }
                                    >
                                        <div
                                        style={{background: '#4E4F53'}}
                                        className={classes.config_selected_color}></div>
                                    </div>
                                    <div
                                    style={{background: '#FFBFCB'}}
                                    className={classes.config_color}></div>
                                     <div
                                    style={{background: '#42AAFF'}}
                                    className={classes.config_color}></div>
                                     <div
                                    style={{background: '#008001'}}
                                    className={classes.config_color}></div>
                                </div>
                            </div>

                            <div className={classes.config_block}>
                                <p className={classes.config_title}>
                                Состояние товара:
                                    <span className={classes.config_value}> Новый</span>
                                </p>
                                <div className={classes.config_row}>
                                <button
                                    className={
                                        `${classes.config_btn} ${classes.config_btn_active}`
                                    }
                                    >Новый</button>
                                    <button className={classes.config_btn}>Уценка</button>
                                </div>
                            </div>

                            <div className={classes.config_block}>
                                <p className={classes.config_title}>
                                Конфигурация памяти:
                                    <span className={classes.config_value}> 128 ГБ</span>
                                </p>
                                <div className={classes.config_row}>
                                <button
                                    className={
                                        `${classes.config_btn} ${classes.config_btn_active}`
                                    }
                                    >128 ГБ</button>
                                    <button className={classes.config_btn}>256 ГБ</button>
                                    <button className={classes.config_btn}>512 ГБ</button>
                                </div>
                            </div>

                            <div className={classes.config_block}>
                                <p className={classes.config_title}>
                                Количество SIM-карт:
                                    <span className={classes.config_value}> Dual nano SIM</span>
                                </p>
                                <div className={classes.config_row}>
                                <button
                                    className={
                                        `${classes.config_btn} ${classes.config_btn_active}`
                                    }
                                    >Dual nano SIM</button>
                                    <button className={classes.config_btn}>Dual еSIM</button>
                                    <button className={classes.config_btn}>Dual: nano SIM + eSIM</button>
                                </div>
                            </div>

        </div>
    )
}


export default TopConfig;
