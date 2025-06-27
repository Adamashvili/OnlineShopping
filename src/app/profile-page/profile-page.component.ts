import { HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApiAreaService } from '../services/api-area.service';
import { CartAreaService } from '../services/cart-area.service';
import { ProductsAreaService } from '../services/products-area.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditprofileComponent } from './editprofile/editprofile.component';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, RouterModule, EditprofileComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private api: ApiAreaService,
    private cartServ: CartAreaService,
    private prodServ: ProductsAreaService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.getProfileData();
  }

  public userData: any;
  public cartList: any[] = [];
  public cartLength: number = 0;
  public total: number = 0;
  public cartSMS: string = '';
  public isProfileInfoShown: boolean = false;
  @ViewChild('settings') public settings!: ElementRef;

  toggleSettings() {
    this.settings.nativeElement.classList.toggle('settingShowHide');
  }

  showProfileInfo() {
    this.isProfileInfoShown = true;
  }

  closeProfileInfo(close: boolean) {
    this.isProfileInfoShown = close;
  }

  getProfileData() {
    this.api.profileInfo().subscribe({
      next: (data: any) => {
        this.userData = data;

        if (data.cartID) {
          this.cartListData();
        }
      },
    });
  }

  cartListData() {
    this.cartList = [];
    this.cartServ.getCart().subscribe((data: any) => {
      data.products.forEach((cartItems: any) => {
        this.prodServ.getCardsOnShopPage(1, 50).subscribe((data: any) => {
          data.products.forEach((item: any) => {
            if (item._id == cartItems.productId) {
              item.quantity = cartItems.quantity;
              this.cartList.push(item);
            }
          });
          let totalPrice = this.cartList
            .map((item: any) => item.price.current * item.quantity)
            .reduce((x, y) => x + y);
          this.total = totalPrice;
        });
      });
    });
  }

  deleteItem(id: string) {
    this.cartServ.deleteProduct({ id }).subscribe(() => this.cartListData());
  }

  removeALL() {
    this.cartServ.removeAll().subscribe((data: any) => {
      this.cartListData();
      this.total = 0;
    });
  }

  checkOut() {
    this.cartServ.checkOut().subscribe((data: any) => {
      this.cartSMS = data.message;

      this.cartList = [];
    });
  }
}
