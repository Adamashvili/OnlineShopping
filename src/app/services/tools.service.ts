import { Injectable, signal } from '@angular/core';
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
  public userNavbarInfo = signal<any>({})
  public cartQuantity = signal<number>(0)
  public loader = signal<boolean>(false)
}
