import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MapPage } from './map/map';
import { DevicePage } from './device/device';
import { UserInfoPage } from './user-info/user-info';
import { UserInfoEditPage } from './user-info-edit/user-info-edit';
import { StatisticOfHomePage } from  './statistic-of-home/statistic-of-home';
import { EquipmentPage } from './equipment/equipment'
import { NameLengthPipe } from '../../pipes/name-length/name-length';
import { AccordionlistComponentModule } from '../../components/accordionlist/accordionlist.module';
import { AppTreeComponentModule } from '../../components/app-tree/app-tree.module';
@NgModule({


  declarations: [
    HomePage, MapPage, DevicePage, StatisticOfHomePage ,UserInfoPage, UserInfoEditPage, EquipmentPage, NameLengthPipe
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
        MapPage,DevicePage,UserInfoPage, UserInfoEditPage, StatisticOfHomePage, EquipmentPage,
    ],

})
export class HomePageModule {}
