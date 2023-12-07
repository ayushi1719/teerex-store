import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private messageService: MessageService) { }

  private total_price: string = '';
  private shoppingCartList: any[] = [];

  // For updating the shopping cart badge (in navbar)
  private dataSubject = new BehaviorSubject<string>('0');
  data = this.dataSubject.asObservable();

  updateData(cartLength: string) {
    this.dataSubject.next(cartLength); // Emit new data to the data$
  }

  // Adding products to shopping cart list
  setShoppingCartList(product: any) {
    // Checking if product is already present in shopping cart
    let productInCart = this.shoppingCartList.find((prod) => prod.id == product.id);
    if (!productInCart) {
      this.shoppingCartList.push({ ...product, used_quantity: 1 });
      this.showSuccess('Product is successfully added');
    }
    this.updateData(this.calCcartLength().toString());
  }

  // Updating the shopping cart list by deleting the product
  updateShoppingCartList(product: any) {
    this.shoppingCartList = this.shoppingCartList.filter((val) => val.id != product.id);
  }

  // Returning the shopping cart list
  getShoppingCartList() {
    return this.shoppingCartList;
  }

  // Returning the length of shoppping cart list
  calCcartLength() {
    let cartLength = this.shoppingCartList.length
    this.updateData(cartLength.toString());
    return cartLength;
  }

  // Calculating the total price of the shopping cart items
  totalPrice() {
    this.total_price = this.shoppingCartList.reduce((ini, prod) => ini + (prod.used_quantity * prod.price), 0);
    return this.total_price;
  }



  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: message });
  }
}
