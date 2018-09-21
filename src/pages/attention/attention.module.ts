import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttentionPage } from './attention';
import { AttentionPonitNamePipe } from '../../pipes/attention-ponit-name/attention-ponit-name';

@NgModule({
  declarations: [
    AttentionPage,AttentionPonitNamePipe
  ],
  imports: [
    IonicPageModule.forChild(AttentionPage),
  ],
  exports: [
    AttentionPage
  ]
})
export class AttentionPageModule {}
