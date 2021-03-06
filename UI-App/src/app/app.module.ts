import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './sports/news/news.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { LatestNewsComponent } from './sports/latest-news/latest-news.component';
import { WeatherComponent } from './weather/weather.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ConDialogComponent } from './shared/components/con-dialog/con-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NewsComponent,
    ContactComponent,
    AboutComponent,
    ImageSliderComponent,
    LatestNewsComponent,
    WeatherComponent,
    PageNotFoundComponentComponent,
    ChatInboxComponent,
    ConDialogComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Http Client related module
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
