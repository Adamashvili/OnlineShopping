import { AfterContentChecked, Component, OnInit, signal } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ScrollingDirective } from '../../directives/scrolling.directive';
import { RouterModule } from '@angular/router';
import { ToolsService } from '../services/tools.service';
import { CookieService } from 'ngx-cookie-service';
import { NavSearchingPanelComponent } from '../nav-searching-panel/nav-searching-panel.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { ApiAreaService } from '../services/api-area.service';
import { CartComponent } from "../cart/cart.component";
import { CartAreaService } from '../services/cart-area.service';

@Component({
  selector: 'app-navbar',
  imports: [
    SignInComponent,
    SignUpComponent,
    ScrollingDirective,
    RouterModule,
    RouterModule,
    NavSearchingPanelComponent,
    FormsModule,
    CommonModule,
    ProfilePageComponent,
    CartComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    protected _cookie: CookieService,
    protected tools: ToolsService,
    private api: ApiAreaService,
    protected cartServ: CartAreaService
  ) {}


  ngOnInit(): void {
    this.tools.isSignedIn.subscribe((info: boolean) => this.isSignShow = info);
    this.tools.isRegistered.subscribe((info: boolean) => this.isRegisterShow = info);
    this.profileInfoNav();
    this.cartServ.getCart().subscribe( (cartData:any) => this.tools.cartQuantity.set(cartData.products.length))
  }

  public isSignShow: boolean = false;
  public isRegisterShow: boolean = false;
  public isLoggedIn: boolean = false;
  public isProfileInfoShown: boolean = false;
  public isCartShown: boolean = false;
  public userInfoNAV = signal<any>({});
  public searchWord: string = '';

  signOut() {
    this._cookie.deleteAll();
    this.isLoggedIn = false;
    this.isProfileInfoShown = false
  }
  showRegister() {
    this.tools.isSignedIn.next(false);
    this.tools.isRegistered.next(true);
  }


  profileInfoNav() {
    if (this._cookie.get('user')) {
      this.api.profileInfo().subscribe({
        next: (data: any) => {
          this.isLoggedIn = true
          this.tools.userNavbarInfo.set(data);
        },
        error: (err:any) => alert(err.error),
      });
      
    }
  }
}
