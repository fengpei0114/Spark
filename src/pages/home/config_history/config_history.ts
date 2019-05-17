import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-config-history',
  templateUrl: 'config_history.html',
})
export class ConfigHistoryPage {

   configEquipment:string;
   configInfo:string;
   configurator:string;
   pageNum:number=0;
    pageSize:number=0;
    pageOther:number=0;
    name:any;

    dataArray:Array<Object> = [];
    deviceId:any;
    configHistoryArray = [
        {
            "configId":"1",
            "configinfo":"xxx",
            "user":"peter"
        },
        {
            "configId":"1",
            "configinfo":"xxx",
            "user":"tony"
        },
        {
            "configId":"1",
            "configinfo":"xxx",
            "user":"peter"
        },
        {
            "configId":"1",
            "configinfo":"xxx",
            "user":"mary"
        },
        {
            "configId":"1",
            "configinfo":"xxx",
            "user":"peter"
        },
    ]


    constructor(public http:Http,
                public app: App,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        this.deviceId = this.navParams.data.deviceId;
        this.name = this.navParams.data.factoryName+" - "+this.deviceId;
        console.log("name"+this.name);
        this.dataInit();
        // this.pageOther = this.configHistoryArray.length % 10;
        // this.pageSize = (this.configHistoryArray.length-this.pageOther) / 10;
        // let maxnum=this.configHistoryArray.length<10?this.configHistoryArray.length:10;
        // for(var i = 0;i<maxnum;i++) {
        //     this.dataArray.push(this.configHistoryArray[i]);
        // }
        
    }
    dataInit(){
        let url = "http://192.168.0.167:7002/Config/find/byDeviceID";
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
            console.log(data);
            this.dataArray = data;
        })
    }
    getdata(){

    }

    showConfigHistory(){

    }

    doInfinite(infiniteScroll){
        console.log('Begin async operation');

        setTimeout(()=>{
            this.pageNum++;
            console.log(this.pageNum);
            if(this.pageNum<this.pageSize){
                for(var i = 0;i<10;i++){
                    this.dataArray.push(this.configHistoryArray[i+this.pageNum*10]);
                }
            }else if(this.pageNum==this.pageSize){
                for(i = 0;i<this.pageOther;i++){
                    this.dataArray.push(this.configHistoryArray[i+this.pageNum*10]);
                }
            }else{
                infiniteScroll.enable(false);
            }

            console.log('Async operation has ended');
            infiniteScroll.complete();
        },500);
    }


}
