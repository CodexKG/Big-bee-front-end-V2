import React from 'react';
import classes from './CartComponent.module.scss'
import { Flex, Checkbox, Button  } from 'antd';
import type { CheckboxProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons'; 
import CartItemComponent from 'Components/CartItemComponent/CartItemComponent';

type Props = {

}

const CartComponent : React.FC<Props> = ()=>{
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const isCart = true
    return (
        <div className={classes.container}>
            <Flex vertical gap={10} className={classes.cart__top}>
                <Flex className={classes.cart__top1} align='center' gap={10}> 
                    <h1>Корзина</h1>
                    <span>2 Товара</span>
                </Flex>
                <Flex className={classes.cart__top2} gap={10}> 
                    <Checkbox onChange={onChange}> Выбрать все</Checkbox>
                    <Flex gap={5} className={classes.delete__btn} align='center'><CloseOutlined /> Удалить выбранные</Flex>
                </Flex>
            </Flex>
            <Flex gap={20} className={classes.cart__bottom}>
                <Flex vertical={true} className={classes.cart__items}>
                    <CartItemComponent/>
                    <CartItemComponent/>
                </Flex>
                <Flex gap={30} vertical align='start' className={classes.cart__form}>
                    <h2>Детали заказа</h2>
                    <Flex vertical className={classes.form_data}>
                        <Flex>
                            <span>2 товара</span>
                            <hr />
                            <span>249 980 с</span>
                        </Flex>
                        <Flex>
                            <span>Скидка</span>
                            <hr />
                            <span>- 60 000 с</span>
                        </Flex>
                        <Flex>
                            <span>Доставка</span>
                            <hr />
                            <span>0 с</span>
                        </Flex>
                        <Flex>
                            <span>Итого к оплате</span>
                            <hr />
                            <span>189 980 с</span>
                        </Flex>
                    </Flex>
                    <Button>Перейти к оформлению</Button>
                </Flex>
            </Flex>

        </div>
    )
}

export default CartComponent