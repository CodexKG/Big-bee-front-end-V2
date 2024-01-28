import React, { useState } from 'react';
import classes from './CartItemComponent.module.scss'
import { Flex, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { CloseOutlined, HeartOutlined, MinusOutlined, PlusOutlined, HeartFilled } from '@ant-design/icons'; 
import { CartItem } from 'types/types';


type Props = {
    cart_item?: CartItem
}

const CartItemComponent : React.FC<Props> = ({cart_item}:Props)=>{
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const [count, setCount] = useState(1)
    const [fav, setFav] = useState(false)
    const inp_change=(add:boolean)=>{
        add ? setCount(count+1) : count-1 > 0 ? setCount(count-1): setCount(1)

    }
    return (
        <Flex gap={50} justify='space-between' align='start' className={classes.cart__item}>
            <Flex gap={20} align='start' className={classes.left}>
                <Checkbox onChange={onChange}></Checkbox>
                <img src="https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png" alt="" />
                <Flex gap={15} vertical>
                    <span className={classes.title}>
                        Apple iPhone 15 256Gb Dual: 
                        nano SIM + eSIN, черный (new)
                    </span>
                    <p className={classes.code}>Код товара: 1445094</p>
                    <p className={classes.category}>Цвет товара:<span>Черный</span></p>
                </Flex>
            </Flex>
            <Flex align='start' gap={40} className={classes.right}>
                <Flex gap={5} align='center' className={classes.count}>
                    <MinusOutlined onClick={()=>{inp_change(false)}}/>
                    <input type="number" min={1} value={count} onChange={(e)=>{setCount(Number(e.target.value))}} />
                    <PlusOutlined onClick={()=>{inp_change(true)}}/>
                </Flex>
                <Flex vertical gap={10}>
                    <span className={classes.old_price}>124 990</span>
                    <span className={classes.price}>94 990 с</span>
                </Flex>
                <Flex gap={20} className={classes.spans}>
                    {
                        fav ? 
                        <HeartFilled  onClick={()=>setFav(!fav)} className={classes.active}></HeartFilled>
                        :
                        <HeartOutlined onClick={()=>setFav(!fav)}></HeartOutlined>
                    }
                    <CloseOutlined ></CloseOutlined>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default CartItemComponent