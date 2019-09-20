import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {HttpService} from '../../../providers/http-service/http-service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {NativeService} from '../../../providers/native-service/native-service'
import {Header} from 'ionic-angular/components/toolbar/toolbar-header';
import {AccountService} from '../../../providers/account-service/account-service'
import {DatePipe} from "@angular/common";
import {Storage} from '@ionic/storage';

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
  pageNum: number = 1;
  pageOther: number = 0;
  name: string;
  deviceId: string;
  pagesizenow: number;
  alarmId: any;
  alarmsum: number;
  unconfirmAlarmNum: any;
  lastConfirmTime: any;
  errorMsg: any;
  confirmsum: number;
  alarmMsg: any;
  roleId: string;
  unconfirmsum: number = 0;
  alarmArray: Array<any> = [];
  comfirmArray: Array<any> = [];
  username: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpService: HttpService,
              public http: Http,
              private storage: Storage,
              public accountService: AccountService,
              private alertCtrl: AlertController,
              public toastCtrl: ToastController,
              private nativeService: NativeService,) {
    console.log(this.httpService.getDeviceUrl());
    // this.alarmsum = this.navParams.data.alarmMsg.alarmsum;
    // this.unconfirmsum = this.navParams.data.alarmMsg.unconfirmedAlarmSum;
    this.deviceId = this.navParams.data.deviceId;
    this.storage.get('username').then((username) => {
      this.username = username;
    });
    this.storage.get('roleId').then(roleId => {
      this.roleId = roleId;
      if (this.roleId == "3" || this.roleId == "4") {
        this.alarmMsg = this.navParams.data.alarmMsg;
        console.log(this.alarmMsg);
        // this.alarmsum = this.navParams.data.alarmMsg.alarmsum;
        // this.unconfirmsum = this.navParams.data.alarmMsg.unconfirmedAlarmSum;
      } else if (this.roleId == "5") {
        // this.unconfirmsum = this.navParams.data.unconfirmedAlarmNum;
      }
      this.dataInit();
    });


  }

  dataInit() {
    this.nativeService.showLoading("数据加载中...")
    this.alarmArray=[];
    this.comfirmArray=[];
    this.getDataFromServer(1).then(res=>{
      console.log(res);
        // this.nativeService.hideLoading();
    },
      rej=>{
        this.nativeService.hideLoading();
        this.nativeService.showToast("数据获取失败！");
      }); //获取第一页数据
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }


  doInfinite(infiniteScroll) {
    if ((this.alarmArray.length+this.comfirmArray.length) % 10 != 0) //如果当前列表未满10，表明没有更多数据，不使用下拉功能
    {
      infiniteScroll.enable(false);
    } else {
      this.pageNum++; //当前页已满10条，将获取下一页数据
      this.getDataFromServer(this.pageNum).then(res=>{
        console.log(res);
        console.log('Async operation has ended');
        infiniteScroll.complete();
      },rej=>{
        infiniteScroll.complete();
        this.nativeService.showToast("数据获取失败！");
      }); //获取第N页数据

    }
  }

  getDataFromServer(pageNum:number):Promise<string>{
    let url = this.httpService.getDeviceUrl() + "/Alarm/find/brief/byDeviceID";
    let body = {
      "DeviceId": this.deviceId,
      "pageSize": 10,
      "pageNum": pageNum,
    }
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': 'application/json'
    })
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(url, JSON.stringify(body), options).map(res => res.json()).subscribe(data => {
        this.nativeService.hideLoading();
        data.forEach(x => {
          if (x.isconfirmed) {
            var d = (new Date(x.alarmtime)); //将时间转化为中国标准时间
            x.alarmtime = d.toLocaleDateString() + "  " + d.toLocaleTimeString();

            d = (new Date(x.endtime));
            x.endtime = d.toLocaleDateString() + "  " + d.toLocaleTimeString();
            x.endtimeStamp=d.getTime();
            this.comfirmArray.push(x);
          } else {
            var d = (new Date(x.alarmtime)); //将时间转化为中国标准时间
            x.alarmtime = d.toLocaleDateString() + "  " + d.toLocaleTimeString();
            this.alarmArray.push(x);
          }
        })
        this.comfirmArray.sort(this.timeComparisonFunction("endtimeStamp"));//根据确认时间排序
        this.alarmsum = this.alarmArray.length+this.comfirmArray.length;
        this.unconfirmsum=this.alarmArray.length;
        console.log(this.alarmArray);

        return Promise.resolve("success");
      },
      error => {
        console.log(url);
        return Promise.resolve("failed");
      }
      )
    return Promise.resolve("failed");
  }

  OncomfirmClick(item) {
    const prompt = this.alertCtrl.create({
      title: '确认故障',
      message: "确认设备故障",
      inputs: [
        {
          type: 'text',
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
            this.comfirmAlarmfunction(data, item);
          }
        }
      ]
    });
    prompt.present();
  }

  comfirmAlarmfunction(comfirmData, item) {
    console.log(comfirmData.note);
    let url = this.httpService.getDeviceUrl() + "/Alarm/update/confirm/single";
    let body = {
      "userName": this.username,
      "alarmID": item.alarmid,
      "Plantform": "移动端",
      "note": comfirmData.note,
    }
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    })
    this.http.post(url, JSON.stringify(body), options).map(res => res.json()).subscribe(data => {
      console.log(data);
      if (data.status == "0") {
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
      } else {
        this.unconfirmsum--;
        this.dataInit();
      }
    }, err => {
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

  /*
  * 根据指定的属性进行排序
   */

  timeComparisonFunction(dateTime) {
    return function (obj1, obj2) {
      var value1=obj1[dateTime];
      var value2=obj2[dateTime];
      if (value1 < value2) {
        return 1;
      } else if (value1 > value2) {
        return -1;
      } else {
        return 0;
      }
    };
  }
}
