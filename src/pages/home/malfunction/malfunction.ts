import {Component} from '@angular/core';
import {NavController, NavParams, App, AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HttpService} from '../../../providers/http-service/http-service';
import {Color} from "highcharts";
import {NativeService} from '../../../providers/native-service/native-service'
import {MalfunctiondetailPage} from '../malfunction_detail/malfunction_detail';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-malfunction',
  templateUrl: 'malfunction.html',
})
export class MalfunctionPage {


  deviceId: any;
  isequipment: boolean = false;
  isplant: boolean = false;

  plant_name = "选择厂房";
  equipment_name = "选择设备";

  choosebtn: any;

  selectFactoryID: number;
  selectEquipmentID: number;

  isSpray: boolean = true;
  isFault: boolean = true;
  isWarning: boolean = true;

  colorBule: string = '#5eb1f5';
  colorGrey: string = '#bbbbbb'

  sprayColor: string = this.colorBule;
  faultColor: string = this.colorBule;
  warningColor: string = this.colorBule;

  equipmentArray: any;
  name: string;
  MulNum: any;
  unconfirmMulNum: any;
  lastConfirmTime: any;
  mulMsg: any;
  // dataArray=[
  //     {
  //         "malfunctionNo":"01",
  //         "malType":"1",
  //         "subNodeId":"1",
  //         "malTime":"2018-08-01 15:54:52",
  //         "endTime":"2018-08-01 15:55:52",
  //         "component":"探头1",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"未确认",
  //         "dealPlatform":"equipment",
  //         "dealStaff":"tony",
  //         "note":""
  //     },    {
  //         "malfunctionNo":"02",
  //         "malType":"1",
  //         "subNodeId":"1",
  //         "malTime":"2018-08-01 15:54:52",
  //         "endTime":"2018-08-01 15:55:52",
  //         "component":"探头2",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"未确认",
  //         "dealPlatform":"equipment",
  //         "dealStaff":"tony",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"03",
  //         "malType":"1",
  //         "subNodeId":"3",
  //         "malTime":"2018-08-01 15:54:52",
  //         "endTime":"2018-08-01 15:55:52",
  //         "component":"电磁阀1",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"未确认",
  //         "dealPlatform":"equipment",
  //         "dealStaff":"tony",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"04",
  //         "malType":"1",
  //         "subNodeId":"2",
  //         "malTime":"2018-08-01 15:54:52",
  //         "endTime":"2018-08-01 15:55:52",
  //         "malfunctionEquipment":"xxx",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"未确认",
  //         "dealPlatform":"equipment",
  //         "dealStaff":"tony",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"05",
  //         "malType":"1",
  //         "subNodeId":"XXX",
  //         "malTime":"2018-08-01 15:54:52",
  //         "endTime":"2018-08-01 15:55:52",
  //         "malfunctionEquipment":"xxx",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"未确认",
  //         "dealPlatform":"equipment",
  //         "dealStaff":"tony",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"06",
  //         "malType":"1",
  //         "subNodeId":"XXX",
  //         "malTime":"2018-08-01 15:54:52",
  //         "endTime":"",
  //         "malfunctionEquipment":"xxx",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"已确认",
  //         "platform":true,
  //         "user":"123",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"07",
  //         "malType":"1",
  //         "childNode":"XXX",
  //         "startTime":"2018-08-01 15:54:52",
  //         "endTime":"",
  //         "malfunctionEquipment":"xxx",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"已确认",
  //         "platform":true,
  //         "user":"123",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"08",
  //         "malType":"1",
  //         "childNode":"XXX",
  //         "startTime":"2018-08-01 15:54:52",
  //         "endTime":"",
  //         "malfunctionEquipment":"xxx",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"已确认",
  //         "dealPlatform":"",
  //         "dealStaff":"",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"09",
  //         "malfunctionType":"1",
  //         "childNode":"XXX",
  //         "startTime":"2018-08-01 15:54:52",
  //         "endTime":"",
  //         "malfunctionEquipment":"xxx",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"已确认",
  //         "dealPlatform":"",
  //         "dealStaff":"",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"10",
  //         "malfunctionType":"1",
  //         "childNode":"XXX",
  //         "startTime":"2018-08-01 15:54:52",
  //         "endTime":"",
  //         "malfunctionEquipment":"xxx",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"已确认",
  //         "dealPlatform":"",
  //         "dealStaff":"",
  //         "note":""
  //     },
  //     {
  //         "malfunctionNo":"11",
  //         "malfunctionType":"1",
  //         "childNode":"XXX",
  //         "startTime":"2018-08-01 15:54:52",
  //         "endTime":"",
  //         "malfunctionEquipment":"xxx",
  //         "recommendedMeasure":"XXX",
  //         "malfunctionState":"已确认",
  //         "dealPlatform":"",
  //         "dealStaff":"",
  //         "note":""
  //     },

  // ]

