import { FC } from "react";
import classes from './ADBlock.module.scss';
import moreIcon from './more-icon.svg';

const ADBlock: FC = () =>{

    return(
        <div className={classes.adblock}>
            <a href="#" className={classes.adblock_link_blue}>Пожаловаться на описание товара</a>
            <a href="#" className={classes.adblock_link_blue}>Торговать на Маркете</a>

            <div className={`${classes.adblock_item} ${classes.adblock_item_black}`}>
                <div>
                <h2 className={classes.adblock_item_title}>HEADPHONES FOR A PRESENT</h2>
                <p className={classes.adblock_item_text}>Our most powerful chip in Apple Watch ever. A magical new way.</p>

                </div>

                <a href="#" className={classes.adblock_item_link}>
                Узнать подробнее
                    <img src={moreIcon} alt="" />
                </a>
                <img src="https://static.toiimg.com/thumb/msid-93905774,width-1280,height-720,resizemode-4/93905774.jpg" alt="" className={classes.adblock_item_img} />
            </div>

            <div className={`${classes.adblock_item} ${classes.adblock_item_purple}`}>
                <div>
                <h2 className={classes.adblock_item_title}>Умная колонка Яндекс.Станция Лайт</h2>
                <p className={`${classes.adblock_item_text} ${classes.adblock_item_text_white}`}>Умная колонка «Яндекс.Станция Лайт» – это компактное устройство, оснащенное голосовым помощником Алиса.</p>
                </div>

                <a href="#" className={classes.adblock_item_link}>
                Узнать подробнее
                    <img src={moreIcon} alt="" />
                </a>
                <img src="https://main-cdn.sbermegamarket.ru/big1/hlr-system/179/742/566/923/123/6/100052028893b0.png" alt="" className={classes.adblock_item_img} />
            </div>

            <div className={`${classes.adblock_item} ${classes.adblock_item_green}`}>
                <div>
                <h2 className={classes.adblock_item_title}>Смартфон Xiaomi 13
Ultra 12/512GB 5G</h2>
                <p className={`${classes.adblock_item_text} ${classes.adblock_item_text_white}`}>Xiaomi 13 Ultra — флагман, объединивший в себе передовую оптику, инновационные технологии, мощное «железо» и запоминающийся дизайн.</p>
                </div>

                <a href="#" className={classes.adblock_item_link}>
                Узнать подробнее
                    <img src={moreIcon} alt="" />
                </a>
                <img src="https://www.wondamobile.com/pub/media/catalog/product/cache/229c377c2cfbd966aed33983eeb919aa/x/i/xiaomi_13_ultra_green.png" alt="" className={classes.adblock_item_img} />
            </div>


        </div>
    )
}

export default ADBlock;
