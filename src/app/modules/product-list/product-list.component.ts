import { Component, ViewChild } from '@angular/core';
import * as product from 'src/assets/data/product.json';
import { DataService } from 'src/app/shared/services/data.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {

    constructor(private _data: DataService, private _api: ApiService) { }

    @ViewChild('filterCheckbox') filterCheckbox!: Checkbox;
    productList: any[] = (product as any).default;
    selectedFilters: string[] = [];
    filteredProductList: any[] = [];
    searchedProductList: any[] = [];
    searchTerm: string = '';
    colors: any[] = [];
    gender: any[] = [];
    types: any[] = [];
    prices: any[] = [];
    filterSection = false;
    filterColorCheckboxes: any[] = [];
    filterGenderCheckboxes: any[] = [];
    filterTypeCheckboxes: any[] = [];
    filterPriceCheckboxes: any[] = [];


    ngOnInit(): void {
        this.getProductList();
        this.filteredProductList = this.productList; // initializing the filter list
        this.searchedProductList = this.productList; // initializing the search list 

        this.filterColorCheckboxes = [
            { category:'color', value: 'black'},
            { category:'color', value: 'blue'},
            { category:'color', value: 'pink'},
            { category:'color', value: 'green'},
            { category:'color', value: 'red'},
            { category:'color', value: 'grey'},
            { category:'color', value: 'purple'},
            { category:'color', value: 'white'},
            { category:'color', value: 'yellow'}
        ];

        this.filterGenderCheckboxes = [
            { category:'gender', value: 'men'},
            { category:'gender', value: 'women'}
        ];

        this.filterTypeCheckboxes = [
            { category:'type', value: 'polo'},
            { category:'type', value: 'hoodie'},
            { category:'type', value: 'round'}
        ];

        this.filterPriceCheckboxes = [
            { category:'price', value: '0-300'},
            { category:'price', value: '301-400'},
            { category:'price', value: '401-500'}
        ]
    }

    // Get the list of products from API
    getProductList() {
        // this._api.getRequest('').subscribe(res => {
        //     this.productList = res;
        // })
    }

    // toggle the filter button
    toggleFilter() {
        this.filterSection = !this.filterSection;
    }

    clearAllFilters() {
        console.log(this.filterCheckbox);

        this.filteredProductList = this.productList;
    }

    // Searching products
    searchPoducts() {
        this.searchTerm = this.searchTerm.toLowerCase();
        this.filteredProductList = this.searchedProductList.filter(product => product.name.toLowerCase().includes(this.searchTerm) || product.color.toLowerCase().includes(this.searchTerm));
    }

    // Removing specific elements from the array (on de-selecting filter checkbox)
    removeElement(array: any[], value: any) {
        let index = array.indexOf(value);
        array.splice(index, 1);
        return array;
    }

    // Creating arrays on selecting the filter checkbox
    checkBoxFilter(category: any, value: any, event: any) {
        console.log(event);
                
        const filterArrays: { [key: string]: any[] } = {
            color: this.colors,
            gender: this.gender,
            type: this.types,
            price: this.prices
        };

        if (event.checked.length > 0) filterArrays[category].push(value);
        else this.removeElement(filterArrays[category], value);
    }

    // Filtering product list in accordance with the selected filters
    applyFilters() {

        if (this.colors.length === 0 && this.types.length === 0 && this.gender.length === 0) {
            // No filters selected, show all products
            this.filteredProductList = this.productList;
        } else {
            this.filteredProductList = this.productList.filter(product => {
                const colorMatch = this.colors.length === 0 || this.colors.includes(product.color.toLowerCase());
                const typeMatch = this.types.length === 0 || this.types.includes(product.type.toLowerCase());
                const genderMatch = this.gender.length === 0 || this.gender.includes(product.gender.toLowerCase());
                const priceMatch = this.prices.length === 0 || this.prices.some(price => {
                    const [min, max] = price.split('-').map(Number);
                    return product.price >= min && product.price <= max;
                })

                return colorMatch && typeMatch && genderMatch && priceMatch;
            });
        }

        // For searching in the filtered products
        this.searchedProductList = this.filteredProductList;
        if (this.filteredProductList.length === 0) {
            this._data.showWarn('No product available of this type');
        }
    }

    // Adding product to shopping cart
    addToCart(product: any) {
        this._data.setShoppingCartList(product);
    }
}