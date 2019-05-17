import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { PopoverPage } from './popover/popover'
import { AlarmdetailPage } from './alarm_detail/alarm_detail';
// import { PopoverPage } from './popover/popover'

import { StatusFilterPipe } from '../../pipes/status-filter/status-filter';
import { MaldetailPage } from './mal_detail/mal_detail';

@NgModule({
  declarations: [
    MapPage,PopoverPage,AlarmdetailPage,MaldetailPage,StatusFilterPipe,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
  ],
  exports: [
    MapPage,PopoverPage,AlarmdetailPage,MaldetailPage
  ],
  entryComponents:[
    MapPage,PopoverPage,AlarmdetailPage,MaldetailPage
  ]
})
export class MapPageModule {}
