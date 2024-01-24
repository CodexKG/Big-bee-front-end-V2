// Header.tsx
import React, { useEffect, useState } from 'react';
import { Button, Drawer, DrawerProps, Layout, Menu, Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss'
import logo from "../../assets/icon/logo.svg";
import { AppleOutlined, CloseOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'store/hook';
import axios from 'axios';
import { fetchCategories } from 'store/reducers/categoryReduser';
import { Categories } from 'types/types';
import { categoriesMack } from 'data/categories/navCategories';

const HeaderComponent: React.FC = () => {
    const { data } = useAppSelector((state) => state.category)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchCategories({ cancelToken: source.token, }));
        return () => {
            source.cancel('Запрос отменен, компонент размонтирован');
        };
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto' };
    }, [open]);


    return (

        <header className={classes.header}>

            <nav>
                <div>
                    <img height={40} src={logo} alt="" />
                </div>
                <ul>
                    <li>Стать продавцом</li>
                    <li>Покупать как компания</li>
                    <li>Помощь</li>
                </ul>
                <div className={classes.flex}>
                    <div>
                        <SearchOutlined style={{ fontSize: '24px' }} />
                        поиск
                    </div>
                    <HeartOutlined style={{ fontSize: '24px' }} />
                    <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                    <Button style={{ color: 'black' }} type='primary'><Link to={'/login'}>Войти</Link></Button>

                </div>
            </nav>
            <div className={classes.categories}>
                <Button onClick={!open ? showDrawer : onClose} className={classes.categories_btn} style={{ color: 'black !important' }} type="primary" icon={!open ? <UnorderedListOutlined /> : <CloseOutlined />} >
                    Каталог
                </Button>
                <ul>
                    {data.slice(0, 7).map((item: Categories) =>
                        <li key={item.id}>{item.title}</li>
                    )}
                </ul>
                <Space wrap>
                    <Select

                        defaultValue="USD"
                        style={{ width: 90 }}
                        bordered={false}
                        options={[
                            { value: "USD", label: "USD" },
                            { value: "KGC", label: "KGC" },
                            { value: "RUR", label: "RUR" },
                        ]}
                        className={classes.header_top_curens}
                    />
                    <Select
                        defaultValue="en"
                        style={{ width: 90 }}
                        bordered={false}
                        options={[
                            { value: "en", label: "en" },
                            { value: "ru", label: "ru" },
                            { value: "kg", label: "kg" },
                        ]}
                        className={classes.header_top_curens}
                    />
                </Space>
            </div>


            <div className={classes.test}>
                <div style={!open ? { height: '1px', opacity: '0' } : { height: '100vh', opacity: '1' }} className={classes.all}>
                    <Drawer
                        size={'large'}
                        placement={'top'}
                        closable={false}
                        onClose={onClose}
                        open={open}
                        height={'top'}
                        mask={false}
                        style={{ height: '100vh' }}
                        getContainer={false}

                    >

                        <main className={classes.openCategories}>
                            <aside className={classes.openCategories_sideBar}>
                                <ul>
                                    {data?.map((item: Categories) =>

                                        <li key={item.id}><Button icon={<AppleOutlined />} className={classes.categoryItem} type="text">{item.title}</Button></li>
                                    )}
                                </ul>
                            </aside>
                            <main className={classes.openCategories_main}>
                                {categoriesMack?.map((item: any) =>
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
                            </main>
                        </main>
                    </Drawer>
                </div>
            </div>
        </header>

    );
};

export default HeaderComponent;
