import { useAppDispatch } from 'store/hook';
import { addCartItem, loadCartFromLocalStorage } from 'store/reducers/cartRedusers';
export function transferCart(cart_id: number, callback: Function) {
    const array: any = loadCartFromLocalStorage()
    for (let i = 0; i < array?.length; i++) {
        const el = array[i]
        console.log({ cart: cart_id, product_id: el.product.id, quantity: el.quantity });
        callback({ cart: cart_id, product_id: el.product.id, quantity: el.quantity })
    }
}