import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MapPage } from './map/map';
import { DevicePage } from './device/device';
import { UserInfoPage } from './user-info/user-info';
import { UserInfoEditPage } from './user-info-edit/user-info-edit';
import { StatisticOfHomePage } from  './statistic-of-home/statistic-of-home';
import { EquipmentPage } from './equipment/equipment'
import { HistoryPage } from './history/history';
import { MalfunctionPage } from './malfunction/malfunction';
import { NameLengthPipe } from '../../pipes/name-length/name-length';
import { HistorydetailPage } from './history_detail/history_detail';
import { MalfunctiondetailPage } from './malfunction_detail/malfunction_detail'
import { AccordionlistComponentModule } from '../../components/accordionlist/accordionlist.module';
import { AppTreeComponentModule } from '../../components/app-tree/app-tree.module';

@NgModule({


  declarations: [
    HomePage, MapPage, DevicePage, StatisticOfHomePage ,UserInfoPage, UserInfoEditPage, EquipmentPage, HistoryPage, MalfunctionPage, HistorydetailPage, MalfunctiondetailPage, NameLengthPipe
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
      AccordionlistComponentModule,
      AppTreeComponentModule,
  ],
  exports: [
    HomePage
  ],
    entryComponents:[
        MapPage,DevicePage,UserInfoPage, UserInfoEditPage, StatisticOfHomePage, EquipmentPage, HistoryPage, MalfunctionPage, HistorydetailPage, MalfunctiondetailPage,
    ],

})
export class HomePageModule {}
