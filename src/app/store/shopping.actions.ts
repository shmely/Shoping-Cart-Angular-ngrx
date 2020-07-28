import { createAction, props } from '@ngrx/store';
import { Item, CartItem } from '../../model/Item';


export const getProductsAction = createAction('[fakeatore api ] get items');
export const beginGetProductsAction = createAction('[fakeatore api ] begin get items');
export const successGetProductsAction = createAction('[items] - Success Get items',
    props<{ payload: Item[] }>()
);
export const addToCart = createAction('[item ] add to cart', props<{ payload: CartItem }>());
export const removeFromCart = createAction('[item ] remove from cart', props<{ payload: CartItem }>());
export const updateCart=createAction('[item ] remove to cart', props<{ payload: CartItem[] }>());


export const ErrorShoppingAction = createAction('[Item] - Error', props<Error>());