import { Injectable } from '@angular/core';

import { IWindow } from './../../interfaces/window.interface';

@Injectable()
export class WindowService {
  get nativeWindow() : IWindow {
     return <any>window;
  }
}