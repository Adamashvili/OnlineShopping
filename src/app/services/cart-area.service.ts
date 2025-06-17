import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartAreaService {

  constructor(private http: HttpClient) { }

  getCart () {
    return this.http.get("https://api.everrest.educata.dev/shop/cart")
  }

  createCart(body: any) {
    return this.http.post("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  addtoCart(body: any,) {
    return this.http.patch("https://api.everrest.educata.dev/shop/cart/product", body )
  }



  deleteProduct(body: any) {
    return this.http.delete("https://api.everrest.educata.dev/shop/cart/product", {body: body})
  }

  removeAll() {
    return this.http.delete("https://api.everrest.educata.dev/shop/cart")
  }

  checkOut() {
    return this.http.post("https://api.everrest.educata.dev/shop/cart/checkout", "")
  }
}
