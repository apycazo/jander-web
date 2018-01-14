import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MarkdownModule } from 'ngx-md';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewerComponent } from './viewer/viewer.component';

/* Services */
import { SharedService} from './shared.service';
import { TestComponent } from './home/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { JsbinComponent } from './msc/jsbin/jsbin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    ViewerComponent,
    TestComponent,
    JsbinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [ SharedService ],
  bootstrap: [ NavbarComponent, AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
