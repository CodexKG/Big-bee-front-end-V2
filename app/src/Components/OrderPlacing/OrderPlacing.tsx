import React, { useEffect } from "react";
import classes from './OrderPlacing.module.scss';
import { Input, Button, Form, Radio, Checkbox, Modal, message } from "antd";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchCartItems } from "store/reducers/cartRedusers";
import { getCookie } from "helpers/cookies";
import axios from "axios";
import { api } from "api";

const OrderPlacing: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.cart)
    const [modal, contextHolder] = Modal.useModal();
    const user_id = Number(getCookie('user_id'));
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchCartItems({ id: user_id, cancelToken: source.token }));
    }, []);
    const bilingProduckts: any = []
    data.cart_items.forEach((item) => {
        bilingProduckts.push({
            product: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
        })
    })
    const countDown = () => {
        let secondsToGo = 5;
        const instance = modal.success({
            title: 'This is a notification message',
            content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            instance.update({
                content: `This modal will be destroyed after ${secondsToGo} second.`,
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            instance.destroy();
        }, secondsToGo * 1000);
    };


    const onFinish = async (values: any) => {
        try {
            await api.orders(
                {
                    "user": user_id,
                    "email": values.email,
                    "first_name": values.username,
                    "last_name": values.surname,
                    "phone": values.number,
                    "billing_receipt_type": values.billing_receipt_type,
                    "country": values.country,
                    "region": values.region,
                    "city": values.city,
                    "street": values.street,
                    "apartment": values.office,
                    "zip_code": values.index,
                    "note": values.note,
                    "billing_products": bilingProduckts
                }
            )
            countDown()
        } catch (error: any) {

            message.error('Ошибка входа. Пожалуйста, проверьте свои учетные данные.');
        }

    };



    const inputStyle = {
        height: '50px',
        borderRadius: '8px',
        background: '#EEEEEE',
        border: 'none'
    }
    const radioStyle = {
        width: "24px",
        height: "24px",
        background: '#EEEEEE',
        border: 'none'
    }
    const { TextArea } = Input;

    return (
        <section className={classes.order}>


            <div className={classes.conteiner}>
                <h2>Оформление заказа</h2>

                <div className={classes.flexConteiner}>

                    {/* Начало левой части верстки (Форма) */}

                    <Form
                        onFinish={onFinish}
                        name="complex-form"
                        className={classes.left}
                    >

                        <div className={classes.flexForm}>
                            <Form.Item className={classes.item}>
                                {/* первые 4 инпута */}
                                <div className={classes.input}>
                                    <h3>Личные данные</h3>
                                    <Form.Item
                                        name="username"
                                        style={{ marginBottom: 0 }}
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            style={inputStyle}
                                            className={classes.input1}
                                            placeholder="Имя"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item name="email" rules={[{ required: true }]}>
                                        <Input
                                            style={inputStyle}
                                            type="email"
                                            className={classes.input}
                                            placeholder="E-mail"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>
                            </Form.Item>

                            <Form.Item className={classes.item}>


                                <div className={classes.input}>
                                    <p className={classes.link}>У вас уже есть аккаунт? <Button className={classes.linkButton} type="link"><Link to={'/login'}>Войти</Link></Button></p>
                                    <Form.Item
                                        name="surname"
                                        style={{ marginBottom: 0 }}
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="Фамилия"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item
                                        name="number"
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="Телефон"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                            </Form.Item>
                        </div>

                        <h3>Способ доставки</h3>

                        <div className={classes.flexForm}>
                            <div className={classes.item}>
                                <Form.Item name="billing_receipt_type">
                                    <Radio.Group>
                                        <Radio  className={classes.radio} value="Доставка">Доставка курьером до двери</Radio>
                                        <Radio className={classes.radio} value="Самовывоз">Самовывоз из магазина</Radio>
                                        {/* <Radio className={classes.radio} value="postOffices">Кыргыз почтасы</Radio> */}
                                    </Radio.Group>
                                </Form.Item>
                            </div>

                            <div className={classes.item}>
                                <p>Ылдам-Экспресс, 3 дня - бесплатно</p>
                                <p>После 100% оплаты, бесплатно</p>
                                <p>Отделения и почтоматы</p>
                            </div>
                        </div>

                        {/* Второй 7 инпутов */}

                        <h3>Адрес доставки</h3>

                        <div className={classes.flexForm}>
                            <Form.Item className={classes.item}>

                                <div className={classes.input}>
                                    <Form.Item
                                        name="country"
                                        style={{ marginBottom: 0 }}
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="Страна"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item
                                        name="city"
                                        rules={[{ required: true }]}
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Input style={inputStyle}
                                            type="text"
                                            className={classes.input}
                                            placeholder="Город"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="office"
                                        rules={[{ required: true }]}>
                                        <Input style={inputStyle}
                                            type="text"
                                            className={classes.input}
                                            placeholder="Квартира/Офис"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>
                            </Form.Item>

                            <Form.Item className={classes.item}>

                                <div className={classes.input}>
                                    <Form.Item
                                        name="region"
                                        style={{ marginBottom: 0 }}
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="Край/Область/Регион"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="street"
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="Улица/Дом"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="index"
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="Индекс"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                            </Form.Item>
                        </div>

                        <Form.Item name="note">
                            <TextArea style={inputStyle} className={classes.item} rows={6} />
                        </Form.Item>

                        <h3>Способ оплаты</h3>

                        {/* Последине инпуты */}

                        <Form.Item name="radio-group">
                            <Radio.Group>
                                <Radio value="bankCard">Банковской картой</Radio>
                                <Radio value="PayPal">PayPal</Radio>
                                <Radio value="Visa">Visa/ MasterCard</Radio>
                                <Radio value="GooglePay">Google pay/ Apple pay</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <div className={classes.flexForm}>
                            <Form.Item className={classes.item}>

                                <div className={classes.input}>
                                    <Form.Item
                                        name="usernameCart"
                                        style={{ marginBottom: 0 }}
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="Фамилия и имя на карте"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item name="bankCard" rules={[{ required: true }]}>
                                        <Input style={inputStyle}
                                            type="numberCart"
                                            className={classes.input}
                                            placeholder="Номер банковской карты"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>
                            </Form.Item>

                            <Form.Item className={classes.item}>


                                <div className={classes.input}>
                                    <Form.Item
                                        name="idCart"
                                        style={{ marginBottom: 0 }}
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="ММ/ГГ"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item
                                        name="CVC/CVV"
                                        rules={[{ required: true }]}
                                    >
                                        <Input style={inputStyle}
                                            className={classes.input}
                                            placeholder="CVC/CVV"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>
                            </Form.Item>
                        </div>

                        <div className={classes.agreement}>
                            <Form.Item
                                style={{ marginBottom: '0' }}
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    Оформляя заказ, вы принимаете условия <a href="#/">Пользовательских соглашений</a> и даете согласие на обработку персональных данных согласно <a href="#/">Политике конфиденциальности.</a>
                                </Checkbox>
                            </Form.Item>
                        </div>


                        <Form.Item colon={false}>
                            <Button className={classes.button} type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Конец левой части верстки (Форма) */}

                    {/* Начало правой части верстки */}

                    <div className={classes.right}>

                        <h3>Ваш заказ</h3>
                        {
                            data.cart_items.map((item) => (
                                <div className={classes.flexConteiner}>
                                    <div className={classes.imgProduct}>
                                        <img src={item.product.image} alt="" />
                                    </div>

                                    <div className={classes.title}>
                                        <h3>
                                            {item.product.title}

                                        </h3>

                                        <span>Код товара: {item.product.product_code}</span>

                                        <p>Цвет товара: Цвет товара</p>

                                        <p>Количество: {item.quantity}</p>
                                    </div>
                                    <div className={classes.price}>
                                        <s>{item.product.price}</s>
                                        <h2>{item.product.old_price}</h2>
                                    </div>
                                </div>
                            ))
                        }





                    </div>

                    {/* Конец правой части верстки */}

                </div>

            </div >

            {contextHolder}
        </section >
    )
}

export default OrderPlacing;