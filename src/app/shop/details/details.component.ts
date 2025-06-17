import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsAreaService } from '../../services/products-area.service';
import { CommonModule } from '@angular/common';
import { RelatedProdsComponent } from './related-prods/related-prods.component';
import { Product } from '../../../interfaces/product';
import { SignErrComponent } from '../../sign-err/sign-err.component';
import { ToolsService } from '../../services/tools.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { ApiAreaService } from '../../services/api-area.service';
import { CartAreaService } from '../../services/cart-area.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RelatedProdsComponent, SignErrComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  constructor(
    private actR: ActivatedRoute,
    private service: ProductsAreaService,
    public router: Router,
    public tools: ToolsService,
    private _cookie: SsrCookieService,
    private apiArea: ApiAreaService,
    private cartServ: CartAreaService
  ) {}

  ngOnInit(): void {
    this.getParam();
    this.getFullInfoProduct(this.prodID);
  }

  public prodID!: string;
  public prodINFO: any;
  public mainImage!: string;
  public allImages!: string[];
  public starNum!: number;
  public prodQuant: number = 1;

  getParam() {
    this.actR.params.subscribe((data: Params) => {
      this.prodID = data['id'];
    });
  }

  otherRelatedArea(pageID: string) {
    this.getFullInfoProduct(pageID);
  }

  getFullInfoProduct(pageID: string) {
    this.service.getProductDetailInfo(pageID).subscribe((data: Product) => {
      this.prodINFO = data;
      this.mainImage = data.images[0];
      this.allImages = data.images;
      this.starNum = Math.round(data.rating);
    });
  }

  zoomImg(currImg: string) {
    this.mainImage = currImg;
  }

  increase() {
    this.prodQuant++;
  }

  decrease() {
    this.prodQuant--;
  }

  errorSMS() {
    this.tools.isErrSMS.next(true);
  }

  

  cartBTN(id: string) {
    const prodInfoCart = {
      id: id,
      quantity:this.prodQuant
    }

    
    this.apiArea.profileInfo().subscribe( (data:any) => {
    data.cartID ? this.cartServ.addtoCart(prodInfoCart).subscribe() : this.cartServ.createCart(prodInfoCart).subscribe()
      
    } )
  }
}
