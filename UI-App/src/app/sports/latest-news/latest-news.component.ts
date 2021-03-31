import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/Service/news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }
  newsList: [] = [];
  ngOnInit(): void {
    this.newsService.getNewsList().subscribe((res: any) => {
      // 3. get the res from the service
      console.log(res);
      this.newsList = res.slice(Math.max(res.length - 3, 0)) ;
    });
  }

}
