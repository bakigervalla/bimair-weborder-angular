import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[toggle]'
})
export class ShowHidePasswordDirective {
  private _shown = false;
  @Input() inputFromParent: string;

  constructor(private el: ElementRef) {
    el.nativeElement.addEventListener('click', () => {
      this.toggle();
    });
  }

  //@HostListener('click') onMouseEnter() {
  //  this.toggle();
  //}
  
  toggle() {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.parentNode.querySelector("input").setAttribute('type', 'text');
      // this.el.nativeElement.innerHTML = 'Hide';
    } else {
      this.el.nativeElement.parentNode.querySelector("input").setAttribute('type', 'password');
      // this.el.nativeElement.innerHTML = 'Show';
    }
  }

  //private highlight(color: string) {
  //  this.el.nativeElement.style.backgroundColor = color;
  //  this._shown = !this._shown;
  //  if (this._shown) {
  //    this.el.nativeElement.setAttribute('type', 'text');
  //    this.el.nativeElement.innerHTML = 'Hide';
  //  } else {
  //    this.el.nativeElement.setAttribute('type', 'password');
  //    this.el.nativeElement.innerHTML = 'Show';
  //  }
  //}

}
