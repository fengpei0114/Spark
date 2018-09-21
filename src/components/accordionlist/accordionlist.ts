import { Component, ElementRef, Input, Renderer, ViewChild } from '@angular/core';

/**
 * Generated class for the AccordionlistComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'accordionlist',
  templateUrl: 'accordionlist.html'
})
export class AccordionlistComponent {

    @Input() headerColor: string = '#F53D3D';
    @Input() textColor: string = '#FFF';
    @Input() contentColor: string = '#FFF';
    @Input() title: string;
    @Input() hasMargin: boolean = true;

    @ViewChild('accordionContent') elementView: ElementRef;

    expanded: boolean = true;
    viewHeight: number;

    constructor(public renderer: Renderer) { }

    ngAfterViewInit() {
        this.viewHeight = this.elementView.nativeElement.offsetHeight;
        this.renderer.setElementStyle(this.elementView.nativeElement, 'height', 100 +'%');
    }

    toggleAccordion() {
        this.expanded = !this.expanded;
        const newHeight = this.expanded ? '100%' : '0px';
        this.renderer.setElementStyle(this.elementView.nativeElement, 'height', newHeight);
    }

}
