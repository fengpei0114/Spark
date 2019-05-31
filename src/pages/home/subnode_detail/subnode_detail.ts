import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, App } from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import {NativeService} from "../../../providers/native-service/native-service";

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-subnodedetail',
  templateUrl: 'subnode_detail.html',
})
export class SubNodeDetailPage {
    subnodeId:number;
    DeviceId:string;
    installpoint:string;
    subnode_alarmnum:number;
    subnode_noconfirmalarm:number;
    subnode_malnum:number;
    subnode_noconfirmmal:number;
    subnode_detectornum:number;
    subnode_valvenum:number;
    subnode_detector_1:number;
    subnode_detector_2:number;
    subnode_detector_3:number;
    subnode_detector_4:number;
    subnode_valve_1:number;
    subnode_valve_2:number;
    subnode_valve_3:number;
    subnode_valve_4:number;

    constructor(public http:Http,
                public app:App,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,
                private nativeService:NativeService,

    ) {
        // this.name = this.navParams.data;
        this.subnodeId = this.navParams.data.subnodeID;
        this.DeviceId = this.navParams.data.DeviceId;
        console.log(this.subnodeId+"  "+this.DeviceId);
        this.InitData();
        // this.installpoint = this.navParams.data.installpoint;
        // this.subnode_alarmnum = this.navParams.data.subnode_alarmnum;
        // this.subnode_noconfirmalarm = this.navParams.data.subnode_noconfirmalarm;
        // this.subnode_malnum = this.navParams.data.subnode_malnum;
        // this.subnode_noconfirmmal = this.navParams.data.subnode_noconfirmmal;
        // this.subnode_detectornum = this.navParams.data.subnode_detectornum;
        // this.subnode_valvenum = this.navParams.data.subnode_valvenum;
        // this.subnode_detector_1 = this.navParams.data.subnode_detector_1;
        // this.subnode_detector_2 = this.navParams.data.subnode_detector_2;
        // this.subnode_detector_3 = this.navParams.data.subnode_detector_3;
        // this.subnode_detector_4 = this.navParams.data.subnode_detector_4;
        // this.subnode_valve_1 = this.navParams.data.subnode_valve_1;
        // this.subnode_valve_2 = this.navParams.data.subnode_valve_2;
        // this.subnode_valve_3 = this.navParams.data.subnode_valve_3;
        // this.subnode_valve_4 = this.navParams.data.subnode_valve_4;
    }
    InitData(){
      this.nativeService.showLoading("数据加载中...");
        let url = this.httpService.getUrl()+"/Subnode/find/bySubnodeID";
        let body = {
            // "DeviceId":this.DeviceId,
            "subnodeID":this.subnodeId
        }
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
            this.installpoint = data.installpoint;
            this.subnode_alarmnum = data.alarmsum;
            this.subnode_noconfirmalarm = data.unconfirmedalarmsum;
            this.subnode_malnum = data.malfunctionsum;
            this.subnode_noconfirmmal = data.unconfirmedmalsum;
            this.subnode_detectornum = data.detectornum;
            this.subnode_valvenum = data.valvenum;
            this.subnode_detector_1 = data.detector1;
            this.subnode_detector_2 = data.detector2;
            this.subnode_detector_3 = data.detector3;
            this.subnode_detector_4 = data.detector4;
            this.subnode_valve_1 = data.valve1;
            this.subnode_valve_2 = data.valve2;
            this.subnode_valve_3 = data.valve3;
            this.subnode_valve_4 = data.valve4;
          this.nativeService.hideLoading();
        },error=> {

            this.nativeService.hideLoading();
            this.nativeService.showToast("数据获取失败！");
            // this.malfunctionArray = this.dataArray;
          })
    }
    ionViewDidEnter(){
        
    }
    setup(){
        
    }
    getdetailMsg(item){
        
    }
}
