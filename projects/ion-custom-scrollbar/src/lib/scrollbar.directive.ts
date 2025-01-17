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
    return `
@media (prefers-color-scheme: dark) ${!this.all ? 'and (pointer: fine)' : ''} {
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
}
@media (prefers-color-scheme: light) ${!this.all ? 'and (pointer: fine)' : ''} {
  ::-webkit-scrollbar {
    width: ${this.width}px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,${this.track});
  }
  ::-webkit-scrollbar-track:hover {
    background: rgba(0,0,0,${this.trackHover});
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,${this.thumb});
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0,${this.thumbHover});
  }
}
.inner-scroll {
  scrollbar-width: thin;
}
`;
  }
}

@Directive({
  selector: 'ion-app, ion-content',
})
export class ScrollbarDirective implements OnInit {
  @Input() scrollbar: ScrollOptions | null | 'null';
  hostElement: HTMLElement;

  constructor(public elementRef: ElementRef) {}

  ngOnInit() {
    // enabled by default; disabled if scrollbar="null"
    if (
      typeof this.scrollbar !== 'undefined' &&
      (this.scrollbar === null || this.scrollbar === 'null')
    ) {
      return;
    }
    // create style element
    const el = document.createElement('style');
    this.scrollbar = new ScrollOptions(this.scrollbar);
    el.innerText = this.scrollbar.styleStr;
    // append
    this.hostElement = this.elementRef.nativeElement;
    if (this.hostElement && this.hostElement.tagName) {
      if (this.hostElement.tagName == 'ION-CONTENT') {
        // append style to ion-content's shadow-root
        this.hostElement.shadowRoot.appendChild(el);
      } else {
        // append style to any component that gets selected
        this.hostElement.appendChild(el);
      }
    }
  }
}
