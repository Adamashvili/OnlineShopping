import { Component, OnInit, signal } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ApiAreaService } from '../services/api-area.service';
import { HttpHeaders } from '@angular/common/http';
import { BannerComponent } from "./banner/banner.component";

import { SeveralProductsComponent } from "./several-products/several-products.component";
import { ProductsAreaService } from '../services/products-area.service';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-home',
    imports: [BannerComponent, SeveralProductsComponent, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent  {
  constructor(private api: ProductsAreaService) {
    this.getBrands()
  }

  allBrands = signal<string[]>([])

  getBrands() {
    this.api.getBrands().subscribe( (data:string[]) => this.allBrands.set(data) )
  }


}
