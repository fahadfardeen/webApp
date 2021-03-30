import { Component, Injectable, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class HomeComponent implements OnInit {
  isLoginNow: true;
  constructor() {}

  ngOnInit(): void {
  
  }
}
