import React from "react";
import classes from './OrderPlacing.module.scss';
import { Input, Button, Form, Radio, Checkbox } from "antd";
import { Link } from 'react-router-dom';

const OrderPlacing: React.FC = () => {
    const onFinish = (values: any) => {
        console.log(values);
    };

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
                                            className={classes.input}
                                            placeholder="Имя"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item name="email" rules={[{ required: true }]}>
                                        <Input
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
                                    <p className={classes.link}>У вас уже есть аккаунт? <Button className={classes.linkButton} type="link"><Link to={'/register'}>Войти</Link></Button></p>
                                    <Form.Item
                                        name="surname"
                                        style={{ marginBottom: 0 }}
                                        rules={[{ required: true }]}
                                    >
                                        <Input
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
                                        <Input
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
                                <Form.Item name="radio-group">
                                    <Radio.Group>
                                        <Radio className={classes.radio} value="courier">Доставка курьером до двери</Radio>
                                        <Radio className={classes.radio} value="Pickup">Самовывоз из магазина</Radio>
                                        <Radio className={classes.radio} value="postOffices">Кыргыз почтасы</Radio>
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
                                        <Input
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
                                        <Input
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
                                        <Input
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
                                        <Input
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
                                        <Input
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
                                        <Input
                                            className={classes.input}
                                            placeholder="Индекс"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                            </Form.Item>
                        </div>

                        <Form.Item name="note">
                            <TextArea className={classes.item} rows={6} />
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
                                        <Input
                                            className={classes.input}
                                            placeholder="Фамилия и имя на карте"
                                            size="large"
                                        ></Input>
                                    </Form.Item>
                                </div>

                                <div className={classes.input}>
                                    <Form.Item name="email" rules={[{ required: true }]}>
                                        <Input
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
                                        <Input
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
                                        <Input
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

                        <div className={classes.flexConteiner}>
                            <div className={classes.imgProduct}>
                                <img src="https://m.media-amazon.com/images/I/619f09kK7tL._AC_UF1000,1000_QL80_.jpg" alt="" />
                            </div>

                            <div className={classes.title}>
                                <h3>
                                    Apple iPhone 15 256Gb Dual:
                                    nano SIM + eSIN, черный (new)
                                </h3>

                                <span>Код товара: 1445094</span>

                                <p>Цвет товара: Цвет товара</p>

                                <p>Количество: 1</p>
                            </div>
                            <div className={classes.price}>
                                <s>124 990</s>

                                <h2>94 990 с</h2>
                            </div>
                        </div>

                        <div className={classes.flexConteiner}>
                            <div className={classes.imgProduct}>
                                <img src="https://m.media-amazon.com/images/I/619f09kK7tL._AC_UF1000,1000_QL80_.jpg" alt="" />
                            </div>

                            <div className={classes.title}>
                                <h3>
                                    Apple iPhone 15 256Gb Dual:
                                    nano SIM + eSIN, черный (new)
                                </h3>

                                <span>Код товара: 1445094</span>

                                <p>Цвет товара: Цвет товара</p>

                                <p>Количество: 1</p>
                            </div>
                            <div className={classes.price}>
                                <s>124 990</s>

                                <h2>94 990 с</h2>
                            </div>
                        </div>

                        <div className={classes.flexConteiner}>

                            <ul className={classes.orderSum}>
                                <li className={classes.orderItem}>
                                    <div>Сумма заказа</div>
                                    <div></div>
                                    <div>249 980 с</div>
                                </li>
                                <li>
                                    <div>Скидка</div>
                                    <div></div>
                                    <div>- 60 000 с</div>
                                </li>
                                <li>
                                    <div>Доставка</div>
                                    <div></div>
                                    <div>0 с</div>
                                </li>
                                <li>
                                    <div>Итого к оплате</div>
                                    <div></div>
                                    <div><span className={classes.itog}>189 980 с</span></div>
                                </li>
                            </ul>

                        </div>

                    </div>

                    {/* Конец правой части верстки */}

                </div>

            </div>


        </section>
    )
}

export default OrderPlacing;