import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private messageService: MessageService) { }

  private total_price: string = '';
  private shoppingCartList: any[] = [];


  setShoppingCartList(product: any) {
    // Checking if product is already present in shopping cart
    let productInCart = this.shoppingCartList.find((prod) => prod.id == product.id);
    if (!productInCart) {
      this.shoppingCartList.push({ ...product, used_quantity: 1 });
      this.showSuccess('Product is successfully added');
    }
  }

  updateShoppingCartList(product: any) {
    this.shoppingCartList = this.shoppingCartList.filter((val) => val.id != product.id);
  }

  getShoppingCartList() {
    return this.shoppingCartList;
  }

  totalPrice() {
    this.total_price = this.shoppingCartList.reduce((ini, prod) => ini + (prod.used_quantity * prod.price), 0);
    return this.total_price;
  }


  showSuccess(message:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showWarn(message:string) {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: message });
  }
}
