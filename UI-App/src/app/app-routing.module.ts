import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './sports/news/news.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';
// config the routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'chat', component: ChatInboxComponent },
  {
    path: 'sports',
    children: [{ path: 'news', component: NewsComponent }],
  },
  { path: '**', component: PageNotFoundComponentComponent },
];

// Decorator
@NgModule({
  imports: [RouterModule.forRoot(routes)], // registering the routes
  exports: [RouterModule],
})
export class AppRoutingModule {}
