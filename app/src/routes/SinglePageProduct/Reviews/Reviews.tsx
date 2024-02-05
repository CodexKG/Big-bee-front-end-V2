import { FC } from "react";
import classes from './Reviews.module.scss';
import starIconBlack from './black-star.svg';
import starIconGold from './gold-star-icon.svg';
import likeIcon from './like-icon.svg';
import dislikeIcon from './dislike-icon.svg';

const Reviews: FC = () => {

    return (
        <div className={classes.reviews}>
            <h2 className={classes.reviews_title}>Товар у продавца</h2>
            <div className={classes.reviews_raiting_block}>
                <h3 className={classes.reviews_raiting_num}>5.0</h3>
                <div className={classes.reviews_raiting_block_right}>
                    <div className={classes.reviews_raiting_stars}>
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                    </div>
                    <div className={classes.reviews_raiting_text}>
                        6 оценок
                        <span className={classes.reviews_raiting_text_circle}></span>
                        1 отзыв
                    </div>
                </div>
            </div>

            <h2 className={classes.reviews_title}>Товар на BIGBEE</h2>
            <div className={classes.reviews_raiting_block}>
                <h3 className={classes.reviews_raiting_num}>4.9</h3>
                <div className={classes.reviews_raiting_block_right}>
                    <div className={classes.reviews_raiting_stars}>
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                    </div>
                    <div className={classes.reviews_raiting_text}>
                        6 оценок
                        <span className={classes.reviews_raiting_text_circle}></span>
                        925 отзыв
                    </div>
                </div>
            </div>

            <div className={classes.reviews_user_review}>
                <img src="https://pic10.kidstaff.com.ua/pictures_user/776/1934498/33194988/1934498_20221217013252_4049_600x600.jpg" className={classes.reviews_user_review_img} alt="" />

                <div className={classes.reviews_user_review_block}>
                    <p className={classes.reviews_user_review_name}>Эля</p>
                    <div className={classes.reviews_user_review_item}>
                        <span>
                            <img src={starIconGold} alt="" />
                            <img src={starIconGold} alt="" />
                            <img src={starIconGold} alt="" />
                            <img src={starIconGold} alt="" />
                            <img src={starIconGold} alt="" />
                        </span>
                        <p className={classes.reviews_user_review_text_grey}>Куплен на BIGBEE</p>
                        <p className={classes.reviews_user_review_text_blue}>Товар продавца 2DROIDA</p>
                    </div>
                    <p className={classes.reviews_user_review_name}>
                    Опыт использования:
                        <span className={classes.reviews_user_review_value}> менее месяца</span>
                    </p>
                    <p className={classes.reviews_user_review_name}>
                    Достоинства:
                        <span className={classes.reviews_user_review_value}> классный, оригинальный, дали гарантию</span>
                    </p>
                    <p className={classes.reviews_user_review_name}>
                    Недостатки:
                        <span className={classes.reviews_user_review_value}> -</span>
                    </p>

                        <div className={classes.reviews_user_review_block_bottom}>
                        <div className={classes.reviews_user_review_item}>
                    <p className={classes.reviews_user_review_text_grey}>Комментировать</p>
                        <p className={classes.reviews_user_review_text_blue}>5 дней назад, Ош</p>
                    </div>

                    <div className={classes.reviews_user_review_block_bottom_right}>
                        <p>
                            <span></span>
                            <span></span>
                            <span></span>
                        </p>
                        <button><img src={likeIcon} alt="" /> 0</button>
                        <button><img src={dislikeIcon} alt="" /> 0</button>
                    </div>
                        </div>

                </div>
            </div>

<button className={classes.reviews_more}>Показать все отзывы на BIGBEE </button>
        </div>
    )
}
export default Reviews;
