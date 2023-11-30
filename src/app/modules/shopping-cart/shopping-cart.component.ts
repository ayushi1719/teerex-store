import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor(private _data: DataService) { }

  total_price: string = '';
  shoppingCartList: any[] = [];
  cartLength: number = this.shoppingCartList.length;

  ngOnInit(): void {
    this.total_price = this._data.totalPrice()!;
    this.shoppingCartList = this._data.getShoppingCartList();
    this.cartLength = this.calCcartLength();
  }

  // Calculationg length of shoppping cart
  calCcartLength() {
    return this.shoppingCartList.length;
  }

  // updating total price
  updateTotalPrice(product: any) {
    this.total_price = this._data.totalPrice();    
  }

  // Delete the item
  deleteItem(item: any) {
    // Updating the shopping cart list by deleting the product
    this._data.updateShoppingCartList(item);

    // Getting the updated shopping cart list and cart length after deleting the product
    this.shoppingCartList = this._data.getShoppingCartList();
    this.cartLength = this.calCcartLength();

    // Getting the updated total price after increasing the quantity of product
    this.total_price = this._data.totalPrice()!;
  }

}