import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import classes from './SignUp.module.scss';
import { useAppDispatch } from 'store/hook';
import { registerAsync } from 'store/reducers/authRedusers';
import { fetchCartItems } from 'store/reducers/cartRedusers';
import logo from "../../assets/icon/logo.svg"

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await dispatch(registerAsync({ username: values.username, email: values.email, password: values.password, confirm_password: values.confirm_password }));
            await dispatch(fetchCartItems(response.payload.user_id))
            navigate('/login');
            message.success('Регистрация прошла успешно. Теперь вы можете войти в систему.');
        } catch (error) {
            message.error('Такой логин или email уже существует!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className={classes.auth_reg}>


            <div className={classes.form}>

                <div className={classes.icon}>
                    <img src={logo} alt="" />
                </div>

                <div className={classes.title}>
                    <h2>Создайте аккаунт!</h2>
                    <p>Пожалуйста, заполните эту форму, чтобы создать учетную запись.</p>
                </div>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }, {type: "string"}]}
                    >
                        <Input className={classes.input}  placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input className={classes.input} type='email' placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input type='password' className={classes.input} placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input type='password' className={classes.input} placeholder="Confirm Password" />
                    </Form.Item>


                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" className={classes.button} block>
                            SignUp
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>

    );
};

export default SignUp;