import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

import { CartAreaService } from '../services/cart-area.service';
import { ProductsAreaService } from '../services/products-area.service';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../services/tools.service';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
    selector: 'app-cart',
    imports: [CommonModule, SpinnerComponent],
    templateUrl: './cart.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './cart.component.css'
})
export class CartComponent{
  constructor(private api: CartAreaService, protected prodServ: ProductsAreaService, protected tools: ToolsService) {
     this.getCart()
  }
  
  protected cartArray = signal<any[]>([])
  protected totalPrice = signal<number>(0)

  getCart() {
    this.api.getCart().subscribe( {
      next:(cartData:any) => {
        let cartFilteredList:any[] = []
        this.prodServ.getCardsOnShopPage(1,38).subscribe( (fullList:any) => {
          this.tools.cartQuantity.set(cartData.products.length)
          let total = cartData.products.map( (item:any) => item.quantity * item.pricePerQuantity ).reduce((x:any, y:any) => x+ y)
          this.totalPrice.set(total)
          
          cartData.products.forEach( (cartItem:any) => {
            fullList.products.forEach( (fullCardItem:any) => {
              if(cartItem.productId == fullCardItem._id) {
                fullCardItem.quantity = cartItem.quantity
                cartFilteredList.push(fullCardItem)
              }
              
            } )
          } )
          this.cartArray.set(cartFilteredList)
         
        } )
        
        
      },
      error:(err:any) => {
        console.log(err);
        
      },
    } )
  }

  updateCart(id: string, action: string, prodQuantity: number) {
    action == "+" ? prodQuantity++ : prodQuantity--

    const prodInfoCart = {
          id: id,
          quantity: prodQuantity
        };

        this.api.addtoCart(prodInfoCart).subscribe( (data:any) => this.getCart() )
        
  }

  removeItem(id: string) {
    this.api.deleteProduct({id: id}).subscribe(() => this.getCart())
  }

}
