import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MapPage } from './map/map';
import { DevicePage } from './device/device';
import { UserInfoPage } from './user-info/user-info';
import { UserInfoEditPage } from './user-info-edit/user-info-edit';
import { StatisticOfHomePage } from  './statistic-of-home/statistic-of-home';
import { EquipmentPage } from './equipment/equipment'
import { MalfunctionPage } from './malfunction/malfunction';
import { NameLengthPipe } from '../../pipes/name-length/name-length';
import { MalfunctiondetailPage } from './malfunction_detail/malfunction_detail'
import { AccordionlistComponentModule } from '../../components/accordionlist/accordionlist.module';
import { AlarmPage } from './alarm/alarm';
import { StatusPage } from './status/status';
import { ChangePasswordPage } from './change-password/change-password';
import { AppTreeComponentModule } from '../../components/app-tree/app-tree.module';
import { SubNodePage } from './subnode/subnode';
import { SubNodeDetailPage } from './subnode_detail/subnode_detail';
import { ConfigHistoryPage } from './config_history/config_history'

@NgModule({


  declarations: [
    HomePage, MapPage, DevicePage, StatisticOfHomePage ,UserInfoPage, UserInfoEditPage, EquipmentPage,  MalfunctionPage,  MalfunctiondetailPage, AlarmPage, StatusPage, ChangePasswordPage, NameLengthPipe,SubNodePage, SubNodeDetailPage,ConfigHistoryPage
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
      MapPage, DevicePage, StatisticOfHomePage ,UserInfoPage, UserInfoEditPage, EquipmentPage,  MalfunctionPage,  MalfunctiondetailPage, AlarmPage, StatusPage, ChangePasswordPage, SubNodePage, SubNodeDetailPage,ConfigHistoryPage
    ],

})
export class HomePageModule {}
