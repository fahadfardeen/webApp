import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  cartList: any[];
  counter: any;
  allCartList: any[];
  checkoutItems: any[];
  constructor() {}

  ngOnInit(): void {}
}
