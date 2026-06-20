import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductsAreaService } from '../services/products-area.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { AllProductArea } from '../../interfaces/all-product-area';
import { FilteredProducts } from '../../interfaces/filtered-products';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [SidebarComponent, FormsModule, RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  constructor(private prodService: ProductsAreaService) {}

  ngOnInit(): void {
    this.showProducts(this.currentPage, this.pageSize);
   
  }
  
  public currentCategory: any;
  public productList: Product[] = [];
  public pageList: number[] = [];
  public currentPage: number = 1;
  public pageSize: any = 15;
  public totalSize!: any;
  public isCategoryShown: boolean = false;
  public altImage: string =
    'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=';

  pagination(data: FilteredProducts | AllProductArea) {
    this.pageList = [];
    this.productList = data.products;
    let pages = Math.ceil(data.total / this.pageSize);

    for (let i = 1; i <= pages; i++) {
      this.pageList.push(i);
    }
  }

  showProducts(page: number | string = 1, size: number = this.totalSize) {
    this.isCategoryShown = false;
    this.currentPage = +page;
    this.prodService
      .getCardsOnShopPage(page, size)
      .subscribe((data: AllProductArea) => {
        this.productList = data.products;
        this.totalSize = data.total;
        this.pagination(data);
      });
  }

  search(search: string) {
    this.prodService
      .getSearchedData(search, this.pageSize)
      .subscribe((data: FilteredProducts) => {
        this.productList = data.products;
        this.pagination(data);
      });
  }

  filterProducts(info: any) {
    console.log(info);

    this.prodService
      .filterData(
        info.search,
        info.rating,
        info.min,
        info.max,
        info.type,
        info.sort,
        this.pageSize,
        info.brand,
      )
      .subscribe((data: FilteredProducts) => {
        console.log(data);

        this.productList = data.products;
        this.pagination(data);
      });
  }

  switchBrands(dataOfBrand: AllProductArea) {
    this.productList = dataOfBrand.products;
    this.pageList = [1];
  }

  changePageSize() {
    this.currentPage = 1;
    let pageArea = this.pageSize == '' ? this.totalSize : this.pageSize;

    if (!this.isCategoryShown) {
      this.showProducts(this.currentPage, pageArea);
    } else {
      this.showByCategory(this.currentCategory, this.currentPage);
    }
  }

  prevPage() {
    this.currentPage--;
    if (!this.isCategoryShown) {
      this.showProducts(this.currentPage, this.pageSize);
    } else {
      this.showByCategory(this.currentCategory, this.currentPage);
    }
  }

  nextPage() {
    this.currentPage++;
    if (!this.isCategoryShown) {
      this.showProducts(this.currentPage, this.pageSize);
    } else {
      this.showByCategory(this.currentCategory, this.currentPage);
    }
  }

  

  showByCategory(category: string, pageNum: any) {
    this.isCategoryShown = true;
    this.currentCategory = category;
    this.currentPage = pageNum;
    this.prodService
      .getListByCategory(category, this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.productList = data.products;
        this.pagination(data);
      });
  }
}
