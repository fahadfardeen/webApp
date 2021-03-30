import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/Service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsList: [] = [];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNewsList().subscribe((res: any) => {
      // 3. get the res from the service
      console.log(res);
      this.newsList = res;
    });
  }
}