  malsum: number;
  unconfirmsum: number = 0;
  pageSize: number = 0;
  pageNum: number = 1;
  pageOther: number = 0;
  malfunctionArray: Array<Object> = [];
  comfirmArray: Array<Object> = [];
  pagesizenow: number;
  roleId: string;
  username: string;

  constructor(public http: Http,
              public app: App,
              public navCtrl: NavController,
              public navParams: NavParams,
              private httpService: HttpService,
              private alertCtrl: AlertController,
              private nativeService: NativeService,
              private  storage: Storage,
  ) {
    this.deviceId = this.navParams.data.deviceId;
    // this.malfunctionArray = this.dataArray;


    this.storage.get('username').then((username) => {
      this.username = username;
    })
    this.storage.get('roleId').then(roleId => {
      this.roleId = roleId;
      if (this.roleId == "3" || this.roleId == "4") {
        // this.malsum = this.navParams.data.alarmMsg.alarmsum;    //目前后台传入数据有误
        // this.unconfirmsum = this.navParams.data.alarmMsg.unconfirmedMalSum;
      } else if (this.roleId == "5") {
        // this.unconfirmsum = this.navParams.data.unconfirmedMalSum;
      }
      this.dataInit();
    })
  }

  dataInit() {
    this.nativeService.showLoading("数据加载中...");
    this.malfunctionArray=[];
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

  getDataFromServer(pageNum):Promise<string>{
    let url = this.httpService.getDeviceUrl() + "/Malfunction/find/byDeviceID";
    let body = {
      "DeviceId": this.deviceId,
      "pageSize": 10,
      "pageNum": 1,
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
      data.forEach(x => {
        if (x.confirmed) {
          var d = (new Date(x.malTime)); //将时间转化为中国标准时间
          x.malTime = d.toLocaleDateString() + "  " + d.toLocaleTimeString();

          d = (new Date(x.endTime));
          x.endtime = d.toLocaleDateString() + "  " + d.toLocaleTimeString();
          x.endtimeStamp=d.getTime();
          this.comfirmArray.push(x);
        } else {
          var d = (new Date(x.malTime)); //将时间转化为中国标准时间
          x.malTime = d.toLocaleDateString() + "  " + d.toLocaleTimeString();
          this.malfunctionArray.push(x);
        }
      })
      this.comfirmArray.sort(this.timeComparisonFunction("endtimeStamp"));//根据确认时间排序
      this.malsum = this.malfunctionArray.length+this.comfirmArray.length;
      this.unconfirmsum=this.malfunctionArray.length;
      this.nativeService.hideLoading();
      return Promise.resolve("success");
    }, error => {
      this.nativeService.showToast("数据获取失败！");
      return Promise.resolve("failed");
    })
    return Promise.resolve("failed");
  }

  ischoose(item) {
    if (item == 0) {
      this.isplant = !this.isplant;
      this.isequipment = false;
      this.equipmentArray = "";
    }
    if (item == 1) {
      this.isequipment = !this.isequipment;
      this.isplant = false;
    }
  }

  changestatus() {
    this.isplant = false;
    this.isequipment = false;
  }


  // plantChoose(item){
  //     this.factoryArray.forEach((x)=>{
  //         this.choosebtn = document.getElementsByName(x.id)[0];
  //         this.choosebtn.style.color = "#000000";
  //         if(x.id==item){
  //             console.log(x.id);
  //             this.choosebtn = document.getElementsByName(x.id)[0];
  //             console.log("choosebtn"+this.choosebtn);
  //             this.plant_name = x.name;
  //             this.selectFactoryID = item;
  //             this.choosebtn.style.color = this.colorBule;
  //             this.equipmentArray = x.equipments;
  //             this.isplant = !this.isplant;
  //             this.isequipment = true;
  //         }
  //     });
  // }

  equipmentChoose(item) {
    this.selectEquipmentID = item;

    this.equipmentArray.forEach((x) => {
      if (x.id == item) {
        this.equipment_name = x.name;
        this.isequipment = false;
      }
    });
    console.log("工厂id:" + this.selectFactoryID + "\n设备id：" + this.selectEquipmentID);
  }

  gotomalfunctionDetail(item) {
    this.app.getRootNav().push(MalfunctiondetailPage, item);
  }

  doInfinite(infiniteScroll) {
    if ((this.malfunctionArray.length+this.comfirmArray.length) % 10 != 0) //如果当前列表未满，表明没有更多数据，不使用下拉功能
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
            this.comfirmMalfunction(data, item);
          }
        }
      ]
    });
    prompt.present();
  }

  comfirmMalfunction(comfirmData, item) {
    console.log(comfirmData.note);
    let url = this.httpService.getDeviceUrl() + "/Malfunction/update/confirm/ByMalID";
    let body = {
      "userName": this.username,
      "malfunctionID": item.malId,
      "Plantform": true,
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
