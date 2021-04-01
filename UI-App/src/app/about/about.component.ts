import { Component, OnInit } from '@angular/core';
import LocationPicker from 'location-picker';
//make it display avatars on the right in two columsn and map on left like map; | |
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  lp: LocationPicker;
  constructor() {}

  ngOnInit(): void {
    this.lp = new LocationPicker('map');
  }
  setLocation() {
    console.log(this.lp.getMarkerPosition());
  }
}
