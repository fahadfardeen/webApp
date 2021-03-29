import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor() {}
  isLogin: boolean;

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public cartCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartList: BehaviorSubject<any> = new BehaviorSubject<any>('');

  notLogin(): boolean {
    return (this.isLogin = false);
  }

  isLoginNow(islogin: boolean): boolean {
    return (this.isLogin = islogin);
  }
}
