import classes from "./SubWithNews.module.scss"
import Input from 'antd/es/input/Input'
import { Form, Button } from 'antd'
import logo from "../../assets/icon/logo.svg"

type Props = {};

const SubWithNews: React.FC<Props> = () => {

    return (

        <section className={classes.container}>

            <div className={classes.cont}>

                <div className={classes.log}>
                    <img src={logo} alt="logotyp" />
                </div>

                <div className={classes.title}>
                    <p>Получайте самые интересные предложения первыми!</p>
                </div>

                <Form>
                    <Form.Item name="email">
                        <Input
                            required
                            placeholder='Email'
                            type='email'
                            size='large'
                            className={classes.input}
                        ></Input>

                        <Button
                            htmlType='submit'
                            className={classes.button}

                        >Отправить</Button>
                    </Form.Item>
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