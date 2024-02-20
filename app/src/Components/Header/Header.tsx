// Header.tsx
import React, { useEffect, useState } from 'react';
import { Button, Drawer, DrawerProps, Layout, Menu, Select, Skeleton, Space } from 'antd';
import classes from './Header.module.scss'
import logo from "../../assets/icon/logo.svg";
import { AppleOutlined, CloseOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'store/hook';
import axios from 'axios';
import { fetchCategories, fetchCategoriesById } from 'store/reducers/categoryReduser';
import { Categories } from 'types/types';
import { setHoveredItem } from 'store/slices/categorySlice';
import { Link, useNavigate } from 'react-router-dom';
import HeaderSceleton from 'Components/Skeleton/HeaderSkeleton';
import { clearFilters, setFilters } from 'store/slices/WindowSlice';
import Promotion from 'Components/Promotion/Promotion';
import Protected from 'routes/Protected/Protected';
import accessToken from 'service';
import { deleteCookie, getCookie } from 'helpers/cookies';

const HeaderComponent: React.FC = () => {
    const { data, children, status } = useAppSelector((state) => state.category)
    const navigate = useNavigate()
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

    const subCateoryList = {
        'succeeded': children[category]?.subcategories?.map((item: Categories) =>
            <div className={classes.openCategories_main_items_item} key={item.id}>
                <h1 onClick={() => {
                    dispatch(clearFilters({ id: Number(item.id) }))
                    dispatch(setFilters({ category: item.id }))
                    navigate(`/catalog/${item.id}`)
                    onClose()
                }}>
                    {item.title}
                </h1>
                <div>
                    {item.subcategories.map((el: Categories) =>

                        <p onClick={() => {
                            dispatch(clearFilters({ id: Number(item.id) }))
                            dispatch(setFilters({ category: el.id }))
                            navigate(`/catalog/${el.id}`)
                            onClose()
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

        <header className={classes.header}>

            <nav>
                <div onClick={() => navigate('/')}>
                    <img height={40} src={logo} alt="" />
                </div>
                <ul >
                    <Protected fallback={<Link style={{ color: 'black' }} to={`http://localhost:3000/login`}>
                        <li>Стать продавцом</li>
                    </Link>}>
                        <Link style={{ color: 'black' }} to={`http://localhost:3000`}>
                            <li>Стать продавцом</li>
                        </Link>

                    </Protected>

                    <li>Покупать как компания</li>
                    <li>Помощь</li>
                </ul>
                <div className={classes.flex}>
                    <div>
                        <SearchOutlined style={{ fontSize: '24px' }} />
                        поиск
                    </div>
                    <Link to={'/favorites'} style={{ color: 'black' }}  > <HeartOutlined style={{ fontSize: '24px' }} /></Link>
                    <Link style={{ color: 'black' }} to={'/cart'}><ShoppingCartOutlined style={{ fontSize: '24px' }} /></Link>
                    <Protected fallback={<Button style={{ color: 'black' }} type='primary'><Link to={'/login'}>Войти</Link></Button>}>

                        <Button onClick={() => {
                            deleteCookie('access_token')
                            deleteCookie('user_id')
                            navigate('/login')
                        }} style={{ color: 'black' }} type='primary'>Выйти</Button>
                    </Protected>

                </div>
            </nav>
            <div className={classes.categories}>
                <Button onClick={!open ? showDrawer : onClose} className={classes.categories_btn} style={{ color: 'black !important' }} type="primary" icon={!open ? <UnorderedListOutlined /> : <CloseOutlined />} >
                    Каталог
                </Button>
                <ul>
                    {data.slice(0, 5).map((item: Categories) =>
                        <li onClick={() => {
                            dispatch(clearFilters({ id: Number(item.id) }))
                            navigate(`/catalog/${item.id}`)
                        }} style={{ cursor: 'pointer' }} key={item.id}>{item.title}</li>
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
                        style={{ height: '100vh', padding: '0px 65px' }}
                        getContainer={false}

                    >
                        <main className={classes.openCategories}>
                            <aside className={classes.openCategories_sideBar}>
                                <ul>
                                    {data?.map((item: Categories) =>
                                        <li onMouseOver={() => handleMouseEnter(`${item.id}`)} key={item.id}>

                                            <Button icon={<img width={24} height={24} src={`${item.icon}`} />} className={classes.categoryItem} type="text">
                                                {item.title}
                                            </Button>

                                        </li>
                                    )}
                                </ul>
                            </aside>
                            <div className={classes.openCategories_main}>
                                <h1>
                                    {status === 'pending' ? <Skeleton.Input active size={'large'} /> : children[category]?.title}
                                </h1>
                                <main className={classes.openCategories_main_items}>
                                    {subCateoryList[status]}
                                </main>
                            </div>

                        </main>
                    </Drawer>
                </div>
            </div>
        </header >

    );
};

export default HeaderComponent;
