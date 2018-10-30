import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDelay]'
})
export class DelayDirective implements OnInit {
  @Input() appDelay: number;

  constructor(
    public template: TemplateRef<any>,
    public view: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    setTimeout(_ => this.view.createEmbeddedView(this.template), this.appDelay * 100);
  }

}
