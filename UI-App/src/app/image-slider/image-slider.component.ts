import { Component, OnInit } from '@angular/core';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit {
  constructor(private newsService: NewsService) {}
  newsList: [] = [];
 

  ngOnInit(): void {
    this.newsService.getNewsList().subscribe((res: any) => {
      // 3. get the res from the service
      this.newsList = res.slice(Math.max(res.length - 3, 0));
      console.log(this.newsList);
    });
  }
}
