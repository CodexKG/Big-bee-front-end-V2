// Header.tsx
import React, { useEffect, useState } from 'react';
import { Button, Drawer, DrawerProps, Layout, Menu, Select, Space } from 'antd';
import classes from './Header.module.scss'
import logo from "../../assets/icon/logo.svg";
import { AppleOutlined, CloseOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'store/hook';
import axios from 'axios';
import { fetchCategories, fetchCategoriesById } from 'store/reducers/categoryReduser';
import { Categories } from 'types/types';
import { setHoveredItem } from 'store/slices/categorySlice';

const HeaderComponent: React.FC = () => {
    const { data, children } = useAppSelector((state) => state.category)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState<number>(1)

    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchCategories({ cancelToken: source.token, }))
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

    const handleMouseEnter = (key: string) => {
        const source = axios.CancelToken.source();
        if (!children[category]) {
            dispatch(fetchCategoriesById({ cancelToken: source.token, id: +key })).then((res: any) => {
                dispatch(setHoveredItem(res.payload));
            });
        }
        setCategory(+key);
    };
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
                    <Button style={{ color: 'black' }} type='primary'>Войти</Button>

                </div>
            </nav>
            <div className={classes.categories}>
                <Button onClick={!open ? showDrawer : onClose} className={classes.categories_btn} style={{ color: 'black !important' }} type="primary" icon={!open ? <UnorderedListOutlined /> : <CloseOutlined />} >
                    Каталог
                </Button>
                <ul>
                    {data.map((item: Categories) =>
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
                        defaultValue="EN"
                        style={{ width: 90 }}
                        bordered={false}
                        options={[
                            { value: "EN", label: "EN" },
                            { value: "RU", label: "RU" },
                            { value: "KG", label: "KG" },
                        ]}
                        className={classes.header_top_curens}
                    />
                </Space>
            </div>


            <div className={classes.test}>
                <div style={!open ? { height: '1px' } : { height: '100vh', opacity: '1' }} className={classes.all}>
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
                                        <li onMouseOver={() => handleMouseEnter(`${item.id}`)} key={item.id}><Button icon={<AppleOutlined />} className={classes.categoryItem} type="text">{item.title}</Button></li>
                                    )}
                                </ul>
                            </aside>
                            <main className={classes.openCategories_main}>
                                {children[category]?.subcategories?.map((item: Categories) =>
                                    <div className={classes.openCategories_main_item} key={item.id}>
                                        <h1>
                                            {item.title}
                                        </h1>
                                        <div>
                                            {
                                                item.subcategories.map((el: Categories) =>
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
