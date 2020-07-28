import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Item, CartItem } from '../../model/Item';
import { Store, select } from '@ngrx/store';
import { addToCart, removeFromCart, updateCart } from '../store/shopping.actions'
import { ShoppingState } from '../store/shopping.state';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.scss'],
  
})
export class ItemPreviewComponent implements OnInit {
  @Input() item: Item;

  cart: CartItem[]
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
    })
  }

  ngOnInit(): void {
  }

  addToCart(item: Item) {

    this.store.dispatch(addToCart({ payload: { id: item.id, title: item.title, image: item.image, price: item.price, quantity: 1, totalLine: item.price * 1 } }));

  }

  removeFromCart(item: Item) {
    this.store.dispatch(removeFromCart({ payload: { id: item.id, title: item.title, image: item.image, price: item.price, quantity: 1, totalLine: item.price * 1 } }));
  }

  inCart() {
    return this.cart.some(cartItem => cartItem.id === this.item.id);
  }

}
