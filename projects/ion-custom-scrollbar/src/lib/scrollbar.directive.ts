import { Directive, ElementRef, Input, OnInit } from '@angular/core';

interface IScrollOptions {
  width?: number;
  track?: number;
  trackHover?: number;
  thumb?: number;
  thumbHover?: number;
  all?: boolean;
}

class ScrollOptions {
  width = 8;
  track = 0.1;
  trackHover = 0.1;
  thumb = 0.25;
  thumbHover = 0.33;
  all? = false;
  constructor(options?: IScrollOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }
  get styleStr() {
    return `${!this.all ? '@media(pointer: fine) {' : ''}
::-webkit-scrollbar {
  width: ${this.width}px;
}
::-webkit-scrollbar-track {
  background: rgba(255,255,255,${this.track});
}
::-webkit-scrollbar-track:hover {
  background: rgba(255,255,255,${this.trackHover});
}
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,${this.thumb});
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,${this.thumbHover});
}
.inner-scroll {
  scrollbar-width: thin;
}
${!this.all ? '}' : ''}`;
  }
}

@Directive({
  selector: '[scrollbar]',
})
export class ScrollbarDirective implements OnInit {
  @Input() scrollbar: ScrollOptions;
  hostElement: HTMLElement;

  constructor(public elementRef: ElementRef) {}

  ngOnInit() {
    this.hostElement = this.elementRef.nativeElement;
    if (
      this.hostElement &&
      this.hostElement.tagName &&
      this.hostElement.tagName == 'ION-CONTENT'
    ) {
      const el = document.createElement('style');
      this.scrollbar = new ScrollOptions(this.scrollbar);
      el.innerText = this.scrollbar.styleStr;
      this.hostElement.shadowRoot.appendChild(el);
    }
  }
}
