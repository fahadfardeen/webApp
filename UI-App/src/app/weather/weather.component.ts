import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';

import { Weather } from './weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {

  errorMessage: string;
  cityName: string;
  disabledForecastButton: boolean;
  weatherForecastData : Weather;
  cityinitail:string;
  
  weatherList: any = [];



  constructor(private _weatherService: WeatherService) {     
  }



  ngOnInit() {
    
    this.cityinitail = 'Bangalore'
    this.weatherList = this._weatherService.getWeatherForecast(this.cityinitail)
          .subscribe(data => { this. weatherForecastData = data ,console.log(this.weatherForecastData)} , error => this.errorMessage = <any>error );
    
          this.onResetControls();
      console.log(this.weatherForecastData)
  }

  onSubmitDatabinding() {
    console.log('Inside the two way', this.cityName);
    this._weatherService.getWeatherForecast(this.cityName)
          .subscribe(data => { this.weatherForecastData = data ,console.log(this.weatherForecastData)} , error => this.errorMessage = <any>error );
    
         
     this.onResetControls();
}
  onSearchLocationWithEvent(event: Event) {
    console.log('Control event value', (<HTMLInputElement>event.target).value);
    this.cityName = (<HTMLInputElement>event.target).value;
    this.disabledForecastButton = false;
  }
  onResetControls() {
    //console.log(this.weatherForecastData);
    //this.cityName = '';
    this.disabledForecastButton = true;
  }

}
