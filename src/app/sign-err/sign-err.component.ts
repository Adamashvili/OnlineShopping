import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-sign-err',
  imports: [],
  templateUrl: './sign-err.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sign-err.component.css'
})
export class SignErrComponent implements OnInit {
  constructor(private tools: ToolsService) {}
  ngOnInit(): void {
    this.tools.isErrSMS.subscribe((info: boolean) => {
      this.isShown = info
    })
  }

  public isShown: boolean = false

  outSide(e:any) {
    if(e.target.className != "errCard") {
      this.tools.isErrSMS.next(false)
      
    }
  }

  closeErr() {
    this.tools.isErrSMS.next(false)
  }

  signIn() {
    this.tools.isErrSMS.next(false)
    this.tools.isSignedIn.next(true)
  }

  register() {
    this.tools.isErrSMS.next(false)
    this.tools.isRegistered.next(true)
  }

}
