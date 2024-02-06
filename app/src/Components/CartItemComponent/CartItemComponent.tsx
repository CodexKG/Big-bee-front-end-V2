import React, { useState, useEffect } from 'react';
import classes from './CartItemComponent.module.scss'
import { Flex, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { CloseOutlined, HeartOutlined, MinusOutlined, PlusOutlined, HeartFilled } from '@ant-design/icons'; 
import { CartItem } from 'store/models/CartTypes';
import { deleteCartItem, updateCartToLocalStorage, updateQuantityCartItem, updateSelectedCartItem } from 'store/reducers/cartRedusers';
import { getCookie } from 'helpers/cookies';
import { useAppDispatch } from 'store/hook';


type Props = {
    cart_item: CartItem,
}

const CartItemComponent : React.FC<Props> = ({cart_item}:Props)=>{
    const dispatch = useAppDispatch();
    const [count, setCount] = useState(cart_item.quantity)
    const [fav, setFav] = useState(false)
    const is_auth = getCookie('access_token')
    const onChange: CheckboxProps['onChange'] = (e) => {
        if (is_auth) {
            dispatch(updateSelectedCartItem({id:cart_item.id, is_selected:!cart_item.is_selected}))

        }else dispatch(updateCartToLocalStorage({id:cart_item.id, action:'check'}))
    };
    const inp_change=(add:boolean)=>{
        add ? setCount(count+1) : count-1 > 0 ? setCount(count-1): setCount(1)
    }
    const delete_item=()=>{
        if(is_auth){
            dispatch(deleteCartItem({id:cart_item.id}))
        }else dispatch(updateCartToLocalStorage({id:cart_item.id, action:'delete'}))
    }
    useEffect(()=>{
        if (is_auth) {
            dispatch(updateQuantityCartItem({id:cart_item.id, quantity:count}))
        }else {dispatch(updateCartToLocalStorage( {id:cart_item.id,action:'count',value:count}))}
    }, [count])
    return (
        <Flex  gap={50} justify='space-between' align='start' className={classes.cart__item}>
            <Flex gap={20} align='start' className={classes.left}>
                <Checkbox onChange={onChange} checked={cart_item.is_selected}></Checkbox>
                <img src={cart_item.product.image} alt="" />
                <Flex gap={15} vertical>
                    <span className={classes.title}>
                        {cart_item.product.title}
                    </span>
                    <p className={classes.code}>Код товара: {cart_item.product.product_code}</p>
                    <p className={classes.category}>
                    {cart_item.product.product_attributes.map((e)=>(<span key={e.key}>
                    {e.key}: {e.value}</span>))}
                    </p>
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
                    <CloseOutlined onClick={()=>{delete_item()}}></CloseOutlined>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default CartItemComponent