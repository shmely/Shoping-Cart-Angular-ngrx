import { Component, OnInit } from '@angular/core';
import { Item, CartItem } from 'src/model/Item';
import { Observable, Subscription } from 'rxjs';
import { ShoppingState } from '../store/shopping.state';
import { select, Store } from '@ngrx/store';
import { StorageService } from '../services/storage.service';
import { removeFromCart, updateCart } from '../store/shopping.actions'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  CartsSubscription: Subscription;
  cart$: Observable<ShoppingState>;
  cart: CartItem[] = [];
  totalCart: number;
  cartError: Error = null;
  constructor(private store: Store<{ shop: ShoppingState }>, private storageService: StorageService) {

    store.pipe(select('shop')).subscribe(data => {
      this.cart = data.cart;

      if (this.cart.length == 0) {
        this.cart = storageService.loadFromStorage('cart');
        if (!this.cart) this.cart = [];
        if (this.cart.length > 0)
          this.store.dispatch(updateCart({ payload: this.cart }));
      }
      else {
        this.storageService.saveToStorage('cart', this.cart);
      }
      this.totalCart = this.cart.reduce((a, b) => a + (b.totalLine || 0), 0);
    });

  }

  ngOnInit(): void {

  }


  removeItem(removedItem: CartItem) {

    this.storageService.saveToStorage('cart', []);
    this.store.dispatch(removeFromCart({ payload: removedItem }));

  }

  onChangeQuantity(event, item: CartItem) {
    const updatedCart = JSON.parse(JSON.stringify(this.cart));
    const changedItem = updatedCart.find(cartItem => cartItem.id === item.id);
    changedItem.quantity = parseInt(event.target.value);
    changedItem.totalLine = changedItem.quantity * changedItem.price;
    this.store.dispatch(updateCart({ payload: updatedCart }));
  }
}
