import { FC, useState } from "react";
import classes from './Reviews.module.scss';
import likeIcon from './like-icon.svg';
import dislikeIcon from './dislike-icon.svg';
import { useAppDispatch, useAppSelector } from "store/hook";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { fetchProductById } from "store/reducers/producRedusers";
import { Rate, Button, Modal, Form, Input, Flex, Card, Select, message } from 'antd';
import { fetchAddReview } from "store/reducers/reviewsReducers";
import { getCookie } from "helpers/cookies";
import TextArea from "antd/es/input/TextArea";
import Protected from "routes/Protected/Protected";
import { api } from "api";
import accessToken from "service";
interface FormValues {
    text: string;
    stars: number;
    advantages: string;
    disadvantages: string;
    term_of_use: string; // Added term_of_use field
}
const Reviews: FC = () => {
    const [isAll, setIsAll] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { selectedProduct } = useAppSelector((state) => state.produckt)

    const { id } = useParams();
    const [flag, setFlag] = useState(false);
    const [star, setStar] = useState(0);
    const product_id = Number(id)
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        term_of_use?: string;
        text?: string;
        disadvantages?: string;
        advantages?: string
    };

    const handleOkk = () => {
        const user_id = Number(getCookie('user_id'));
        if (isNaN(user_id)) {
            // Handle error - user ID is not available

            return
        }

        const source = axios.CancelToken.source();
        form
            .validateFields()
            .then((values: FormValues) => {
                dispatch(fetchAddReview({
                    user_id: user_id,
                    product_id: product_id,
                    text: values.text,
                    stars: star,
                    term_of_use: values.term_of_use,
                    disadvantages: values.disadvantages,
                    advantages: values.advantages,
                    cancelToken: source.token
                })).then(() => {
                    dispatch(fetchProductById({ id: Number(id), cancelToken: source.token }))
                })
                setIsModalOpen(false)

            })
            .catch((errorInfo) => {

                console.log('Validate Failed:', errorInfo);
            });
    };


    const onLike = async (idd: number) => {

        const source = axios.CancelToken.source();
        try {
            await api.addLike(idd)
            dispatch(fetchProductById({ id: Number(id), cancelToken: source.token }))
        } catch (error: any) {
            console.log();

            message.error(error?.response?.status === 401 ? (<Button onClick={() => navigate('/login')}>Авторизуйтесь</Button>) : 'error onLike')
        }

    }
    const onDisLike = async (idd: number) => {


        const source = axios.CancelToken.source();
        try {

            await api.adddislike(idd)
            dispatch(fetchProductById({ id: Number(id), cancelToken: source.token }))
        } catch (error: any) {
            console.log();

            message.error(error?.response?.status === 401 ? (<Button onClick={() => navigate('/login')}>Авторизуйтесь</Button>) : 'error onLike')
        }

    }
    const array = isAll === true ? selectedProduct?.product_reviews : selectedProduct?.product_reviews.slice(0, 3)

    return (
        <div className={classes.reviews}>
            {/* <h2 className={classes.reviews_title}>Товар у продавца</h2>
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
            </div> */}

            <h2 className={classes.reviews_title}>Товар на BIGBEE</h2>
            <div className={classes.reviews_raiting_block}>
                <h3 className={classes.reviews_raiting_num}>{selectedProduct?.average_rating}</h3>
                <div className={classes.reviews_raiting_block_right}>
                    {
                        selectedProduct?.average_rating ? <Rate style={{ marginLeft: '10px' }} defaultValue={selectedProduct.average_rating} disabled /> : ''
                    }

                    {/* <div className={classes.reviews_raiting_stars}>
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                        <img src={starIconBlack} alt="" />
                    </div> */}
                    <div className={classes.reviews_raiting_text}>
                        {/* 6 оценок */}
                        <span className={classes.reviews_raiting_text_circle}></span>
                        {selectedProduct?.review_count} отзыв
                    </div>
                </div>
            </div>
            {
                array?.length ?
                    array.map((el) => {
                        let like = el.count_like
                        let disLike = el.count_dislike


                        const dateClient: any = new Date(String(el.created_at));
                        const datenow: any = new Date();
                        const time = ((datenow - dateClient) / 1000 / 60 / 60 / 24).toFixed()
                        return (
                            <>
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
                                            Отзыв:
                                            <span className={classes.reviews_user_review_value}> {el.text}</span>
                                        </p>
                                        <p className={classes.reviews_user_review_name}>
                                            Достоинства:
                                            <span className={classes.reviews_user_review_value}> {el.advantages}</span>
                                        </p>
                                        <p className={classes.reviews_user_review_name}>
                                            Недостатки:
                                            <span className={classes.reviews_user_review_value}> {el.disadvantages}</span>
                                        </p>

                                        <div className={classes.reviews_user_review_block_bottom}>
                                            <div className={classes.reviews_user_review_item}>
                                                <p className={classes.reviews_user_review_text_grey}><p style={{ cursor: 'pointer' }} >
                                                    Комментировать
                                                </p>
                                                </p>
                                                <p className={classes.reviews_user_review_text_blue}>{time} дней назад</p>
                                            </div>

                                            <div className={classes.reviews_user_review_block_bottom_right}>
                                                <p>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </p>
                                                <button onClick={() => {

                                                    onLike(el.id)
                                                }}><img src={likeIcon} alt="" /> {el.count_like}</button>
                                                <button onClick={() => {

                                                    onDisLike(el.id)
                                                }}><img src={dislikeIcon} alt="" /> {el.count_dislike}</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )
                    }) : ''
            }

            <Modal style={{ borderRadius: '40px' }} title="Ваш коментарий" onOk={handleOkk} open={isModalOpen} onCancel={handleCancel} className={classes.flex}>

                <Form
                    name="basic"
                    form={form}
                    onFinish={handleOkk}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Card style={{ display: 'flex' }} >
                        <img width={100} src={selectedProduct?.image} alt="" />
                        {selectedProduct?.title}
                    </Card>
                    <br />
                    <br />
                    <Rate onChange={setStar} value={star} />
                    <p>Оцените товар:</p>



                    <Form.Item<FieldType>

                        name="text"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <TextArea style={{ padding: '10px' }} placeholder="Отзыв" />
                    </Form.Item>

                    <Form.Item
                        name="advantages"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input style={{ padding: '10px' }} placeholder="Достоинства" />
                    </Form.Item>

                    <Form.Item<FieldType>

                        name="disadvantages"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input style={{ padding: '10px' }} placeholder="Недостатки" />
                    </Form.Item>
                    <Form.Item name="term_of_use" rules={[{ required: true, message: 'Please select your agreement with the terms of use' }]}>
                        <Select style={{ height: '40px' }} placeholder="Select your agreement">
                            <Select.Option value="день">день</Select.Option>
                            <Select.Option value="неделю">неделю</Select.Option>
                            <Select.Option value="месяц">месяц</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <button onClick={() => {
                setFlag(true)
                setIsAll(!isAll)
            }} className={classes.reviews_more}> {isAll === false ? 'Показать все ' : 'скрыть'} отзывы на BIGBEE</button>
            <br />
            <br />
            <Protected fallback={<Button onClick={() => navigate('/login')} style={{ height: '50px', width: '100%', background: '#f5c423' }}>Авторизуйтесь чтобы оставить отзыв</Button>}>
                <Button onClick={showModal} style={{ height: '50px', width: '100%', background: '#f5c423' }}>Оставить отзыв</Button>
            </Protected>

        </div>
    )
}
export default Reviews;
