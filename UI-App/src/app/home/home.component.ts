import { Component, Injectable, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeaderService } from '../Service/header.service';

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
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    console.log('home');
    this.headerService.isUserLoggedIn.next(true);
  }
}
