import React, { useEffect, useState } from 'react';
import classes from './CartComponent.module.scss'
import { Flex, Checkbox, Button  } from 'antd';
import type { CheckboxProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons'; 
import CartItemComponent from 'Components/CartItemComponent/CartItemComponent';
import { loadCartFromLocalStorage, updateCartToLocalStorage,deleteCheckedCartToLocalStorage } from 'store/reducers/cartRedusers';
import { Link } from 'react-router-dom';
import { localCartItem } from 'store/models/CartTypes';
type Props = {

}

const CartComponent : React.FC<Props> = ()=>{
    const onChange: CheckboxProps['onChange'] = (e) => {
        setIsAllCheck(!e.target.value)
        cart_items.map(el=>{
            setCartItems(updateCartToLocalStorage(el.id, 'check', e.target.checked))
        })
    };
    const cart = loadCartFromLocalStorage()
    const [cart_items, setCartItems] = useState<localCartItem[]>([])
    const [is_all_check, setIsAllCheck] = useState(false)
    const [cost, setCost] = useState(0)
    const [sell, setSell] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [total_cost, setTotalCost] = useState(0)
    useEffect(()=>{
        setCartItems(cart)
    },[])
    useEffect(()=>{
        setIsAllCheck(cart_items.every(item => item.is_selected === true))
        setCost(cart_items.reduce((accumulator, currentItem) => accumulator + (currentItem.old_price * currentItem.quantity), 0))
        setTotalCost(cart_items.reduce((accumulator, currentItem) => accumulator + (currentItem.price * currentItem.quantity), 0))
        setSell(cart_items.reduce((accumulator, currentItem) => accumulator + (currentItem.price* currentItem.quantity), 0)-cart_items.reduce((accumulator, currentItem) => accumulator + (currentItem.old_price * currentItem.quantity), 0))
    },[
        cart_items
    ])
    return (
        <>
        {
            cart.length===0?(
                <div className={classes.container}>
                    <Flex vertical justify='center' gap={20} align='center'  className={classes.cart__empty}>
                        <h2>Корзина пуста</h2>
                        <p>Воспользуйтесь поиском, чтобы найти всё, что нужно.</p>
                        <Link to={'/'}>На главную</Link>
                    </Flex>
                </div>
            ):(
                <div className={classes.container}>
            <Flex vertical gap={10} className={classes.cart__top}>
                <Flex className={classes.cart__top1} align='center' gap={10}> 
                    <h1>Корзина</h1>
                    <span>{cart_items.length ==1 ? '1 товар': `${cart_items.length} товара`}</span>
                </Flex>
                <Flex className={classes.cart__top2} gap={10}> 
                    <Checkbox onChange={onChange} checked={is_all_check}> Выбрать все</Checkbox>
                    <Flex gap={5} className={classes.delete__btn} align='center' onClick={()=>{setCartItems(deleteCheckedCartToLocalStorage())}}><CloseOutlined /> Удалить выбранные</Flex>
                </Flex>
            </Flex>
            <Flex gap={20} className={classes.cart__bottom}>
                <Flex vertical={true} className={classes.cart__items}>
                    {
                        cart_items.map(el=>(
                            <CartItemComponent setCartItems={setCartItems} cart_item={el}/>
                        ))
                    }
                </Flex>
                <Flex gap={30} vertical align='start' className={classes.cart__form}>
                    <h2>Детали заказа</h2>
                    <Flex vertical className={classes.form_data}>
                        <Flex>
                            <span>{cart_items.length ==1 ? '1 товар': `${cart_items.length} товара`}</span>
                            <hr />
                            <span>{cost} с</span>
                        </Flex>
                        <Flex>
                            <span>Скидка</span>
                            <hr />
                            <span>{sell} с</span>
                        </Flex>
                        <Flex>
                            <span>Доставка</span>
                            <hr />
                            <span>{delivery} с</span>
                        </Flex>
                        <Flex>
                            <span>Итого к оплате</span>
                            <hr />
                            <span>{total_cost} с</span>
                        </Flex>
                    </Flex>
                    <Button>Перейти к оформлению</Button>
                </Flex>
            </Flex>

        </div>
            )
            
        }
        
        </>
    )
}

export default CartComponent