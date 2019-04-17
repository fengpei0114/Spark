import { Component ,ViewChild,ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private  platform:Platform,) {
  }

    ionViewWillEnter() {

        console.log("View Enter");
        let map = this.map = new BMap.Map(this.mapElement.nativeElement, {enableMapClick: true});//创建地图实例
        map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom();//连续缩放效果，默认禁用
        var geolocation = new BMap.Geolocation();
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition(function(r) {
            console.log(r.point);
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
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
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,//显示方向
            offset: sizeMap
        }));



        function showAttractionControl() {
            //定义显示位置
            this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
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
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
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
            this.pointArray[i]=randomPoint;

        }
        // 让所有点在视野范围内
         map.setViewport(this.pointArray);

    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    // this.loadMap();
    // this.loadToolBar();
  }

    loadToolBar(){
        AMap.plugin('AMap.ToolBar',function(){//异步
            var toolbar = new AMap.ToolBar();
            this.map.plugin(toolbar);
        });
    }

    loadMap() {
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


}
