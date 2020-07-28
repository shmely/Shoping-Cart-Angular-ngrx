import { Action, createReducer, on } from '@ngrx/store';
import * as ShoppingActions from './shopping.actions';
import { ShoppingState, initializeState } from './shopping.state';

export const intialState = initializeState();
const reducer = createReducer(
    intialState,
    on(ShoppingActions.getProductsAction, state => state),
    on(ShoppingActions.successGetProductsAction, (state: ShoppingState, { payload }) => {
        return { ...state, items: payload }
    }),
    on(ShoppingActions.addToCart, (state: ShoppingState, { payload }) => {
        return {
            ...state,
            cart: [...state.cart, payload]
        }
    }),
    on(ShoppingActions.removeFromCart, (state: ShoppingState, { payload }) => {
        
        return {
            ...state,
            cart: [...state.cart.filter(item => item.id != payload.id)]
        }
    }),
    on(ShoppingActions.updateCart, (state: ShoppingState, { payload }) => {
        return {
            ...state,
            cart: payload
        }
    })
);


export function ItemsReducer(state: ShoppingState | undefined, action: Action) {
    return reducer(state, action);
}