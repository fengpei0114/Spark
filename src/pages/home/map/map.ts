import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

    public map  : any;
    longitude   : number = 0.0;
    latitude    : number = 0.0;
    projectName : string = "";
    pointName   : string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log(this.navParams.data);
        this.latitude  = this.navParams.data[0];
        this.longitude = this.navParams.data[1];
        this.projectName = this.navParams.data[2];
        this.pointName = this.navParams.data[3];
    }


    loadMap() {
        let iconOfmarker = new AMap.Icon({//未用
            image     : 'assets/position_green.png',
            size      : new AMap.Size(36,36),
            imageSize : new AMap.Size(36,36),
        });

        let map = new AMap.Map('container', {
            resizeEnable : true,
            zoom         : 8,
            center       : [this.longitude,this.latitude],
        });
        // AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
        //     function(){
        //         this.map.addControl(new AMap.ToolBar());
        //
        //         this.map.addControl(new AMap.Scale());
        //
        //         this.map.addControl(new AMap.OverView({isOpen:true}));
        //     });
        // let marker = new AMap.Marker({
        //     position : [this.longitude,this.latitude],
        //     icon     : iconOfmarker,
        // });
        // this.map.marker = marker;
        // var circle = new AMap.Circle({
        //     center: this.map.marker.position,
        //     radius: 100,
        //     fillOpacity:0.2,
        //     strokeWeight:1
        // })
        // circle.setMap(this.map);
        // this.map.setFitView();
        // var info = new AMap.InfoWindow({
        //     content:this.projectName+"<br>"+this.pointName,
        //     offset:new AMap.Pixel(0,12)
        // });
        // info.open(this.map,this.map.marker.position);

        let marker = new AMap.Marker({
            position: [this.longitude,this.latitude],
            icon : iconOfmarker
        });
        marker.setMap(map);
        let info = new AMap.InfoWindow({
            content:this.projectName+"<br>"+this.pointName,
            offset:new AMap.Pixel(14,-10)
        });
        info.open(map,marker.getPosition());

    }

    ionViewDidLoad() {
        this.loadMap();
    }

}
