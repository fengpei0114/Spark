import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginationPage } from './pagination';

@NgModule({
  declarations: [
      PaginationPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginationPage),
  ],
  exports: [
      PaginationPage
  ]
})
export class PaginationComponentModule {}
