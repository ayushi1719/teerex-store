import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private _data: DataService) { }

  cart_length: string = '0';

  ngOnInit() {
    this._data.data.subscribe((newData) => {
      this.cart_length = newData; // subscribe to the latest changes 
    });
  }

}
