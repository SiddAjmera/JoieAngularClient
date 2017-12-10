import { Injectable } from '@angular/core';

import { INavigator } from './../../interfaces/navigator.interface';
import { IWindow } from './../../interfaces/window.interface';

@Injectable()
export class WindowService {
  get nativeWindow(): IWindow {
    return <any>window;
  }

  get nativeNavigator(): INavigator {
    return <any>navigator;
  }
}