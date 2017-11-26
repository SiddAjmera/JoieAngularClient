import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BeyondVerbalService } from './services/beyond-verbal/beyond-verbal.service';
import { ChatComponent } from './components/chat/chat.component';
import { EmotionComponent } from './components/emotion/emotion.component';
import { EmotionService } from './services/emotion/emotion.service';
import { RoutingModule } from './routing/routing.module';
import { WebempathService } from './services/webempath/webempath.service';

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
  providers: [ EmotionService, WebempathService, BeyondVerbalService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
