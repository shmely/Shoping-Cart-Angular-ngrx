import { ShoppingService } from '../services/shopping.service'
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ShoppingActions from './shopping.actions';
import { Item } from '../../model/Item';
import { StorageService } from '../services/storage.service'



@Injectable()
export class ShoppingEffects {

    constructor(private shoppingService: ShoppingService, private action$: Actions, private storageService: StorageService) { }


    getProductsAction$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(ShoppingActions.beginGetProductsAction),
            mergeMap(action =>
                this.shoppingService.getItems().pipe(
                    map((data: Item[]) => {                       
                        return ShoppingActions.successGetProductsAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(ShoppingActions.ErrorShoppingAction(error));
                    })
                )
            )
        )
    );
}