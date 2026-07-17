import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsAreaService } from '../../services/products-area.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  imports: [RouterModule, CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private service: ProductsAreaService) {
    this.getRandomProduct()
    this.changeBanner()
   
    
  }

  allProducts = signal<any>([])
  randomProduct = signal<any>({})

  getRandomProduct() {

    

     this.service.getCardsOnShopPage(1, 38).subscribe( (data:any) => {
      this.allProducts.set(data.products)
      this.randomProduct.set(this.allProducts()[10])

    } 
      
     )
      
  }

  changeBanner() {
    setInterval(() => {
      let random = Math.round(Math.random() * 38)
        this.randomProduct.set(this.allProducts()[random]);
        
    }, 4000);
  }
}

