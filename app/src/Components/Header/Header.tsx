// Header.tsx
import React, { useEffect, useState } from 'react';
import { Button, Drawer, Select, Skeleton, Space } from 'antd';
import classes from './Header.module.scss'
import { CloseOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'store/hook';
import axios from 'axios';
import { fetchCategories, fetchCategoriesById } from 'store/reducers/categoryReduser';
import { Categories } from 'types/types';
import { setHoveredItem } from 'store/slices/categorySlice';
import { Link, useNavigate } from 'react-router-dom';
import HeaderSceleton from 'Components/Skeleton/HeaderSkeleton';
import { clearFilters, setBredCrumps, setFilters } from 'store/slices/WindowSlice';
import Protected from 'routes/Protected/Protected';
import { deleteCookie } from 'helpers/cookies';
import { fetchSettings } from 'store/reducers/settingsReducers';
import { findCategoryById, getBredCrumps } from 'helpers/getBreadCrumps';


const HeaderComponent: React.FC = () => {
    const { data, children, status } = useAppSelector((state) => state.category)
    const { settings } = useAppSelector((state) => state.window)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState<number>(1)
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchCategories({ cancelToken: source.token, }))
        dispatch(fetchSettings({ cancelToken: source.token, }))
        return () => {
            source.cancel('Запрос отменен, компонент размонтирован');
        };
    }, []);
    useEffect(() => {
        document.title = settings.title;
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.rel = 'icon'
        linkElement.href = settings.logo;
        document.head.appendChild(linkElement)
    }, [settings.logo]);
    React.useEffect(() => {

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
                // getBredCrumps(res.payload, 18)
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
                            dispatch(setBredCrumps((getBredCrumps(children[category]?.title, item.title, el.title))))
                            console.log('test',findCategoryById(el.id, children[category]));
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
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img height={40} src={settings.logo} alt="" />
                </div>
                <ul >
                    <Protected fallback={<Link style={{ color: 'black' }} to={`https://seller-black.vercel.app//login`}>
                        <li>Стать продавцом</li>
                    </Link>}>
                        <Link style={{ color: 'black' }} to={`https://seller-black.vercel.app/`}>
                            <li>Стать продавцом</li>
                        </Link>

                    </Protected>

                    <li>Покупать как компания</li>
                    <li>Помощь test</li>
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
            <div style={{ height: '80px' }}></div>
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
                        style={{ width: 75 }}
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
                        style={{ width: 65 }}
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
