import { Component ,ViewChild,ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, App, Platform,PopoverController,MenuController} from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../providers/http-service/http-service';
import { SystemJsNgModuleLoader } from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import { AlarmdetailPage } from './alarm_detail/alarm_detail';
import { AlarmPage } from '../home/alarm/alarm';
import { ChartPage } from '../home/chart/chart';
import { DevicePage } from'../home/device/device';
import { MalfunctionPage } from '../home/malfunction/malfunction';
import { MalfunctiondetailPage } from '../home/malfunction_detail/malfunction_detail'
import { MaldetailPage } from'./mal_detail/mal_detail';

declare var BMap;
declare var angular: any;
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

   public map:any;
   public defaultAnchor;
   public defaultOffset;
   public currentPoint : MyPoint;
   public mousePoint;
   public pointArray:Array<any>=[];
   public mapStatus:string="BMAP_STATUS_SUCCESS";
   public toolPosition : BMapPosition;
   public IsMapChoose:boolean;
   public IsListChoose:boolean;
   public showInfoWindow:boolean;
   public windowsMsg:object;
   public mapArray:Array<object>=[];

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
public citys=[
    {
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
    "style":0
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
    "style":0
},{
    "lnglat":[113.54909,22.198951],
    "name":"澳门",
    "style":0
},{
    "lnglat":[103.823557,36.058039],
    "name":"兰州市",
    "style":0
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
    "style":0
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
public mapdata=[
        {
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
public proviceName:any="陕西省";
public cityName:any="西安市";
public AllcityAlarm:any;
public element:any;
public cityId:any=null; //记录当前查看的城市id
public alarmOrmul:any;  //记录当前查看的是警报还是故障，警报true，故障false
public resultArray:any;

  constructor(
              public http:Http,
              public app:App,
              public menuCtrl: MenuController,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private  platform:Platform,
              private httpService: HttpService,
              public popoverCtrl: PopoverController,) {
            this.IsMapChoose = true;
            this.provincechoose = false;
            this.AllcityAlarm = this.cityAlarmOrMul;
            this.alarmOrmul = true;
            this.showInfoWindow = false;
  }
  ionViewWillEnter () {
    this.initdata();
    console.log("ionViewDidEnter");
}
initdata(){

        let url = "http://192.168.0.167:7002/Statistics/GPS_Alarm_Mal/ByUserID";
        let body = {
            "userId": 1,
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
            
            this.mapArray=data;
            this.mapArray.map(devicedata=>{
                devicedata['lnglat']=[devicedata['lat'],devicedata['lng']];
            });
            console.log(this.mapArray);
            this.element = this.mapElement.nativeElement;
            this.creat1();
         //   console.log(this.mapdata);
        })
    }

    mapDataProcessing(){

    }
creat1(){

    let map = new AMap.Map(this.element,{
        resizeEnable:true,
        center:[116.397428,39.90923],
        zoom:4
    });

    var style = [{
        url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 11)
    }, {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
        anchor: new AMap.Pixel(4, 4),
        size: new AMap.Size(7, 7)
    }, {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
        anchor: new AMap.Pixel(3, 3),
        size: new AMap.Size(5, 5)
    }, {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 1)
    }, {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
        anchor: new AMap.Pixel(3, 3),
        size: new AMap.Size(15, 5)
    }
    ];

    let mass = new AMap.MassMarks(this.mapArray,{ //接通接口后，mapdata改为mapArray
        opacity:0.8,
        zIndex:111,
        cursor:'pointer',
        style:style
    })

    let marker = new AMap.Marker({content:'',map:map});
    mass.on('click', e=> {
        marker.setPosition(e.data.lnglat);
        map.setCenter(e.data.lnglat);
        this.showInfoWindow = !this.showInfoWindow;
        console.log(e);
        this.windowsMsg=e['data'];
    });
    mass.setMap(map);
}

closeInfoWindow(){
    this.showInfoWindow = false;
}

gotoAlarmPage(id){
   this.app.getRootNav().push(AlarmPage,id);
}

gotoMalfunctionPage(id)
{
   this.app.getRootNav().push(MalfunctionPage,id)
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
                // this.ionViewWillEnter();
                this.ionViewDidLoad();
                this.creat1();
                // this.loadMap();
                // this.loadToolBar();
                console.log(111);
            }else{
                this.IsMapChoose = false;
                this.IsListChoose = true;
                this.showInfoWindow = false;
            }
        })
    }
    ischoose(){
        console.log(this.provincechoose);
        this.provincechoose = !this.provincechoose;
        
        
        // this.remeberbtn.style.color = this.colorBule;
    }
    ProvinceChoose(item){
        if(item=="全部"){
            // this.isprovincechoose = false;
            this.cityArray = null;
            this.proviceName = "全部";
            this.provincechoose = false;
            this.cityName = "";
            this.cityId = null;
            this.cityAlarmOrMul = this.AllcityAlarm;
            console.log(this.proviceName);
        }else{
            // this.isprovincechoose = true;
            this.choosebtn = document.getElementsByName('00000000')[0];
            this.choosebtn.style.color = "#000000";
            this.provinceNameArray.forEach((x)=>{
                this.choosebtn = document.getElementsByName(x.id)[0];
                this.choosebtn.style.color = "#000000";
                if(x.id==item){
                    console.log(x.id);
                    this.choosebtn = document.getElementsByName(x.id)[0];
                    console.log("choosebtn"+this.choosebtn);
                    this.selectProvinceId = item;
                    this.choosebtn.style.color = this.colorBule;
                    this.cityArray = x.cityArray;
                    this.proviceName = x.provinceName;
                    this.remeberbtn = this.choosebtn;
                }
            });
        }
        console.log(this.remeberbtn);
    }
    CityChoose(item){
        this.provincechoose = false;
        console.log(item);
        this.cityName = item.name;
        this.alarmArray.forEach((x)=>{
            if(x.id == item.id){
                this.cityId = x.id;
                this.cityAlarmOrMul = x.alarm;
            }
        })
        console.log(this.cityAlarmOrMul);
    }
    openMenu(): void{
        this.menuCtrl.open();
    }
    getAlarmDetail(item){
        // let alarmOrmul = this.alarmOrmul;
        // item.alarmOrmul = this.alarmOrmul;
        console.log(item);
        this.app.getRootNav().push(AlarmdetailPage,item);
    }
    getMalDetail(item){
        // let alarmOrmul = this.alarmOrmul;
        // item.alarmOrmul = this.alarmOrmul;
        console.log(item);
        this.app.getRootNav().push(MaldetailPage,item);
    }
    checkAlarm(){
        // this.alarmOrmul = true;
        if(this.cityId == null){
            this.cityAlarmOrMul = this.AllcityAlarm;
        }else{
            this.alarmArray.forEach((x)=>{
                if(x.id == this.cityId){
                    this.cityId = x.id;
                    this.cityAlarmOrMul = x.alarm;
                }
            })  
        }
    }
    checkMul(){
        // this.alarmOrmul = false;
        if(this.cityId == null){
            this.cityAlarmOrMul = this.AllcityAlarm;
        }else{
            this.alarmArray.forEach((x)=>{
                if(x.id == this.cityId){
                    this.cityId = x.id;
                    this.cityAlarmOrMul = x.alarm;
                }
            })  
        }
    }
}
