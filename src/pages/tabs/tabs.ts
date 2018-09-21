import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {HomePage} from '../home/home';
import {AttentionPage} from '../attention/attention';
import {UploadPage} from '../upload/upload';
import {StatisticPage} from "../statistic/statistic";
import {TaskPage} from "../task/task";
/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  homeRoot = HomePage;
  attentionRoot = AttentionPage;
  uploadRoot = UploadPage;
  statisticRoot = StatisticPage;
  taskRoot = TaskPage;


  constructor(public navCtrl: NavController) {}

}
