import React from "react";
import CartComponent from "Components/CartComponent/CartComponent";

interface CartProps {
    
}
 
const Cart: React.FC<CartProps> = () => {
    return (    
        <div>
            <CartComponent/>
        </div>  
    );
}
 
export default Cart;