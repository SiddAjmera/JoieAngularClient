import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmotionService } from './services/emotion/emotion.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule
  ],
  providers: [ EmotionService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
