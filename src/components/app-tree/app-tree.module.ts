import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppTreeComponent } from './app-tree';

@NgModule({
  declarations: [
    AppTreeComponent,
  ],
  imports: [
    IonicPageModule.forChild(AppTreeComponent),
  ],
  exports: [
    AppTreeComponent
  ]
})
export class AppTreeComponentModule {}
