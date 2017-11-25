import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { EmotionComponent } from './components/emotion/emotion.component';
import { EmotionService } from './services/emotion/emotion.service';
import { RoutingModule } from './routing/routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    EmotionComponent
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [ EmotionService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
