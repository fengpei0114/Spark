import { Component ,ViewChild,ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, App, Platform,PopoverController,MenuController} from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../providers/http-service/http-service';
import { SystemJsNgModuleLoader } from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import { AlarmdetailPage } from './alarm_detail/alarm_detail';

declare var BMap;

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




export class MapPage {
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


   public provinceNameArray = [{
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
public alarmArray=[{
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
public cityAlarmOrMul=[{
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
  }

  ionViewWillEnter () {
          this.element = this.mapElement.nativeElement;
          this.create();
    console.log("ionViewDidEnter");
}
      create(){
        console.log("View Enter");
        // this.element = document.getElementById("map");
        let map = this.map = new BMap.Map(this.element, {enableMapClick: true});//创建地图实例
        console.log("create"+this.map);
        map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom();//连续缩放效果，默认禁用
        var geolocation = new BMap.Geolocation();
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition(function(r) {
            console.log(r.point);
            if (this.getStatus() == this.mapStatus) {
                this.currentPoint={lng: r.point.lng,lat: r.point.lat};
                //坐标可以通过百度地图坐标拾取器获取
            }
            else {
                this.currentPoint = {lng:  34.27,lat: 108.93};
            }
            map.centerAndZoom(toPoint(this.currentPoint), 15);//设置中心和地图显示级别

        });
        let sizeMap = new BMap.Size(10, 80);//显示位置
        map.addControl(new BMap.NavigationControl({
            anchor: BMapPosition.BMAP_ANCHOR_BOTTOM_RIGHT,//显示方向
            offset: sizeMap
        }));



        function showAttractionControl() {
            //定义显示位置
            this.defaultAnchor = BMapPosition.BMAP_ANCHOR_TOP_RIGHT;
            this.defaultOffset = new BMap.Size(10, 50);
        }

        //
        // for(var i=0;i<20;i++)
        // {
        //     var point = new pointClass(this.currentPoint.lng+Math.random()*0.7,this.currentPoint.lat+Math.random()*0.7);
        //     this.pointArray.push(point);
        // }

        // 初始化控件
        showAttractionControl.prototype = new BMap.Control();
        showAttractionControl.prototype.initialize = function (map) {
            let div = document.createElement("button");// 创建一个按钮
            div.appendChild(document.createTextNode("附近美食"));
            div.style.width = "135px";
            div.style.height = "35px";
            div.style.borderRadius = "15px";
            // div.onclick = function (e) {
            //     let local = new BMap.LocalSearch(map, {
            //         renderOptions: { map: map, autoViewport: true }
            //     });
            //     local.search("美食");
            // }

            // 指定点显示指定标记
            let icon = new BMap.Icon('../assets/point.png', new BMap.Size(20, 32), {
                anchor: new BMap.Size(10, 30),
            })//设置标注图片和位置

            let point = geolocation.getCurrentPosition(function(r) {
                console.log("point");
                if (this.getStatus() == this.mapStatus) {
                    var mkr = new BMap.Marker(r.point
                        , {
                        icon: icon,
                    //     enableDragging: true,
                    //     raiseOnDrag: true
                    }//自定义图标
                    );//设置起始坐标点
                    mkr.addEventListener("click",function () {
                        var opts = {
                            width : 100,     // 信息窗口宽度
                            height: 50,     // 信息窗口高度
                            title : "你的当前位置:"  // 信息窗口标题
                        }
                        var clickGeo= new BMap.Geocoder();
                        clickGeo.getLocation(r.point,function (result) {
                            var message;
                            if(result)
                            {
                                message=result.address+"("+r.point.lat+r.point.lng+")";
                            }
                            var infoWindow = new BMap.InfoWindow(message, opts);  // 创建信息窗口对象
                            map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
                        })

                    })
                    map.addOverlay(mkr);//添加标注在地图中并实现拖拽
                }
            });

            div.onclick = function (e) {//地图上可以添加自定义标注
                //点击按钮事件
                
            }
            map.getContainer().appendChild(div);// 添加DOM元素到地图中
            return div;

        }
        let showAttraction = new showAttractionControl();
        map.addControl(showAttraction);//添加控件


        //
        function toPoint(point:MyPoint){
            return new BMap.Point(point.lng, point.lat);
        }

        //
        let newpoint:MyPoint={lng:108.95,lat:34.27};
        for(var i=0;i<20;i++)
        {
            // var point = new pointClass(this.currentPoint.lng+Math.random()*0.7,this.currentPoint.lat+Math.random()*0.7);
            let randomPoint:MyPoint={lng:newpoint.lng+Math.random()*3,lat:newpoint.lat+Math.random()*3};
            var point = toPoint(randomPoint);//this.pointArray[i].lng,this.pointArray[i].lat)
            var mkr = new BMap.Marker(point);
            map.addOverlay(mkr);
            console.log("mkr"+mkr);
            this.pointArray[i]=randomPoint;

        }
        // 让所有点在视野范围内
         map.setViewport(this.pointArray);

    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    // this.create();
    // this.loadMap();
    // this.loadToolBar();
  }

    loadToolBar(){
        console.log("loadToolBar");
        AMap.plugin('AMap.ToolBar',function(){//异步
            var toolbar = new AMap.ToolBar();
            this.map.plugin(toolbar);
        });
    }

    loadMap() {
        console.log("loadMap");
        this.map = new AMap.Map('container', {
            resizeEnable: true,
            //mapStyle:'normal',  地图类型: normal  dark  blue_night  fresh  light
            zoom: 15,
            center: [113.400675, 22.88816]
        });

        function refresh(e) {
            this.map.setMapStyle("dark");
        };

        //创建并添加工具条控件AMap.plugin
        this.map.plugin(['AMap.ToolBar'], function () {
            this.map.addControl(new AMap.ToolBar());
        });

        //创建高级信息窗体并在指定位置打开
        this.map.plugin(['AMap.AdvancedInfoWindow'],function(){
            var infowindow = new AMap.AdvancedInfoWindow({
                content: '<div class="info-title">高德地图</div><div class="info-content">'+
                '<img src="http://webapi.amap.com/images/amap.jpg">'+
                '高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。<br>'+
                '<a target="_blank" href="http://mobile.amap.com/">点击下载高德地图</a></div>',
                offset: new AMap.Pixel(0, -30)
            });
            infowindow.open(this.map, this.map.getCenter());//[116.480983, 39.989628]);
        });

        let marker = new AMap.Marker({
            position: this.map.getCenter(),
            draggable: true,
            cursor: 'move'
        });

        marker.setLabel({
            offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
            content: "华科尔科技有限公司"
        });

        marker.on('click',function(e){
            marker.markOnAMAP({
                name:'华科尔科技',
                position:marker.getPosition()
            })
        });

        //marker.content='华科尔科技有限公司'+this.map.getCenter();
        //marker.on('click', markerClick); //绑定单击事件

        marker.setMap(this.map);
        // 设置点标记的动画效果，此处为弹跳效果
        marker.setAnimation('AMAP_ANIMATION_BOUNCE');

        function markerClick(e){
            var infoWindow = new AMap.InfoWindow();
            infoWindow.setContent(e.target.content);
            infoWindow.open(this.map, e.target.getPosition());
        };
    }

    goToHomePage() {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        //this.navCtrl.push(HomePage);
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
                // this.ionViewWillEnter();
                this.ionViewDidLoad();
                this.create();
                // this.loadMap();
                // this.loadToolBar();
                console.log(111);
            }else{
                this.IsMapChoose = false;
                this.IsListChoose = true;
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
        let alarmOrmul = this.alarmOrmul;
        item.alarmOrmul = this.alarmOrmul;
        console.log(item);
        this.app.getRootNav().push(AlarmdetailPage,item);
    }
    checkAlarm(){
        this.alarmOrmul = true;
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
        this.alarmOrmul = false;
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
