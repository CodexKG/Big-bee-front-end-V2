import React from "react";
import CartComponent from "Components/CartComponent/CartComponent";
import { Button } from "antd";
import { transferCart } from "helpers/transferCart";

interface CartProps {

}

const Cart: React.FC<CartProps> = () => {
    return (
        <div>
            <CartComponent />
        </div>
    );
}

export default Cart;