import { Footer } from "antd/es/layout/layout"
import { FC, useEffect, useState } from "react"
import classes from './FooterComponent.module.scss'
import { FooterEl, categoriesMack } from "data/categories/navCategories"
import logoFooter from '../../assets/icon/logoFooter.svg'
import instagramLogo from "../../assets/icon/instagram.svg";
import telegramLogo from "../../assets/icon/telegram.svg";
import whatsappLogo from "../../assets/icon/whatsapp.svg";
import { Button, Form, Input } from "antd"
import { useAppDispatch, useAppSelector } from "store/hook"
import { useNavigate } from "react-router-dom"
import { setFilters } from "store/slices/WindowSlice"
import { Categories } from "types/types"
import HeaderSceleton from "Components/Skeleton/HeaderSkeleton"
import { fetchCategoriesById } from "store/reducers/categoryReduser"
import { setHoveredItem } from "store/slices/categorySlice"
import axios from "axios"

const FooterComponent: FC = () => {
    const { data, children, status } = useAppSelector((state) => state.category)
    const [category, setCategory] = useState<number>(1)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onFinish = (values: any) => {
        console.log('Form submitted with values:', values);

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Form submission failed:', errorInfo);
    };
    const handleMouseEnter = (key: string) => {
        const source = axios.CancelToken.source();
        if (!children[category]) {
            dispatch(fetchCategoriesById({ cancelToken: source.token, id: +key })).then((res: any) => {
                dispatch(setHoveredItem(res.payload));
            });
        }
        setCategory(+key);
    };
    useEffect(() => {
        handleMouseEnter(`83`)
    }, [])
    const subCateoryList = {
        'succeeded': children[category]?.subcategories?.slice(0, 4).map((item: Categories) =>
            <div key={item.id}>
                <h1 onClick={() => {
                    dispatch(setFilters({ category: item.id }))
                    navigate(`/catalog/${item.id}`)

                }}>
                    {item.title}
                </h1>
                <div>
                    {item.subcategories.map((el: Categories) =>

                        <p onClick={() => {
                            dispatch(setFilters({ category: el.id }))
                            navigate(`/catalog/${el.id}`)

                        }} key={el.id}>{el.title}</p>

                    )}
                </div>
            </div >
        ),
        'pending': <HeaderSceleton />,
        'idle': <HeaderSceleton />,
        'failed': 'samthing went wrong'

    }
    return (
        <Footer className={classes.footer}>
            <div className={classes.wrapper}>
                <div className={classes.footer_left}>
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
                    {subCateoryList[status]}
                </div>
            </div>
            <footer className={classes.footer_bottom}>
                <div className={classes.footer_bottom_SM}>
                    <img src={instagramLogo} height={40} alt="instagramLogo" />
                    <img src={telegramLogo} height={40} alt="telegramLogo" />
                    <img src={whatsappLogo} height={40} alt="whatsappLogo" />
                </div>
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