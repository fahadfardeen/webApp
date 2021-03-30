import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';

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
     
      this.newsList = res;
    });
  }
}
