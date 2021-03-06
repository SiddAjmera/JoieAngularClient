import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {

  slideContent = [
    {
      imageUrl: 'https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg',
      title: 'Hi! I\'m Joie',
      description: 'Your very own mindfulness and mental wellbeing instructor.'
    },
    {
      imageUrl: 'https://mdbootstrap.com/img/Photos/Others/img%20(41).jpg',
      title: 'I\'m smart',
      description: 'I analyze your mood and suggest you activities to make you feel better.'
    },
    {
      imageUrl: 'https://mdbootstrap.com/img/Photos/Others/img%20(49).jpg',
      title: 'I\'m accessible',
      description: 'You can access me from your mobile devices, tablets as well as desktops.'
    }
  ];

  constructor(private _router: Router) { }

  navigateToChat() {
    this._router.navigate(['/chat']);
  }

}
