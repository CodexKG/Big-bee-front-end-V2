import { Footer } from "antd/es/layout/layout"
import { FC } from "react"
import classes from './FooterComponetn.module.scss'
import { FooterEl, categoriesMack } from "data/categories/navCategories"
import logoFooter from '../../assets/icon/logoFooter.svg'
import { Button, Form, Input } from "antd"
import { InstagramOutlined, PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons"
const FooterComponent: FC = () => {


    const onFinish = (values: any) => {
        console.log('Form submitted with values:', values);

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Form submission failed:', errorInfo);
    };
    return (
        <Footer className={classes.footer}>
            <div className={classes.wrapper}>
                <div className={classes.footer_right}>
                    <div>
                        <img src={logoFooter} height={63} alt="" />
                    </div>
                    <h1 className={classes.title}> Узнавайте первыми об акциях</h1>
                    <Form

                        name="footerForm"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className={classes.footer_form}
                    >


                        <Form.Item

                            name="input"
                            rules={[{ required: true, message: 'Please input something!' }]}
                        >
                            <Input className={classes.input} placeholder={"Email"} style={{ borderRadius: '5px', background: '#000', color: '#fff' }} />
                        </Form.Item>

                        <Form.Item >
                            <Button className={classes.button}>Отправить</Button>
                        </Form.Item>
                    </Form>
                    <h2>Нажимая на кнопку, я соглашаюсь на обработку персональных данных</h2>
                </div>
                <div className={classes.footer_navigation}>
                    {FooterEl?.map((item: any) =>
                        <div className={classes.openCategories_main_item} key={item.id}>
                            <h1>
                                {item.title}
                            </h1>
                            <div>
                                {
                                    item.subcategories.map((el: any) =>
                                        <p key={el.id}>
                                            {el.title}
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <br />
            <br />
            <footer className={classes.footer_bottom}>
                <div className={classes.footer_bottom_SM}>
                    <InstagramOutlined style={{ fontSize: '50px' }} />
                    <WhatsAppOutlined style={{ fontSize: '50px' }} />
                    <PhoneOutlined style={{ fontSize: '50px' }} />
                </div>
                <br /><br />
                <div className={classes.flex_justify}>
                    <p>© 2024 ООО «BIGBEE». Все права защищены.</p>
                    <div className={classes.flex}>
                        <p>Terms of Service</p>
                        <p>Privacy Policy</p>
                        <p>Made  by BIGBEE</p>
                    </div>
                </div>
            </footer>


        </Footer >
    )
}
export default FooterComponent