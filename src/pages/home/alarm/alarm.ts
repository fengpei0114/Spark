import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { HttpService } from '../../../providers/http-service/http-service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeService } from '../../../providers/native-service/native-service'
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
    name:string;
    deviceId:string;
    pagesizenow:number;
    alarmId:any;
    alarmArray=[
        {
            "alarmNo":"01",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52.03",
            "grade":"1",
            "measure":"未确认",
            "alarmProbe":"1号探头",
        },
        {
            "alarmNo":"02",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52.03",
            "grade":"1",
            "measure":"未确认",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"03",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52.03",
            "grade":"1",
            "measure":"未确认",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"04",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52.03",
            "grade":"1",
            "measure":"1",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"05",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52.03",
            "grade":"1",
            "measure":"未确认",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"06",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"未确认",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"07",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"未确认",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"08",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"已确认",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"09",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"已确认",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"10",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"已确认",
            "alarmProbe":"1号探头",
        },{
            "alarmNo":"11",
            "alarmType":"1",
            "startTime":"2018-08-01 15:54:52.03",
            "endTime":"2018-08-01 15:55:52",
            "grade":"1",
            "measure":"已确认",
            "alarmProbe":"1号探头",
        }]



  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public httpService: HttpService,
            public http: Http,
            private alertCtrl:AlertController,
            private nativeService:NativeService,) {

      this.dataInit();
  }
  dataInit(){
    this.name = this.navParams.data;
    this.pageOther = this.alarmArray.length % 10;
    this.pageSize = (this.alarmArray.length-this.pageOther) / 10;
    console.log(this.pageSize);
    console.log(this.pageOther);
    for(var i = 0;i<10;i++) {
        this.dataArray.push(this.alarmArray[i]);
    }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }

    doInfinite(infiniteScroll){

        console.log('Begin async operation');
        console.log(infiniteScroll._scrollY);
        console.log(infiniteScroll.scrollHeight);
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

    doInfinite1(infiniteScroll){
        
                console.log('Begin async operation');
                console.log(infiniteScroll._scrollY);
                console.log(infiniteScroll.scrollHeight);
                let url = this.httpService.getUrl() + "";
                let body = "DeviceId="+this.deviceId+"&pageSize=10&pageNum"+this.pageNum;
                let headers = new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                });
                let options = new RequestOptions({
                    headers: headers
                });
                setTimeout(()=>{
                        this.http.post(url,body,options).map(res=>res.json()).subscribe(data =>{
                            console.log(data);
                            if(this.pagesizenow < 10){
                                infiniteScroll.enable(false);
                            }
                            this.pagesizenow = 0;
                            data.content.forEach((x)=>{
                                this.pagesizenow++;
                            })  
                            if(this.pagesizenow == 0){
                                infiniteScroll.enable(false);
                            }else{
                                for(let i = 0 ; i < this.pagesizenow; i++){
                                    this.dataArray.push(data.content[i]);
                                }
                            }
                        })
                    console.log('Async operation has ended');
                    infiniteScroll.complete();
                },500);
            }
            OncomfirmClick(item)
            {
                const prompt = this.alertCtrl.create({
                    title: '确认故障',
                    message: "确认设备故障",
                    inputs: [
                        {
                            type:'text',
                            name: 'dealstaff',
                            placeholder: '确认人员姓名'
                        },
                        {
                            type:'text',
                            name: 'note',
                            placeholder: '备注'
                        },
                    ],
                    buttons: [
                        {
                            text: '取消',
                            handler: data => {
                            }
                        },
                        {
                            text: '确认',
                            handler: data => {
                                this.comfirmAlarmfunction(data,item);
                            }
                        }
                    ]
                });
                prompt.present();
            }
        
            comfirmAlarmfunction(comfirmData,item) {
                if (comfirmData['dealstaff'] == "") {
                    this.nativeService.showToast("确认人不可为空！", 3000);
                }
                else {
                    // let url = this.httpService.getUrl() + "";
                    // let body = "AlarmId=1&confirmplant='移动端'&username='123123'&note=''";
                    // let headers = new Headers({
                    //     'Content-Type': 'application/x-www-form-urlencoded'
                    // });
                    // let options = new RequestOptions({
                    //     headers:headers
                    // })
                    // this.http.post(url,body,options).map(res=>res.json()).subscribe(data=>{
                    //     console.log(data);
                    // })
                    console.log(comfirmData);
                    //this.dataArray.splice(0, this.dataArray.length);
                    //this.dataInit();
                }
            }
}
