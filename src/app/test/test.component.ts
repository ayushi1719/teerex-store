import { Component } from '@angular/core';
import * as product from 'src/assets/data/product.json';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(private _data: DataService) { }

  selectedValues: any;

  ngOnInit(): void {
   
  }


}