import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPage } from './upload';
 import { TakePhotoPage } from './take-photo/take-photo';

@NgModule({
    entryComponents:[
        TakePhotoPage
    ],
    declarations: [
        UploadPage,TakePhotoPage
    ],
    imports: [
        IonicPageModule.forChild(UploadPage),
    ],
    exports: [
        UploadPage,TakePhotoPage
    ],
})
export class UploadPageModule {}
