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
import { Storage } from '@ionic/storage';

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
    test:any;
    EquipmentArray = [{
        "deviceId":"1",
        "factoryName":"XXX厂",
        "status":{
            "power":"关",
            "running":"正常",
            "malfunction":"无",
        },
        "alarmMsg":{
            "alarmsum":"14",
            "alarmtimeStartTime":"Wed May 22 2019 09:29:04 GMT+0800",
            "malfunctionsum":"14",
            "malfunctiontimeTime":"Wed May 22 2019 09:29:04 GMT+0800",
            "sittingsum":"345345",
            "sittingtimeEnd":"Wed May 22 2019 09:29:04 GMT+0800",
        },
        "statusMsg":{
            "battery":"12",
            "probe1":"开启",
            "probe2":"开启",
            "extinguish1":"开启",
            "extinguish2":"开启",
            "relay1":"开启",
            "relay2":"开启",
        },
    },

    {
        "deviceId":"2",
        "factoryName":"XXX厂",
        "status":{
            "power":"开",
            "running":"异常",
            "malfunction":"无",
        },
        "alarmMsg":{
            "alarmsum":"14",
            "alarmtimeStartTime":"Wed May 22 2019 09:29:04 GMT+0800",
            "malfunctionsum":"14",
            "malfunctiontimeTime":"Wed May 22 2019 09:29:04 GMT+0800",
            "sittingsum":"345345",
            "sittingtimeEnd":"Wed May 22 2019 09:29:04 GMT+0800",
        },
        "statusMsg":{
            "battery":"12",
            "probe1":"开启",
            "probe2":"开启",
            "extinguish1":"开启",
            "extinguish2":"开启",
            "relay1":"开启",
            "relay2":"开启",
        },
    },
    {
        "deviceId":"3",
        "factoryName":"XXX厂",
        "status":{
            "power":"开",
            "running":"正常",
            "malfunction":"有",
        },
        "alarmMsg":{
            "alarmsum":"14",
            "alarmtimeStartTime":"Wed May 22 2019 09:29:04 GMT+0800",
            "malfunctionsum":"14",
            "malfunctiontimeTime":"Wed May 22 2019 09:29:04 GMT+0800",
            "sittingsum":"345345",
            "sittingtimeEnd":"Wed May 22 2019 09:29:04 GMT+0800",
        },
        "statusMsg":{
            "battery":"12",
            "probe1":"开启",
            "probe2":"开启",
            "extinguish1":"开启",
            "extinguish2":"开启",
            "relay1":"开启",
            "relay2":"开启",
        },
    },
    {
        "deviceId":"4",
        "factoryName":"XXX厂",
        "status":{
            "power":"开",
            "running":"正常",
            "malfunction":"无",
        },
        "alarmMsg":{
            "alarmsum":"14",
            "alarmtimeStartTime":"Wed May 22 2019 09:29:04 GMT+0800",
            "malfunctionsum":"14",
            "malfunctiontimeTime":"Wed May 22 2019 09:29:04 GMT+0800",
            "sittingsum":"345345",
            "sittingtimeEnd":"Wed May 22 2019 09:29:04 GMT+0800",
        },
        "statusMsg":{
            "battery":"12",
            "probe1":"开启",
            "probe2":"开启",
            "extinguish1":"开启",
            "extinguish2":"开启",
            "relay1":"开启",
            "relay2":"开启",
        },
    },]
    // EquipmentArray:any;
    runstatus:any;

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
                private storage:Storage,
                // private elementREf:ElementRef,
                // private appConfig: AppConfig,
    ){
        this.storage.get('userId').then((userid)=>{
          this.userId=userid;
        })
        /**
         * 接口3 
         */
        this.EquipmentArray=[],
        this.InitData();
        // this.runstatus = this.EquipmentArray[0].status.running;
        // this.equipmentName = this.EquipmentArray[0].factoryName+" - 火花探测设备"+this.EquipmentArray[0].deviceId;
        
    }
    InitData(){
        console.log("123123");
        let url = "http://192.168.0.167:7002/Device/find/mobile_brief/byUserID";
        let body = {
            "userId":this.userId
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
            this.runstatus = this.EquipmentArray[0].status.running;
            this.equipmentName = this.EquipmentArray[0].factoryName+" - 设备"+this.EquipmentArray[0].deviceId
            console.log(this.EquipmentArray);
            console.log(this.equipmentName);
        })
    }
    ionViewDidEnter(){
        // this.EquipmentArray.forEach(x=>{
        //     x.alarmMsg.alarmtimeStartTime = new Date(Date.parse(x.alarmMsg.alarmtimeStartTime)).toLocaleString();
        //     x.alarmMsg.malfunctiontimeTime = new Date(Date.parse(x.alarmMsg.malfunctiontimeTime)).toLocaleString();
        //     x.alarmMsg.sittingtimeEnd = new Date(Date.parse(x.alarmMsg.sittingtimeEnd)).toLocaleString();
        // })
        /**
         * 获取年月日和时分秒
         */
        // this.EquipmentArray.forEach(e=>{
        //     e['alarmdate1'] = new Date(e.alarmMsg.alarmtimeStartTime).getFullYear()+"-"+(new Date(e.alarmMsg.alarmtimeStartTime).getMonth()+1)+"-"+new Date(e.alarmMsg.alarmtimeStartTime).getDate(); 
        //     e['alarmdate2'] = new Date(e.alarmMsg.alarmtimeStartTime).getHours()+":"+new Date(e.alarmMsg.alarmtimeStartTime).getMinutes()+":"+new Date(e.alarmMsg.alarmtimeStartTime).getSeconds();
        //     e['maldate1'] = new Date(e.alarmMsg.malfunctiontimeTime).getFullYear()+"-"+(new Date(e.alarmMsg.malfunctiontimeTime).getMonth()+1)+"-"+new Date(e.alarmMsg.malfunctiontimeTime).getDate(); 
        //     e['maldate2'] = new Date(e.alarmMsg.malfunctiontimeTime).getHours()+":"+new Date(e.alarmMsg.malfunctiontimeTime).getMinutes()+":"+new Date(e.alarmMsg.malfunctiontimeTime).getSeconds();
        // })
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
        this.app.getRootNav().push(ChartPage,item);
    }
    personalMsg(){

    }
    slideChanged(){
        // console.log(this.EquipmentArray[this.slides.getActiveIndex()].id);
        this.equipmentName = this.EquipmentArray[this.slides.getActiveIndex()].factoryName+" - 设备"+this.EquipmentArray[this.slides.getActiveIndex()].deviceId;
        // this.equipmentName = this.EquipmentArray[0].factoryName+"火花探测设备"+this.EquipmentArray[0].deviceId;
        this.runstatus = this.EquipmentArray[this.slides.getActiveIndex()].status.running;
    }
}

