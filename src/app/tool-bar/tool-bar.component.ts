import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ShoppingState } from '../store/shopping.state';
import { Item } from 'src/model/Item';
import { select, Store } from '@ngrx/store';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  CartsSubscription: Subscription;
  cart$: Observable<ShoppingState>;
  cart: Item[];
  cartError: Error = null;

  constructor(private store: Store<{ shop: ShoppingState }>, private storageService: StorageService) {

    store.pipe(select('shop')).subscribe(data => {
      this.cart = data.cart;
    });

  }


  ngOnInit() {

  }
}
