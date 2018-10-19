import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

    pageSize: number = 0;
    pageNum: number = 0;
    pageOther: number = 0;
    dataArray:Array<Object> = [];
    statusArray=[
        {
            "stateNo":"01",
            "partID":"101",
            "partName":"Sensor_4",
            "partState":"0",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },
        {
            "stateNo":"02",
            "partID":"102",
            "partName":"Sensor_3",
            "partState":"1",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"03",
            "partID":"102",
            "partName":"Sensor_3",
            "partState":"1",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"04",
            "partID":"101",
            "partName":"Sensor_4",
            "partState":"0",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"05",
            "partID":"102",
            "partName":"Sensor_3",
            "partState":"1",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"06",
            "partID":"101",
            "partName":"Sensor_4",
            "partState":"0",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"07",
            "partID":"102",
            "partName":"Sensor_3",
            "partState":"1",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"08",
            "partID":"101",
            "partName":"Sensor_4",
            "partState":"0",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"09",
            "partID":"103",
            "partName":"Sensor_3",
            "partState":"1",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"10",
            "partID":"102",
            "partName":"Sensor_3",
            "partState":"1",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        },{
            "stateNo":"11",
            "partID":"101",
            "partName":"Sensor_4",
            "partState":"0",
            "partParameter1":"10",
            "partParameter2":"11",
            "modificationTime":"2018-08-01 15:54:52",
        }]



    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.pageOther = this.statusArray.length % 10;
        this.pageSize = (this.statusArray.length-this.pageOther) / 10;
        console.log(this.pageSize);
        console.log(this.pageOther);
        for(var i = 0;i<10;i++){
            this.dataArray.push(this.statusArray[i]);
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AlarmPage');
    }

    doInfinite(infiniteScroll){
        console.log('Begin async operation');

        setTimeout(()=>{
            this.pageNum++;
            console.log(this.pageNum);
            if(this.pageNum<this.pageSize){
                for(var i = 0;i<10;i++){
                    this.dataArray.push(this.statusArray[i+this.pageNum*10]);
                }
            }else if(this.pageNum==this.pageSize){
                for(i = 0;i<this.pageOther;i++){
                    this.dataArray.push(this.statusArray[i+this.pageNum*10]);
                }
            }else{
                infiniteScroll.enable(false);
            }

            console.log('Async operation has ended');
            infiniteScroll.complete();
        },500);
    }

}
