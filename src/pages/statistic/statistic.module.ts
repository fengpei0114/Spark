import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticPage } from './statistic';
import { StatisticDetailPage } from './statistic-detail/statistic-detail';
import { PopoverPage } from './popover/popover';
import { AccordionlistComponentModule } from '../../components/accordionlist/accordionlist.module';
import { AppTreeComponentModule } from '../../components/app-tree/app-tree.module';

@NgModule({
  declarations: [
    StatisticPage, StatisticDetailPage, PopoverPage
  ],
  imports: [

    IonicPageModule.forChild(StatisticPage),
    AccordionlistComponentModule,
    AppTreeComponentModule,
  ],
  exports: [
    StatisticPage, StatisticDetailPage
  ],
  entryComponents: [StatisticDetailPage, PopoverPage],
})
export class StatisticPageModule {}
