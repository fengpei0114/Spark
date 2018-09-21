import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MenuPage } from './menu';
import { HelpPage } from './help/help';
import { AboutPage } from './about/about';
@NgModule({
  declarations: [
      MenuPage, HelpPage, AboutPage
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
  exports: [
      MenuPage, AboutPage, HelpPage
  ],
  entryComponents: [AboutPage, HelpPage],
})
export class MenuPageModule {}
