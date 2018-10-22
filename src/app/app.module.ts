import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HerolistComponent } from './home/herolist/herolist.component';
import { HeroDetailComponent } from './home/hero-detail/hero-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './home/message/message.component';

import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './service/in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    HerolistComponent,
    HeroDetailComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
