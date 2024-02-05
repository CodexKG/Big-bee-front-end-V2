import React, { useState, useEffect } from 'react';
import classes from './CartItemComponent.module.scss'
import { Flex, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { CloseOutlined, HeartOutlined, MinusOutlined, PlusOutlined, HeartFilled } from '@ant-design/icons'; 
import { CartItem } from 'store/models/CartTypes';
import { updateCartToLocalStorage } from 'store/reducers/cartRedusers';


type Props = {
    cart_item: CartItem,
    setCartItems: any,
}

const CartItemComponent : React.FC<Props> = ({cart_item, setCartItems}:Props)=>{
    const onChange: CheckboxProps['onChange'] = (e) => {
        setCartItems(updateCartToLocalStorage(cart_item.id, 'check'))
    };
    const [count, setCount] = useState(cart_item.quantity)
    const [fav, setFav] = useState(false)
    const inp_change=(add:boolean)=>{
        add ? setCount(count+1) : count-1 > 0 ? setCount(count-1): setCount(1)
    }
    useEffect(()=>{
        setCartItems(updateCartToLocalStorage(cart_item.id, 'count', count))
    }, [count])
    return (
        <Flex gap={50} justify='space-between' align='start' className={classes.cart__item}>
            <Flex gap={20} align='start' className={classes.left}>
                <Checkbox onChange={onChange} checked={cart_item.is_selected}></Checkbox>
                <img src={cart_item.product.image} alt="" />
                <Flex gap={15} vertical>
                    <span className={classes.title}>
                        {cart_item.product.title}
                    </span>
                    <p className={classes.code}>Код товара: {cart_item.product.product_code}</p>
                    {cart_item.product.product_attributes.map((e)=>(
                    <p className={classes.category}>{e.key} :<span>{e.value}</span></p>))}
                </Flex>
            </Flex>
            <Flex align='start' gap={40} className={classes.right}>
                <Flex gap={5} align='center' className={classes.count}>
                    <MinusOutlined onClick={()=>{inp_change(false)}}/>
                    <input type="number" min={1} value={count} onChange={(e)=>{setCount(Number(e.target.value))}} />
                    <PlusOutlined onClick={()=>{inp_change(true)}}/>
                </Flex>
                <Flex vertical gap={10}>
                    <span className={classes.old_price}>{cart_item.product.old_price}</span>
                    <span className={classes.price}>{cart_item.product.price}</span>
                </Flex>
                <Flex gap={20} className={classes.spans}>
                    {
                        fav ? 
                        <HeartFilled  onClick={()=>setFav(!fav)} className={classes.active}></HeartFilled>
                        :
                        <HeartOutlined onClick={()=>setFav(!fav)}></HeartOutlined>
                    }
                    <CloseOutlined onClick={()=>{setCartItems(updateCartToLocalStorage(cart_item.id, 'delete'))}}></CloseOutlined>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default CartItemComponent