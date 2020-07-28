import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../model/Item';
import { select, Store } from '@ngrx/store';
import { ShoppingState } from '../store/shopping.state';
import * as ShoppingActions from '../store/shopping.actions';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  shopping$: Observable<ShoppingState>;
  items: Item[];
  ItemsSubscription: Subscription;
  shoppingError: Error = null;
  error: Error = null;
  



  constructor(private store: Store<{ shop: ShoppingState }>) {
    this.shopping$ = store.pipe(select('shop'));
  }

  ngOnInit(): void {
    this.ItemsSubscription = this.shopping$
      .pipe(
        map(x => {
          this.items = x.items;
          this.shoppingError = x.error;
        })
      )
      .subscribe();

    this.store.dispatch(ShoppingActions.beginGetProductsAction());


  }
  ngOnDestroy() {
    if (this.ItemsSubscription) {
      this.ItemsSubscription.unsubscribe();
    }
  }

}
