import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { PopoverPage } from './popover/popover'
import { AlarmdetailPage } from './alarm_detail/alarm_detail';
import { StatusFilterPipe } from '../../pipes/status-filter/status-filter'
// import { PopoverPage } from './popover/popover'

@NgModule({
  declarations: [
    MapPage,PopoverPage,AlarmdetailPage,StatusFilterPipe,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
  ],
  exports: [
    MapPage,PopoverPage,AlarmdetailPage
  ],
  entryComponents:[
    MapPage,PopoverPage,AlarmdetailPage
  ]
})
export class MapPageModule {}
