import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccordionlistComponent } from './accordionlist';

@NgModule({
  declarations: [
    AccordionlistComponent,
  ],
  imports: [
    IonicPageModule.forChild(AccordionlistComponent),
  ],
  exports: [
    AccordionlistComponent
  ]
})
export class AccordionlistComponentModule {}
