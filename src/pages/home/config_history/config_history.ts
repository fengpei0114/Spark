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


    dataArray:Array<Object> = [];
    configHistoryArray = [
        {
            "id":"1",
            "configEquipment":"xxx",
            "configInfo":"添加子节点",
            "configurator":"peter"
        },
        {
            "id":"1",
            "configEquipment":"xxx",
            "configInfo":"修改子节点",
            "configurator":"tony"
        },
        {
            "id":"1",
            "configEquipment":"xxx",
            "configInfo":"添加子节点",
            "configurator":"peter"
        },
        {
            "id":"1",
            "configEquipment":"xxx",
            "configInfo":"拆除子节点",
            "configurator":"mary"
        },
        {
            "id":"1",
            "configEquipment":"xxx",
            "configInfo":"添加子节点",
            "configurator":"peter"
        },
    ]


    constructor(public http:Http,
                public app: App,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        this.pageOther = this.configHistoryArray.length % 10;
        this.pageSize = (this.configHistoryArray.length-this.pageOther) / 10;
        let maxnum=this.configHistoryArray.length<10?this.configHistoryArray.length:10;
        for(var i = 0;i<maxnum;i++) {
            this.dataArray.push(this.configHistoryArray[i]);
        }
        
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
