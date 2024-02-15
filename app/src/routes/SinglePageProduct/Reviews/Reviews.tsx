import { FC, useState } from "react";
import classes from './Reviews.module.scss';
import starIconBlack from './black-star.svg';
import likeIcon from './like-icon.svg';
import dislikeIcon from './dislike-icon.svg';
import { useAppDispatch, useAppSelector } from "store/hook";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { fetchProductById } from "store/reducers/producRedusers";
import { Rate, Button, Modal, Form, Input, Flex } from 'antd';
import { fetchAddReview } from "store/reducers/reviewsReducers";
import { getCookie } from "helpers/cookies";

const Reviews: FC = () => {

    const dispatch = useAppDispatch();
    const { selectedProduct } = useAppSelector((state) => state.produckt)
    const { id } = useParams();
    const [flag, setFlag] = useState(false);
    const [star, setStar] = useState(0);
    const product_id = Number(id)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        const user_id = Number(getCookie('user_id'));
        const source = axios.CancelToken.source();
        dispatch(fetchAddReview({ user_id: user_id, product_id: product_id, text: values.text, stars: star, term_of_use: values.term_of_use, disadvantages: values.disadvantages, cancelToken: source.token }))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        term_of_use?: string;
        text?: string;
        disadvantages?: string;
    };


    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchProductById({ id: Number(id), cancelToken: source.token }))
    }, [id]);

    return (
        <div className={classes.reviews}>
            <h2 className={classes.reviews_title}>Товар у продавца</h2>
            {
                selectedProduct?.product_reviews.length ?
                    selectedProduct?.product_reviews.map((el) => {
                        const dateClient: any = new Date(String(el.created_at));
                        const datenow: any = new Date();
                        const time = ((datenow - dateClient) / 1000 / 60 / 60 / 24).toFixed()
                        return (
                            <>
                                <div key={el.id} className={classes.reviews_raiting_block}>
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
                                        <p className={classes.reviews_user_review_name}>{el.username}</p>
                                        <div className={classes.reviews_user_review_item}>
                                            <span>
                                                <Rate disabled defaultValue={el.stars} />
                                            </span>
                                            <p className={classes.reviews_user_review_text_grey}>Куплен на BIGBEE</p>
                                            <p className={classes.reviews_user_review_text_blue}>Товар продавца 2DROIDA</p>
                                        </div>
                                        <p className={classes.reviews_user_review_name}>
                                            Опыт использования:
                                            <span className={classes.reviews_user_review_value}> {el.term_of_use}</span>
                                        </p>
                                        <p className={classes.reviews_user_review_name}>
                                            Достоинства:
                                            <span className={classes.reviews_user_review_value}> {el.text}</span>
                                        </p>
                                        <p className={classes.reviews_user_review_name}>
                                            Недостатки:
                                            <span className={classes.reviews_user_review_value}> {el.disadvantages}</span>
                                        </p>

                                        <div className={classes.reviews_user_review_block_bottom}>
                                            <div className={classes.reviews_user_review_item}>
                                                <p className={classes.reviews_user_review_text_grey}><Button type="primary" onClick={showModal}>
                                                    Комментировать
                                                </Button>

                                                    <Modal title="Ваш коментарий" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700} className={classes.flex}>
                                                        <Form
                                                            name="basic"
                                                            labelCol={{ span: 8 }}
                                                            wrapperCol={{ span: 14 }}
                                                            onFinish={onFinish}
                                                            onFinishFailed={onFinishFailed}
                                                            autoComplete="off"
                                                        >

                                                            <Flex gap="middle" vertical>
                                                                <p>Оцените товар:</p>
                                                                <Rate onChange={setStar} value={star} />
                                                            </Flex>


                                                            <Form.Item<FieldType>
                                                                label="Опыт использования"
                                                                name="term_of_use"
                                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                            >
                                                                <Input />
                                                            </Form.Item>

                                                            <Form.Item<FieldType>
                                                                label="Достоинства"
                                                                name="text"
                                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                            >
                                                                <Input />
                                                            </Form.Item>

                                                            <Form.Item<FieldType>
                                                                label="Недостатки"
                                                                name="disadvantages"
                                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                            >
                                                                <Input />
                                                            </Form.Item>

                                                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                                <Button type="primary" htmlType="submit">
                                                                    Submit
                                                                </Button>
                                                            </Form.Item>
                                                        </Form>
                                                    </Modal>


                                                </p>
                                                <p className={classes.reviews_user_review_text_blue}>{time} дней назад</p>
                                            </div>

                                            <div className={classes.reviews_user_review_block_bottom_right}>
                                                <p>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </p>
                                                <button><img src={likeIcon} alt="" /> {el.count_like}</button>
                                                <button><img src={dislikeIcon} alt="" /> {el.count_dislike}</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )
                    }) : ''
            }

            <button onClick={() => setFlag(true)} className={classes.reviews_more}>Показать все отзывы на BIGBEE</button>
        </div>
    )
}
export default Reviews;
