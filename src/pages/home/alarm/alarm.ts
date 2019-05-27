import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,ToastController} from 'ionic-angular';
import { HttpService } from '../../../providers/http-service/http-service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeService } from '../../../providers/native-service/native-service'
import { Header } from 'ionic-angular/components/toolbar/toolbar-header';
import { AccountService } from '../../../providers/account-service/account-service'
import {DatePipe} from "@angular/common";
/**
 * Generated class for the AlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
})
export class AlarmPage {
    pageSize: number = 0;
    pageNum: number = 0;
    pageOther: number = 0;
    dataArray=[
        {
          "alarmID":"01",
          "alarmType":"1",
          "alarmTime":"2018-08-01 15:54:52.03",
          "grade":"1",
          "isConfirmed":"1",
          "alarmDetectors":"1号探头",
        },{
          "alarmID":"02",
          "alarmType":"1",
          "alarmTime":"2018-08-01 15:54:52.03",
          "grade":"1",
          "isConfirmed":"1",
          "alarmDetectors":"1号探头",
        },{
          "alarmID":"03",
          "alarmType":"1",
          "alarmTime":"2018-08-01 15:54:52.03",
          "grade":"1",
          "isConfirmed":"1",
          "alarmDetectors":"1号探头",
        },{
          "alarmID":"04",
          "alarmType":"1",
          "alarmTime":"2018-08-01 15:54:52.03",
          "grade":"1",
          "isConfirmed":"0",
          "alarmDetectors":"1号探头",
        },{
          "alarmID":"05",
          "alarmType":"1",
          "alarmTime":"2018-08-01 15:54:52.03",
          "grade":"1",
          "isConfirmed":"0",
          "alarmDetectors":"1号探头",
        },{
          "alarmID":"06",
          "alarmType":"1",
          "alarmTime":"2018-08-01 15:54:52.03",
          "grade":"1",
          "isConfirmed":"0",
          "alarmDetectors":"1号探头",
        } ]
      name:string;
      deviceId:string;
      pagesizenow:number;
      alarmId:any;
      alarmNum:any;
      unconfirmAlarmNum:any;
      lastConfirmTime:any;
      errorMsg:any;
      confirmNum:number;
      alarmMsg:any;
      unconfirmNum:number;
      alarmArray:Array<any> =[];



  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public httpService: HttpService,
            public http: Http,
            public accountService:AccountService,
            private alertCtrl:AlertController,
            public toastCtrl: ToastController,
            private nativeService:NativeService,) {
                console.log(this.httpService.getUrl());
                this.alarmMsg = this.navParams.data.alarmMsg;
                console.log(this.alarmMsg);
    this.name = this.navParams.data.name;
    this.deviceId = this.navParams.data.deviceId;
    this.unconfirmAlarmNum = this.navParams.data.unconfirmedAlarmSum;
    // this.alarmNum = this.navParams.data.alarmsum;
    // this.confirmNum = this.alarmNum - this.unconfirmAlarmNum;
    // this.alarmTime = this.alarm
      this.dataInit();
      console.log(this.dataArray);
  }

  /**
   *  6. 获取设备警报信息
   */
  dataInit(){
    this.nativeService.showLoading("数据加载中...")
    let url = "http://192.168.0.167:7002/Alarm/find/brief/byDeviceID";
    let body = {
        "DeviceId":this.deviceId,
        "pageSize":10,
        "pageNum":1,
    }
    let headers = new Headers({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
    })
    let options = new RequestOptions({
        headers: headers
    });
    this.http.post(url,JSON.stringify(body),options).map(res => res.json()).subscribe(data =>{
        this.nativeService.hideLoading();
        data.forEach(x=>{
          console.log( x.grade);
          var d=(new Date(x.alarmtime));
          x.alarmtime=d.toLocaleDateString()+"  "+d.toLocaleTimeString();
          d=(new Date(x.endtime));
          x.endtime=d.toLocaleDateString()+"  "+d.toLocaleTimeString();
        })
        this.nativeService.hideLoading();
        this.alarmArray = data;
        console.log(this.alarmArray);
    },
      error=> {

        this.nativeService.hideLoading();
        this.nativeService.showToast("数据获取失败！");
        this.alarmArray = this.dataArray;
      })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }

    doInfinite(infiniteScroll){

        console.log('Begin async operation');
        console.log(infiniteScroll._scrollY);
        console.log(infiniteScroll.scrollHeight);
        setTimeout(()=>{
            this.pageNum++;
            console.log(this.pageNum);
            if(this.pageNum<this.pageSize){
                for(var i = 0;i<10;i++){
                    this.dataArray.push(this.alarmArray[i+this.pageNum*10]);
                }
            }else if(this.pageNum==this.pageSize){
                for(i = 0;i<this.pageOther;i++){
                    this.dataArray.push(this.alarmArray[i+this.pageNum*10]);
                }
            }else{
                infiniteScroll.enable(false);
            }

            console.log('Async operation has ended');
            infiniteScroll.complete();
        },500);
    }

    doInfinite1(infiniteScroll){
        
                console.log('Begin async operation');
                console.log(infiniteScroll._scrollY);
                console.log(infiniteScroll.scrollHeight);
                let url = this.httpService.getUrl() + "";
                let body = "DeviceId="+this.deviceId+"&pageSize=10&pageNum"+this.pageNum;
                let headers = new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                });
                let options = new RequestOptions({
                    headers: headers
                });
                setTimeout(()=>{
                        this.http.post(url,body,options).map(res=>res.json()).subscribe(data =>{
                            console.log(data);
                            if(this.pagesizenow < 10){
                                infiniteScroll.enable(false);
                            }
                            this.pagesizenow = 0;
                            data.content.forEach((x)=>{
                                this.pagesizenow++;
                            })  
                            if(this.pagesizenow == 0){
                                infiniteScroll.enable(false);
                            }else{
                                for(let i = 0 ; i < this.pagesizenow; i++){
                                    this.dataArray.push(data.content[i]);
                                }
                            }
                        })
                    console.log('Async operation has ended');
                    infiniteScroll.complete();
                },500);
            }
            OncomfirmClick(item)
            {
                const prompt = this.alertCtrl.create({
                    title: '确认故障',
                    message: "确认设备故障",
                    inputs: [
                        {
                            type:'text',
                            name: 'note',
                            placeholder: '备注'
                        },
                    ],
                    buttons: [
                        {
                            text: '取消',
                            handler: data => {
                            }
                        },
                        {
                            text: '确认',
                            handler: data => {
                                this.comfirmAlarmfunction(data,item);
                            }
                        }
                    ]
                });
                prompt.present();
            }
        
            comfirmAlarmfunction(comfirmData,item) {
                console.log(comfirmData.note);
                let url = "http://192.168.0.167:7002/Alarm/update/confirm/single";
                let body = {
                    "userName":"1233",
                    "alarmID":item.alarmID,
                    "Plantform":"移动端",
                    "note":comfirmData.note,
                }
                let headers = new Headers({
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Accept': 'application/json'
                });
                let options = new RequestOptions({
                    headers:headers
                })
                this.http.post(url,JSON.stringify(body),options).map(res=>res.json()).subscribe(data=>{
                    console.log(data);
                    if(data.status=="0"){
                        console.log("status==0")
                        const prompt = this.alertCtrl.create({
                            title: '确认失败',
                            message: data.Msg,
                            buttons: [
                                {
                                    text: '确认',
                                    handler: data => {
                                    }
                                }
                            ]
                        });
                        prompt.present();
                    }else{
                        this.pageNum--;
                        this.dataInit();
                    }                
                },err =>{
                    //设置输入错误提示
                    console.log("status==0")
                    const prompt = this.alertCtrl.create({
                        title: '确认失败',
                        message: '网络连接错误',
                        buttons: [
                            {
                                text: '确认',
                                handler: data => {
                                }
                            }
                        ]
                    });
                    prompt.present();
                });
            }
}
