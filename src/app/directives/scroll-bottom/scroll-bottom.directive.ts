import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appScrollBottom]'
})
export class ScrollBottomDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { 
    // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
    el.nativeElement.scrollTop = el.nativeElement.scrollHeight
  }

}
