import { Component, OnInit } from '@angular/core';
import { ApiAreaService } from '../../services/api-area.service';
import { Product } from '../../../interfaces/product';
import { AllProductArea } from '../../../interfaces/all-product-area';
import { ProductsAreaService } from '../../services/products-area.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-several-products',
  imports: [RouterModule, CommonModule],
  templateUrl: './several-products.component.html',
  styleUrl: './several-products.component.css',
})
export class SeveralProductsComponent implements OnInit {
  constructor(private service: ProductsAreaService) {}
  ngOnInit(): void {
    this.showCards();
  }

  protected productList!: Product[];
  protected currentPage: number = 1

  changeProductPage(arrow: string) {
    arrow == "+" ? this.currentPage++ : this.currentPage--
    this.showCards()
  }


  showCards() {
    this.service.getCardsOnShopPage(this.currentPage, 5).subscribe({
      next: (data: AllProductArea) => {
        this.productList = data.products;
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
