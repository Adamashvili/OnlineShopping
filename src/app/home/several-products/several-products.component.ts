import { Component, OnInit } from '@angular/core';
import { ApiAreaService } from '../../services/api-area.service';
import { Product } from '../../../interfaces/product';
import { AllProductArea } from '../../../interfaces/all-product-area';
import { ProductsAreaService } from '../../services/products-area.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-several-products',
  imports: [RouterModule],
  templateUrl: './several-products.component.html',
  styleUrl: './several-products.component.css',
})
export class SeveralProductsComponent implements OnInit {
  constructor(private service: ProductsAreaService) {}
  ngOnInit(): void {
    this.showCards();
  }

  protected productList!: Product[];
  public altImage: string =
    'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=';

  showCards() {
    this.service.getCardsforHome().subscribe({
      next: (data: AllProductArea) => {
        this.productList = data.products;
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
