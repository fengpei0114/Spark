import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';

/**
 * Generated class for the TaskHistoryAlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-task-history-alarm',
  templateUrl: 'task-history-alarm.html',
})
export class TaskHistoryAlarmPage {

  alarmtype:number = 0;
  createtime:string ="";
  historyAlarmData:Array<Object> = [];

  constructor(public navCtrl: NavController,
              public http: Http,
              public httpService: HttpService,
              public navParams: NavParams,
  ) {
    this.createtime = this.navParams.data[1];
    this.alarmtype = this.navParams.data[0];

    console.log(this.navParams.data);

    this.getHistoryAlarmData();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskHistoryAlarmPage');
  }

  getHistoryAlarmData() {
      let url = this.httpService.getUrl()+"/NoiseDust/getAlarmDataOfTaskInMobilePhone.do";
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let body = "alarmType="+this.alarmtype+"&createtime="+this.createtime;
      console.log(body);
      let options = new RequestOptions({
          headers: headers
      });

      this.http.post(url,body,options).map(res => res.json()).subscribe(data =>{

          console.log(data);

          if (data.data){
              console.log(data);

              this.historyAlarmData = data.data;
              console.log(this.historyAlarmData);
          }else {
            console.log("null");
          }
      });

  }

  dismiss(){
      this.navCtrl.pop().then();
  }

}
