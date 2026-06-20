import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllProductArea } from '../../interfaces/all-product-area';
import { FilteredProducts } from '../../interfaces/filtered-products';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsAreaService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/categories',
    );
  }

  getListByCategory(id: any, page: any, size: any) {
    return this.http.get<AllProductArea>(
      `https://api.everrest.educata.dev/shop/products/category/${id}?page_index=${page}&page_size=${size}`,
    );
  }

  getBrands() {
    return this.http.get<string[]>(
      'https://api.everrest.educata.dev/shop/products/brands',
    );
  }

  getExactBrandData(name: string) {
    return this.http.get<AllProductArea>(
      `https://api.everrest.educata.dev/shop/products/brand/${name}?page_size=10`,
    );
  }

  getSearchedData(searchInput: string, size: number) {
    return this.http.get<FilteredProducts>(
      `https://api.everrest.educata.dev/shop/products/search?page_size=${size}&keywords=${searchInput}`,
    );
  }

  filterData(
    searchText: string = '',
    rating: number | string = '',
    min: string = '1',
    max: string = '99999',
    type: string,
    sort: string,
    size: number,
    brand: string
  ) {
    return this.http.get<FilteredProducts>(
      `https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=${size}&keywords=${searchText}&category_id=1&brand=${brand}${rating ? '&rating=': ''}${rating}${min ? '&price_min=': ''}${min}${max ? '&price_max=': ''}${max}${type ? '&sort_by=' : ''}${type}${sort ? '&sort_direction=': ''}${sort}`,
    );
  }

  getCardsforHome() {
    return this.http.get<AllProductArea>(
      'https://api.everrest.educata.dev/shop/products/all?page_index=3&page_size=10',
    );
  }

  getCardsOnShopPage(page: any, size: any) {
    return this.http.get<AllProductArea>(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${size}`,
    );
  }

  getProductDetailInfo(id: string) {
    return this.http.get<Product>(
      `https://api.everrest.educata.dev/shop/products/id/${id}`,
    );
  }
}
