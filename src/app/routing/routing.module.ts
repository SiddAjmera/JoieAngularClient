import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from '../components/chat/chat.component';
import { EmotionComponent } from '../components/emotion/emotion.component';

const appRoutes: Routes = [
  { path: 'emotion', component: EmotionComponent },
  { path: 'chat', component: ChatComponent },
  { path: '**', redirectTo: '/emotion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule { }
