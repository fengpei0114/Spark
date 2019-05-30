import { Component ,ViewChild,ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, App, Platform,PopoverController,MenuController} from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../providers/http-service/http-service';
import { AlarmdetailPage } from './alarm_detail/alarm_detail';
import { AlarmPage } from '../home/alarm/alarm';
import { MalfunctionPage } from '../home/malfunction/malfunction';
import { MaldetailPage } from'./mal_detail/mal_detail';
import { NativeService } from'../../providers/native-service/native-service'
import {getErrorLogger} from "@angular/core/src/errors";
import { ChartPage } from '../home/chart/chart';
import { Storage } from '@ionic/storage';
// var app = angular.module('show_map',[]);
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
interface MyPoint{
    lat:number;
    lng:number;
}

enum BMapPosition {BMAP_ANCHOR_BOTTOM_RIGHT,BMAP_ANCHOR_TOP_RIGHT}


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
//
// class pointClass{
//     lat:number;
//     lng:number;
//     info?:string;
//     constructor(x:number,y:number,info?:string)
//     {
//         this.lng=x;
//         this.lat=y;
//         this.info=info;
//     }
// }




export class MapPage{
   @ViewChild('map') mapElement : ElementRef;
   @ViewChild('legend') legendElement : ElementRef;

   public map:any;
   public IsMapChoose:boolean;
   public IsListChoose:boolean;
   public showInfoWindow:boolean;
   public windowsMsg:object;
   public markerArray:Array<object>=[];
   public alarmpageNum:number=1;
   public malpageNum:number=1;
   public alarmMsgArray:Array<any>=[];
   public malMsgArray:Array<any>=[];
   public provinceNameArray = [
       {
    "id":"1",
    "provinceName":"陕西省",
    "cityArray" : [{
        "id":"1",
        "name":"西安市",
    },{
        "id":"2",
        "name":"延安市",
    },{
        "id":"3",
        "name":"渭南市",
    }]
},{
    "id":"2",
    "provinceName":"青海省",
    "cityArray" : [{
        "id":"1",
        "name":"西宁市",
    },{
        "id":"2",
        "name":"海东市",
    },{
        "id":"3",
        "name":"海北藏族自治州",
    },{
        "id":"4",
        "name":"黄南藏族自治州",
    },{
        "id":"5",
        "name":"海西蒙古族藏族自治州",
    }]
},{
    "id":"3",
    "provinceName":"河北省",
    "cityArray" : [{
        "id":"1",
        "name":"石家庄市",
    },{
        "id":"2",
        "name":"唐山市",
    },{
        "id":"3",
        "name":"秦皇岛市",
    },{
        "id":"4",
        "name":"邯郸市",
    },{
        "id":"5",
        "name":"邢台市",
    },{
        "id":"6",
        "name":"保定市",
    },{
        "id":"7",
        "name":"张家口市",
    },{
        "id":"8",
        "name":"廊坊市",
    }]
},{
    "id":"4",
    "provinceName":"北京市",
    "cityArray" :[{
        "id":"1",
        "name":"石家庄市",
    },{
        "id":"2",
        "name":"唐山市",
    },{
        "id":"3",
        "name":"秦皇岛市",
    },{
        "id":"4",
        "name":"邯郸市",
    },{
        "id":"5",
        "name":"邢台市",
    },{
        "id":"6",
        "name":"保定市",
    },{
        "id":"7",
        "name":"张家口市",
    },{
        "id":"8",
        "name":"廊坊市",
    }]
}];
public alarmArray=[
    {
    "id":"1",
    "alarm":[{
        "equipmentName":"01",
        "alarmNo":"012",
        "measure":"未确认",
        "grade":"2",
        "sparknum":"12",
    },
    {
        "equipmentName":"XX-XX",
        "alarmNo":"02",
        "measure":"未确认",
        "grade":"2",
        "sparknum":"21",
    }]
},{
    "id":"2",
    "alarm":[{
        "equipmentName":"xx-XX",
        "alarmNo":"012",
        "measure":"未确认",
        "grade":"5",
        "sparknum":"35",
    },
    {
        "equipmentName":"XX-XX",
        "alarmNo":"02",
        "measure":"未确认",
        "grade":"2",
        "sparknum":"21",
    }]
},{
    "id":"3",
    "alarm":[{
        "equipmentName":"03",
        "alarmNo":"012",
        "measure":"未确认",
        "grade":"2",
        "sparknum":"12",
    },
    {
        "equipmentName":"X3",
        "alarmNo":"02",
        "measure":"未确认",
        "grade":"4",
        "sparknum":"25",
    }]
},{
    "id":"4",
    "alarm":[{
        "equipmentName":"XX-xx",
        "alarmNo":"012",
        "measure":"未确认",
        "grade":"5",
        "sparknum":"34",
    }]
}];
public cityAlarmOrMul=[
    {
    "equipmentName":"01",
    "alarmNo":"012",
    "measure":"未确认",
    "grade":"2",
    "sparknum":"2",
},{
    "equipmentName":"02",
    "alarmNo":"01",
    "measure":"未确认",
    "grade":"1",
    "sparknum":"12",
},{
    "equipmentName":"03",
    "alarmNo":"01",
    "measure":"未确认",
    "grade":"3",
    "sparknum":"2",
},{
    "equipmentName":"04",
    "alarmNo":"01",
    "measure":"未确认",
    "grade":"1",
    "sparknum":"11",
},{
    "equipmentName":"05",
    "alarmNo":"01",
    "measure":"未确认",
    "grade":"2",
    "sparknum":"20",
}];
public citys=[{
    "lnglat":[112.982279,28.19409],
    "name":"长沙市",
    "style":1
},{
    "lnglat":[123.429096,41.796767],
    "name":"沈阳市",
    "style":1
},{
    "lnglat":[126.642464,45.756967],
    "name":"哈尔滨市",
    "style":1
},{
    "lnglat":[121.472644,31.231706],
    "name":"上海市",
    "style":1
},{
    "lnglat":[118.767413,32.041544],
    "name":"南京市",
    "style":1
},{
    "lnglat":[121.509062,25.044332],
    "name":"台北市",
    "style":1
},{
    "lnglat":[114.173355,22.320048],
    "name":"香港",
    "style":1
},{
    "lnglat":[120.153576,30.287459],
    "name":"杭州市",
    "style":1
},{
    "lnglat":[111.670801,40.818311],
    "name":"呼和浩特市",
    "style":1
},{
    "lnglat":[117.283042,31.86119],
    "name":"合肥市",
    "style":2
},{
    "lnglat":[119.306239,26.075302],
    "name":"福州市",
    "style":2
},{
    "lnglat":[87.617733,43.792818],
    "name":"乌鲁木齐市",
    "style":2
},{
    "lnglat":[115.892151,28.676493],
    "name":"南昌市",
    "style":2
},{
    "lnglat":[117.000923,36.675807],
    "name":"济南市",
    "style":2
},{
    "lnglat":[106.278179,38.46637],
    "name":"银川市",
    "style":2
},{
    "lnglat":[113.665412,34.757975],
    "name":"郑州市",
    "style":2
},{
    "lnglat":[114.298572,30.584355],
    "name":"武汉市",
    "style":2
},{
    "lnglat":[125.3245,43.886841],
    "name":"长春市",
    "style":2
},{
    "lnglat":[101.778916,36.623178],
    "name":"西宁市",
    "style":2
},{
    "lnglat":[112.549248,37.857014],
    "name":"太原市",
    "style":2
},{
    "lnglat":[113.280637,23.125178],
    "name":"广州市",
    "style":2
},{
    "lnglat":[108.320004,22.82402],
    "name":"南宁市",
    "style":1
},{
    "lnglat":[110.33119,20.031971],
    "name":"海口市",
    "style":0
},{
    "lnglat":[106.504962,29.533155],
    "name":"重庆市",
    "style":0
},{
    "lnglat":[104.065735,30.659462],
    "name":"成都市",
    "style":4
},{
    "lnglat":[113.54909,22.198951],
    "name":"澳门",
    "style":5
},{
    "lnglat":[103.823557,36.058039],
    "name":"兰州市",
    "style":3
},{
    "lnglat":[106.713478,26.578343],
    "name":"贵阳市",
    "style":0
},{
    "lnglat":[102.712251,25.040609],
    "name":"昆明市",
    "style":0
},{
    "lnglat":[91.132212,29.660361],
    "name":"拉萨市",
    "style":0
},{
    "lnglat":[108.948024,34.263161],
    "name":"西安市",
    "style":2
},{
    "lnglat":[114.502461,38.045474],
    "name":"石家庄市",
    "style":0
},{
    "lnglat":[117.190182,39.125596],
    "name":"天津市",
    "style":0
},{
    "lnglat":[116.405285,39.904989],
    "name":"北京市",
    "style":0
}];
public mapdata=[{
            "lnglat":[112.982279,28.19409],
            "name":"长沙市",
            "deviceID":"12",
            "runstate":"1",
            "uncomfirmAlarmNum":"1",
            "UncomfirmMalNum":"1",
            "AlarmLevel":"2",
            "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[123.429096,41.796767],
            "name":"沈阳市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"2",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[126.642464,45.756967],
            "name":"哈尔滨市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"1",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"2",
        "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[121.472644,31.231706],
            "name":"上海市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[118.767413,32.041544],
            "name":"南京市",
        "deviceID":"12",
        "runstate":"0",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[121.509062,25.044332],
            "name":"台北市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[114.173355,22.320048],
            "name":"香港",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"1",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[120.153576,30.287459],
            "name":"杭州市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"1",
        "UncomfirmMalNum":"1",
        "AlarmLevel":"2",
        "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[111.670801,40.818311],
            "name":"呼和浩特市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":1
        },{
            "lnglat":[117.283042,31.86119],
            "name":"合肥市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[119.306239,26.075302],
            "name":"福州市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[87.617733,43.792818],
            "name":"乌鲁木齐市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[115.892151,28.676493],
            "name":"南昌市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[117.000923,36.675807],
            "name":"济南市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[106.278179,38.46637],
            "name":"银川市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[113.665412,34.757975],
            "name":"郑州市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[114.298572,30.584355],
            "name":"武汉市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[125.3245,43.886841],
            "name":"长春市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[101.778916,36.623178],
            "name":"西宁市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[112.549248,37.857014],
            "name":"太原市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[113.280637,23.125178],
            "name":"广州市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":2
        },{
            "lnglat":[108.320004,22.82402],
            "name":"南宁市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"1",
        "UncomfirmMalNum":"2",
        "AlarmLevel":"1",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[110.33119,20.031971],
            "name":"海口市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[106.504962,29.533155],
            "name":"重庆市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[104.065735,30.659462],
            "name":"成都市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[113.54909,22.198951],
            "name":"澳门",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[103.823557,36.058039],
            "name":"兰州市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[106.713478,26.578343],
            "name":"贵阳市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[102.712251,25.040609],
            "name":"昆明市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[91.132212,29.660361],
            "name":"拉萨市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[108.948024,34.263161],
            "name":"西安市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[114.502461,38.045474],
            "name":"石家庄市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[117.190182,39.125596],
            "name":"天津市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        },{
            "lnglat":[116.405285,39.904989],
            "name":"北京市",
        "deviceID":"12",
        "runstate":"1",
        "uncomfirmAlarmNum":"0",
        "UncomfirmMalNum":"0",
        "AlarmLevel":"",
        "MalType":"探头故障",
            "style":0
        }];
public cityArray:any;
public provincechoose:boolean;
public choosebtn:any;
public selectProvinceId:any;
public colorBule:string='#5eb1f5';
public remeberbtn:any;
public proviceName:any="全部";
public cityName:any="";
public AllcityAlarm:any;
public element:any;
public cityId:number; //记录当前查看的城市id
public alarmOrmul:any;  //记录当前查看的是警报还是故障，警报true，故障false
public isInnerMsg:boolean=true;//记录是否查看指定地区，true为全部下，false为指定地区
public showLegend:boolean=false;
private userId:number;

  constructor(
              public http:Http,
              public app:App,
              public menuCtrl: MenuController,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private  platform:Platform,
              private httpService: HttpService,
              private nativeService:NativeService,
              private storage:Storage,
              public popoverCtrl: PopoverController,) {
            this.storage.get('userId').then((userid)=>{
                this.userId=userid;
            })
            this.IsMapChoose = true;
            this.provincechoose = false;
            this.AllcityAlarm = this.cityAlarmOrMul;
            this.alarmOrmul = true;
            this.showInfoWindow = false;
  }
  ionViewWillEnter () {
    this.creatMap();
    console.log("ionViewDidEnter");
}
initdata(){
    this.nativeService.showLoading("数据加载中");
        let url = this.httpService.getUrl() + "/Statistics/GPS_Alarm_Mal/ByUserID";
        let body = {
            "userId": this.userId,
        }
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        
        this.http.post(url, JSON.stringify(body), options).map(res => res.json()).subscribe(data => {
            this.markerArray=data;
            this.markerArray.map(devicedata=>{
                devicedata['lnglat']=[devicedata['lat'],devicedata['lng']];
                devicedata['style']=devicedata['style']-1;
            });
            console.log(this.markerArray);
            this.nativeService.hideLoading();
            this.addMarker();
         //   console.log(this.mapdata);
        },
        error => {
          this.nativeService.hideLoading();
          this.nativeService.showToast("获取数据失败");
          console.log(error);
          this.markerArray=this.mapdata;
          this.addMarker();
        })
    }

    creatMap() {
        this.element = this.mapElement.nativeElement;
        this.map = new AMap.Map(this.element, {
          // resizeEnable:true,
      
          zoom: 4
        });
        this.initdata();
        // this.addMarker();
      }

addMarker() {
    // var style = [{
    //     url: '../../assets/style_1.png',
    //     // url: 'assets/style_1.png',手机打包时使用，否则图片不显示
    //     anchor: new AMap.Pixel(6, 6),
    //     size: new AMap.Size(15, 22)
    // }, {
    //     url: '../../assets/style_2.png',
    //     anchor: new AMap.Pixel(4, 4),
    //     size: new AMap.Size(15, 22)
    // }, {
    //     url: '../../assets/style_3.png',
    //     anchor: new AMap.Pixel(3, 3),
    //     size: new AMap.Size(15, 22)
    // }, {
    //     url: '../../assets/style_4.png',
    //     anchor: new AMap.Pixel(11, 11),
    //     size: new AMap.Size(15,22)
    // }, {
    //     url: '../../assets/style_5.png',
    //     anchor: new AMap.Pixel(11, 11),
    //     size: new AMap.Size(15, 22)
    // }
    // ];

    var style = [{
        url: '../../assets/style_3.png',
        anchor: new AMap.Pixel(3, 3),
        size: new AMap.Size(15, 22)
    }, {
        url: '../../assets/style_1.png',
        // url: 'assets/style_1.png',手机打包时使用，否则图片不显示
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(15, 22)
    }, {
        url: '../../assets/style_2.png',
        anchor: new AMap.Pixel(4, 4),
        size: new AMap.Size(15, 22)
    }, {
        url: '../../assets/style_4.png',
        anchor: new AMap.Pixel(11, 11),
        size: new AMap.Size(15,22)
    }, {
        url: '../../assets/style_5.png',
        anchor: new AMap.Pixel(11, 11),
        size: new AMap.Size(15, 22)
    }
    ];

    let mass = new AMap.MassMarks(this.markerArray,{ //接通接口后，mapdata改为markerArray
        opacity:0.8,
        zIndex:111,
        cursor:'pointer',
        style:style
    })

    // let marker = new AMap.Marker({content:'',map:map});
    mass.on('click', e => {
        // marker.setPosition(e.data.lnglat);
        this.map.setCenter(e.data.lnglat);
        this.showInfoWindow = !this.showInfoWindow;
        console.log(e);
        this.windowsMsg = e['data'];
    });
    mass.setMap(this.map);
}

closeInfoWindow(){
    this.showInfoWindow = false;
}
/**
 * 跳转至当前设备的警报列表
 * @param data 当前设备信息
 */
gotoAlarmPage(data){
    console.log(data);
   this.app.getRootNav().push(AlarmPage,data);
}
/**
 * 跳转至当前设备的故障列表
 * @param data 当前设备信息
 */
gotoMalfunctionPage(data)
{
   this.app.getRootNav().push(MalfunctionPage,data);
}
/**
 * 跳转至当前设备的统计信息
 * @param data 当前设备信息
 */
gotoChartPage(data){
    this.app.getRootNav().push(ChartPage,data);
}
/**
 * 打开图例
 */
changeLegend(){
    this.showLegend = true;
}
closeLegendWindow(){
    this.showLegend = false;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

  }

