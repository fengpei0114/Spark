import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, App, Events, Slides } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpService } from '../../providers/http-service/http-service';
import { AccountService } from '../../providers/account-service/account-service';
import { OrganizationServiceProvider } from "../../providers/organization-service/organization-service";
import { MalfunctionPage } from './malfunction/malfunction'

import 'rxjs/add/operator/map';
import { EquipmentPage } from './equipment/equipment';
import { HistoryPage } from './history/history';
import { MalfunctiondetailPage } from './malfunction_detail/malfunction_detail';
import { HistorydetailPage } from './history_detail/history_detail';
import { AlarmPage } from './alarm/alarm';
import { SubNodePage } from './subnode/subnode'
import { StatusPage } from './status/status';
import { ConfigHistoryPage } from './config_history/config_history'
import { ChartPage } from './chart/chart';

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
    @ViewChild(Slides) slides: Slides;
    // @ViewChild('organSelect') organSelect:ElementRef;

    @Output() organizationOut = new EventEmitter();
    @Output() projectOut = new EventEmitter();
    


    menu:Array<object> = [];
    equipmentName:string;
    userId:string;

    // EquipmentArray = [{
    //     "name":"XXX厂-火花探测设备1",
    //     "id":"1",
    //     "factoryname":"XXX厂",
    //     "status":{
    //         "power":"关",
    //         "running":"正常",
    //         "malfunction":"无",
    //     },
    //     "alarmMsg":{
    //         "alarmsum":"14",
    //         "alarmtimeStartTime":"2018/10/22 12:30:04",
    //         "malfunctionsum":"14",
    //         "malfunctiontimeTime":"2018/10/22 12:30:04",
    //         "sittingsum":"345345",
    //         "sittingtimeEnd":"2018-08-05 15:57:39",
    //     },
    //     "statusMsg":{
    //         "battery":"12",
    //         "probe1":"开启",
    //         "probe2":"开启",
    //         "extinguish1":"开启",
    //         "extinguish2":"开启",
    //         "relay1":"开启",
    //         "relay2":"开启",
    //     },
    // },

    // {
    //     "name":"XXX厂-火花探测设备2",
    //     "id":"2",
    //     "factoryname":"XXX厂",
    //     "status":{
    //         "power":"开",
    //         "running":"异常",
    //         "malfunction":"无",
    //     },
    //     "alarmMsg":{
    //         "alarmsum":"14",
    //         "alarmtimeStartTime":"2018/10/22 12:30:04",
    //         "malfunctionsum":"14",
    //         "malfunctiontimeTime":"2018/10/22 12:30:04",
    //         "sittingsum":"345345",
    //         "sittingtimeEnd":"2018-08-05 15:57:39",
    //     },
    //     "statusMsg":{
    //         "battery":"12",
    //         "probe1":"开启",
    //         "probe2":"开启",
    //         "extinguish1":"开启",
    //         "extinguish2":"开启",
    //         "relay1":"开启",
    //         "relay2":"开启",
    //     },
    // },
    // {
    //     "name":"XXX厂-火花探测设备3",
    //     "id":"3",
    //     "factoryname":"XXX厂",
    //     "status":{
    //         "power":"开",
    //         "running":"正常",
    //         "malfunction":"有",
    //     },
    //     "alarmMsg":{
    //         "alarmsum":"14",
    //         "alarmtimeStartTime":"2018/10/22 12:30:04",
    //         "malfunctionsum":"14",
    //         "malfunctiontimeTime":"2018/10/22 12:30:04",
    //         "sittingsum":"345345",
    //         "sittingtimeEnd":"2018-08-05 15:57:39",
    //     },
    //     "statusMsg":{
    //         "battery":"12",
    //         "probe1":"开启",
    //         "probe2":"开启",
    //         "extinguish1":"开启",
    //         "extinguish2":"开启",
    //         "relay1":"开启",
    //         "relay2":"开启",
    //     },
    // },
    // {
    //     "name":"XXX厂-火花探测设备4",
    //     "id":"4",
    //     "factoryname":"XXX厂",
    //     "status":{
    //         "power":"开",
    //         "running":"正常",
    //         "malfunction":"无",
    //     },
    //     "alarmMsg":{
    //         "alarmsum":"14",
    //         "alarmtimeStartTime":"2018/10/22 12:30:04",
    //         "malfunctionsum":"14",
    //         "malfunctiontimeTime":"2018/10/22 12:30:04",
    //         "sittingsum":"345345",
    //         "sittingtimeEnd":"2018-08-05 15:57:39",
    //     },
    //     "statusMsg":{
    //         "battery":"12",
    //         "probe1":"开启",
    //         "probe2":"开启",
    //         "extinguish1":"开启",
    //         "extinguish2":"开启",
    //         "relay1":"开启",
    //         "relay2":"开启",
    //     },
    // },]
    EquipmentArray:any;

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

        /**
         * 接口3
         */
        this.EquipmentArray=[],
        this.InitData();


        this.userId = this.navParams.data;
        console.log("123");
        console.log(this.httpService.getUrl());
        // this.equipmentName = this.EquipmentArray[0].name;
        // this.ArrayMsg=[],
        // this.EquipmentArray=[],
        console.log("123");
        // console.log(this.ArrayMsg);
        
        
    }
    InitData(){
        let url = "http://192.168.0.167:7002/Device/find/mobile_brief/byUserID";
        let body = {
            "userId":1
        };
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,JSON.stringify(body),options).map(res => res.json()).subscribe(data =>{
            console.log(data);
            
            
            data.forEach(x=>{
                x.alarmMsg.alarmtimeStartTime = new Date(Date.parse(x.alarmMsg.alarmtimeStartTime)).toLocaleString();
                x.alarmMsg.malfunctiontimeTime = new Date(Date.parse(x.alarmMsg.malfunctiontimeTime)).toLocaleString();
                x.alarmMsg.sittingtimeEnd = new Date(Date.parse(x.alarmMsg.sittingtimeEnd)).toLocaleString();
            })
            this.EquipmentArray = data;
            this.equipmentName = this.EquipmentArray[0].factoryName;
            // this.ArrayMsg.push(data);
            console.log(this.EquipmentArray);
            console.log(this.equipmentName);
        })
    }
    ionViewDidEnter(){
    }
    //初始化数据
    setUp() {

    }

    // openMenu(): void{
    //     this.menuCtrl.open();
    // }
    openMenu(): void{
        this.menuCtrl.open();
    }
    ngOnInit() {

    }
    checkAlarm(item){
        this.app.getRootNav().push(AlarmPage,item);
    }
    staticOfHome(){

    }
    checkStatus(item){
        this.app.getRootNav().push(ConfigHistoryPage,item);
    }
    checkmalfunction(item){
        this.app.getRootNav().push(MalfunctionPage,item);
        // this.app.getRootNav().push(MalfunctionPage);
    }
    getSubNode(item){
        console.log("home"+item);
        this.app.getRootNav().push(SubNodePage,item);
        // this.app.getRootNav().push(SafetySupervisionPage);
    }
    getChart(item){
        this.app.getRootNav().push(ChartPage,item.id);
    }
    personalMsg(){

    }
    slideChanged(){
        console.log(this.EquipmentArray[this.slides.getActiveIndex()].id);
        this.equipmentName = this.EquipmentArray[this.slides.getActiveIndex()].name;
    }
}

