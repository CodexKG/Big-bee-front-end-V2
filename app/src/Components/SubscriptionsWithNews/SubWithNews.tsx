import classes from "./SubWithNews.module.scss"
import Input from 'antd/es/input/Input'
import { Form, Button, message } from 'antd'
import logo from "../../assets/icon/logo.svg"
import { useAppDispatch } from "store/hook"
import { getEmailAsync } from "store/reducers/getEmailReducer"

type Props = {};

const SubWithNews: React.FC<Props> = () => {

    const dispatch = useAppDispatch();


    const onFinish = (values: any) => {
        console.log('Success:', values);
        try {
            dispatch(getEmailAsync({ email: values.email }))
            message.success('Ваш email успешно принят, на вашу почту будут отправлятся новости!')
        } catch (error) {
            message.success('Упс, что то пошло не так!')
        }
    };

    return (

        <section className={classes.container}>

            <div className={classes.cont}>

                <div className={classes.log}>
                    <img src={logo} alt="logotyp" />
                </div>

                <div className={classes.title}>
                    <p>Получайте самые интересные предложения первыми!</p>
                </div>

                <Form
                    name="emailForm"
                    onFinish={onFinish}
                >

                    <div className={classes.flexFrom}>
                        <Form.Item name="email">
                            <Input
                                required
                                placeholder='Email'
                                type='email'
                                size='large'
                                className={classes.input}
                            ></Input>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType='submit' className={classes.button}>
                                Отправить
                            </Button>
                        </Form.Item>
                    </div>

                </Form>

                <div className={classes.text}>
                    <p>
                        Нажимая на кнопку, я соглашаюсь на обработку<Button className={classes.link} type="link" href="#/">персональных данных</Button>
                    </p>
                </div>

            </div>

        </section>
    )
}

export default SubWithNews