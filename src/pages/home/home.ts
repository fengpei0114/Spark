import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, App, Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpService } from '../../providers/http-service/http-service';
import { MapPage } from './map/map';
import { DevicePage } from './device/device';
import { UserInfoPage } from './user-info/user-info';
import { StatisticOfHomePage } from './statistic-of-home/statistic-of-home';
import { AccountService } from '../../providers/account-service/account-service';
import { TakePhotoPage } from '../upload/take-photo/take-photo';
import { TaskPage } from '../task/task';
import { OrganizationServiceProvider } from "../../providers/organization-service/organization-service";

import 'rxjs/add/operator/map';
import { EquipmentPage } from './equipment/equipment';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OrganizationServiceProvider]
})
export class HomePage implements OnInit{

    // @ViewChild('organSelect') organSelect:ElementRef;

    @Output() organizationOut = new EventEmitter();
    @Output() projectOut = new EventEmitter();
    

    // 测试树形结构

    menu:Array<object> = [];


    constructor(public navParams: NavParams,
                public app: App,
                public menuCtrl: MenuController,
                public nav: NavController,
                public http: Http,
                public events: Events,
                public organService: OrganizationServiceProvider,
                private toastCtrl: ToastController,
                public httpService: HttpService,
                private accountService: AccountService,
                // private elementREf:ElementRef,
                // private appConfig: AppConfig,
    ){
        // 订阅组织机构选中事件

    }

    //初始化数据
    setUp() {

    }

    // openMenu(): void{
    //     this.menuCtrl.open();
    // }

    ngOnInit() {

    }
    checkEquipment(){
        this.app.getRootNav().push(EquipmentPage);
    }
    staticOfHome(){

    }
    runningHistory(){

    }
    personalMsg(){

    }
}

