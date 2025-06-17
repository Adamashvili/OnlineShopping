import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  public isErrSMS: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isRegistered: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isCartActive: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public userNavbarInfo: BehaviorSubject<any> = new BehaviorSubject("")
}
