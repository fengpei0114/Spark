import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    pageNum: number = 0;
    pageOther: number = 0;
    dataArray:Array<Object> = [];
    alarmArray=[
        {
            "alarmNo":"01",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"未确认",
            "impactDevice":["1","2"],
        },
        {
            "alarmNo":"02",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"未确认",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"03",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"未确认",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"04",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"05",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"未确认",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"06",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"未确认",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"07",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"未确认",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"08",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"已确认",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"09",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"已确认",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"10",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"已确认",
            "impactDevice":["1","2"],
        },{
            "alarmNo":"11",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"已确认",
            "impactDevice":["1","2"],
        }]



  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.pageOther = this.alarmArray.length % 10;
      this.pageSize = (this.alarmArray.length-this.pageOther) / 10;
      console.log(this.pageSize);
      console.log(this.pageOther);
      for(var i = 0;i<10;i++){
          this.dataArray.push(this.alarmArray[i]);
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
                    this.dataArray.push(this.alarmArray[i+this.pageNum*10]);
                }
            }else if(this.pageNum==this.pageSize){
                for(i = 0;i<this.pageOther;i++){
                    this.dataArray.push(this.alarmArray[i+this.pageNum*10]);
                }
            }else{
                infiniteScroll.enable(false);
            }

            console.log('Async operation has ended');
            infiniteScroll.complete();
        },500);
    }
}
