import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BeyondVerbalService } from './services/beyond-verbal/beyond-verbal.service';
import { ChatComponent } from './components/chat/chat.component';
import { EmotionComponent } from './components/emotion/emotion.component';
import { EmotionService } from './services/emotion/emotion.service';
import { MessageService } from './services/message/message.service';
import { RoutingModule } from './routing/routing.module';
import { SuggestionsService } from './services/suggestions/suggestions.service';
import { TransformService } from './services/transform/transform.service';
import { UserInfoService } from './services/user-info/user-info.service';
import { WebempathService } from './services/webempath/webempath.service';
import { IntroComponent } from './components/intro/intro.component';
import { UtilsService } from './services/utils/utils.service';
import { TrimmerPipe } from './pipes/trimmer/trimmer.pipe';
import { SanitizePipe } from './pipes/sanitize/sanitize.pipe';
import { SpotifyService } from './services/spotify/spotify.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    EmotionComponent,
    IntroComponent,
    TrimmerPipe,
    SanitizePipe
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [ 
    BeyondVerbalService,
    EmotionService,
    MessageService,
    SuggestionsService,
    TransformService,
    UserInfoService,
    WebempathService,
    UtilsService,
    SpotifyService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
