import { Item, CartItem } from '../../model/Item';

export class ShoppingState {
    items: Array<Item>;
    cart: Array<CartItem>
    error: Error;
}

export const initializeState = (): ShoppingState => {
    return { items: Array<Item>(), cart: Array<CartItem>(), error: null };
};