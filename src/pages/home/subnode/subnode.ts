import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import {Color} from "highcharts";
import {SubNodeDetailPage} from "../subnode_detail/subnode_detail"

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-subnode',
  templateUrl: 'subnode.html',
})
export class SubNodePage {
    DeviceId:string;
    pageNum:number = 0;
    name:any;
    pagesizenow:number = 10;
    subnodeMsg = [{
        "subnodeId":"1",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"2",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"0",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"1",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"1",
        "subnode_valve_4":"1",
    },{
        "subnodeId":"2",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"3",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"4",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"5",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"6",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"7",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"8",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"9",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"10",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    },{
        "subnodeId":"11",
        "installpoint":"XXX",
        "subnode_alarmnum":"23",
        "subnode_noconfirmalarm":"12",
        "subnode_malnum":"1",
        "subnode_noconfirmmal":"1",
        "subnode_detectornum":"4",
        "subnode_valvenum":"4",
        "subnode_detector_1":"1",
        "subnode_detector_2":"1",
        "subnode_detector_3":"1",
        "subnode_detector_4":"0",
        "subnode_valve_1":"1",
        "subnode_valve_2":"1",
        "subnode_valve_3":"0",
        "subnode_valve_4":"0",
    }];

    constructor(public http:Http,
                public app:App,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        
        this.DeviceId = this.navParams.data;
        this.name = "设备"+this.DeviceId;
        console.log("123"+this.DeviceId);
        this.subnodeMsg = [];
        this.InitData();
    }
    setup(){
        
    }
    InitData(){
        console.log("initDate");
        let url = "http://192.168.0.167:7002/Subnode/find/byDeviceID";
        let body = {
            "DeviceId":this.DeviceId,
            "pageSize":10,
            "pageNum":1,
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
            this.subnodeMsg = data.content;
        })
    }
    ionViewDidEnter(){
        
    }

    getdetailMsg(item){
        item.DeviceId = this.DeviceId;
        // let data :any;
        // data.subnodeID = item;
        // data.DeviceId = this.DeviceId;
        // console.log(data);
        this.app.getRootNav().push(SubNodeDetailPage,item);
    }

    doInfinite1(infiniteScroll){
        console.log('Begin async operation');
        console.log(infiniteScroll._scrollY);
        console.log(infiniteScroll.scrollHeight);
        let url = this.httpService.getUrl() + "";
        let body = {
            "DeviceId":this.DeviceId,
            "pageSize":10,
            "pageNum":this.pageNum,
        }
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        setTimeout(()=>{
            if(this.pagesizenow < 10){
                infiniteScroll.enable(false);
            }
            this.http.post(url,JSON.stringify(body),options).map(res=>res.json()).subscribe(data =>{
                console.log(data);
                this.pagesizenow = 0;
                data.content.forEach((x)=>{
                    this.pagesizenow++;
                })  
                if(this.pagesizenow == 0){
                    infiniteScroll.enable(false);
                }else{
                    this.subnodeMsg = data;
                }
            })
        console.log('Async operation has ended');
        infiniteScroll.complete();
        },500);
        }

}