    loadToolBar(){

    }

    loadMap() {

    }

    goToHomePage() {

        this.navCtrl.pop();
    }

    test(){

        // console.log(this.currentPoint.lat);
    }






    presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: ev
        });
        popover.onDidDismiss(data=>{
            console.log(data);
            if(data == 1){
                this.IsMapChoose = true;
                this.IsListChoose = false;
                this.showInfoWindow = false;
                this.initdata();
                console.log(111);
            }else{
                this.IsMapChoose = false;
                this.IsListChoose = true;
                this.showInfoWindow = false;
                this.alarmOrmul = true;
                if(this.alarmOrmul)
                    this.AlarmdataInit();
                else{
                    this.MaldataInit();
                }
            }
        })
    }
    /**
     *  16. 获取全部警报
     */
    AlarmdataInit(){
        this.nativeService.showLoading("数据加载中");
            let url = this.httpService.getUrl() + "/Alarm/find/brief/byUserID";
            let body = {
                "userID":1,
                "pageSize":10,
                "pageNum":this.alarmpageNum
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
                this.cityAlarmOrMul = data;
                this.nativeService.hideLoading();
            },error=>{
                this.nativeService.hideLoading();
                alert("网络连接错误！");
            })
    }
    /**
     *  17. 获取全部故障
     */
    MaldataInit(){
        this.nativeService.showLoading("数据加载中");
        let url = this.httpService.getUrl() + "/Malfunction/find/brief/byUserID";
        let body = {
            "userId":1,
            "pageSize":10,
            "pageNum":this.malpageNum
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
           this.cityAlarmOrMul = data;
           this.nativeService.hideLoading();
        },error=>{
            this.nativeService.hideLoading();
            alert("网络连接错误！");
        })
    }
    /**
     * 18. 获取存在警报/故障的省份
     */
    ischoose(){
        this.provincechoose = !this.provincechoose;
        if(this.provincechoose){
            let url=this.alarmOrmul?this.httpService.getUrl() + "/Statistics/district/provinceLevel/alarmOccurred":this.httpService.getUrl() + "/Statistics/district/provinceLevel/malOccurred";
            let body = {
                "userID":1,
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
               this.provinceNameArray = data;
            })
        }else{
            this.cityArray = [];
        }
    }
    /**
     * 19. 获取存在警报/故障的市
     * @param item 市上级的省
     */
    ProvinceChoose(proviceName){
        console.log(proviceName);
        if(proviceName=="全部"){
            // this.isprovincechoose = false;
            this.cityArray = null;
            this.proviceName = "全部";
            this.provincechoose = false;
            this.cityName = "";
            this.isInnerMsg = true;
            this.cityId = null;
            // this.cityAlarmOrMul = this.AllcityAlarm;
            console.log(this.proviceName);
            if(this.alarmOrmul)
                this.AlarmdataInit();
            else
                this.MaldataInit();
        }else{
          this.proviceName=proviceName;
            let url=this.alarmOrmul?this.httpService.getUrl() + "/Statistics/district/cityLevel/alarmOccurred":this.httpService.getUrl() + "/Statistics/district/cityLevel/malOccurred";
            let body = {
                "userID":1,
                "provinceName":this.proviceName,
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
                this.cityArray = data;
            })
        }
        console.log(this.remeberbtn);
    }
    /**
     * 获取指定地区的警报或故障
     * @param item 
     */
    CityChoose(city){
      console.log(city);
        this.provincechoose = false;
        this.isInnerMsg = false;
        this.cityName = city.name;
        this.cityId=city.id;
        if(this.alarmOrmul){
            this.AlarmCityArray(city.id);
        }else{
            this.MalCityArray(city.id);
        }
        console.log(this.cityAlarmOrMul);
    }
    /**
     * 20. 获取指定地区的警报
     */
    AlarmCityArray(item){
        let url = this.httpService.getUrl() + "/Alarm/find/byCitybyUserID";
        let body = {
            "userID":1,
            "cityName":item,
            "pageSize":10,
            "pageNum":this.alarmpageNum,
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
        //    this.alarmMsgArray = data;
            this.cityAlarmOrMul = data;
            this.cityArray=[];
       //    this.alarmpageNum++;
        })
    }
    /**
     * 21. 获取指定地区的故障
     */
    MalCityArray(item){
      let url = this.httpService.getUrl() + "/Malfunction/find/byCitybyUserID";
      let body = {
            "userID":1,
            "cityName":item,
            "pageSize":10,
            "pageNum":this.malpageNum,
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
           this.cityAlarmOrMul = data;
           this.cityArray=[];
         //  this.malpageNum++;
        })
    }
    openMenu(): void{
        this.menuCtrl.open();
    }

    /**
     * 查看警报详细信息
     * @param item 当前警报信息 
     */
    getAlarmDetail(item){
        // let alarmOrmul = this.alarmOrmul;
        // item.alarmOrmul = this.alarmOrmul;
        console.log(item);
        this.app.getRootNav().push(AlarmdetailPage,item);
    }

    /**
     * 查看故障详细信息
     * @param item 当前故障信息 
     */
    getMalDetail(item){
        // let alarmOrmul = this.alarmOrmul;
        // item.alarmOrmul = this.alarmOrmul;
        console.log(item);
        this.app.getRootNav().push(MaldetailPage,item);
    }
    /**
     * 选择下部警报按钮
     */
    checkAlarm(){
        if(this.isInnerMsg){//点击按钮时加载全部警报信息
            this.AlarmdataInit();
        }else{//点击按钮时加载指定地区警报信息
            this.AlarmCityArray(this.cityName);
        }
        this.alarmOrmul = true;
    }
    /**
     * 选择下部故障按钮
     */
    checkMul(){
        if(this.isInnerMsg){
            this.MaldataInit();
        }else{
            this.MalCityArray(this.cityName);
        }
        this.alarmOrmul = false;
    }
}
