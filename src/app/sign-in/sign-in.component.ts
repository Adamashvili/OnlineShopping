import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiAreaService } from '../services/api-area.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(private api: ApiAreaService, public _cookie: SsrCookieService, private tools: ToolsService) {}
  @Output() closeEmit: EventEmitter<boolean> = new EventEmitter();
  @Output() changeEmit: EventEmitter<boolean> = new EventEmitter();
  @Output() loggedEmit: EventEmitter<boolean> = new EventEmitter();
  @Output() loggedInfo: EventEmitter<any> = new EventEmitter();

  public accessToken: any;
  public errorSMS: string | undefined;
  public errAlert: boolean = false;
  public successLogin: boolean = false;

  protected signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  signIn() {
    this.api.signIn(this.signInForm.value).subscribe({
      next: (data: any) => {
        this.accessToken = data.access_token;
        this._cookie.set('user', this.accessToken, 1);
        this.errAlert = false;
        this.successLogin = true;
        this.api.profileInfo().subscribe((data: any) => {
          let userInfo = {
            firstName: data.firstName,
            avatar: data.avatar,
          };
          this.tools.userNavbarInfo.next(userInfo)
        });

        if (this.successLogin) {
          setTimeout(() => {
            this.closeEmit.emit(false);
            this.loggedEmit.emit(true);
          }, 1000);
        }
      },
      error: (err) => {
        this.errorSMS = err.error.error;
        this.errAlert = true;
      },
    });
  }

  closeForm() {
    this.closeEmit.emit(false);
  }

  outSide(event: any) {
    if (event.target.className == 'signArea') {
      this.closeEmit.emit(false);
    }
  }

  change() {
    this.changeEmit.emit(true);
  }
}
