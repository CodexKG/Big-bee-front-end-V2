import { FC } from "react";
import classes from './ADBlock.module.scss';
import moreIcon from './more-icon.svg';
import { useAppSelector } from "store/hook";

const ADBlock: FC = () => {

    const { data } = useAppSelector((state) => state.baner)
    return (
        <div className={classes.adblock}>
            <a href="#" className={classes.adblock_link_blue}>Пожаловаться на описание товара</a>
            <a href="#" className={classes.adblock_link_blue}>Торговать на Маркете</a>
            {
                data.slice(0, 3).map((item) =>
                    <div style={{ backgroundImage: `url(${item.image})` }} className={`${classes.adblock_item} ${classes.adblock_item_purple}`}>
                        <div>
                            <h2 className={classes.adblock_item_title}>{item.title}</h2>
                            <p className={`${classes.adblock_item_text} ${classes.adblock_item_text_white}`}>{item.description}</p>
                        </div>
                        <a href={item.url} className={classes.adblock_item_link}>
                            Узнать подробнее
                            <img src={moreIcon} alt="" />
                        </a>
                    </div>
                )
            }
        </div>
    )
}

export default ADBlock;
