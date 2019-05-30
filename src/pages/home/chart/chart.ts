import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController, NavParams,App ,ViewController} from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import HighCharts from 'highcharts';
import { NativeService } from '../../../providers/native-service/native-service';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { HttpService } from '../../../providers/http-service/http-service';
// import { preserveWhitespacesDefault } from '@angular/compiler';


@Component({
    selector: 'page-chart',
    templateUrl: 'chart.html',
})
export class ChartPage {
  @ViewChild('alarm')       public alarmElement  : ElementRef;
  @ViewChild('malfunction') public malElement    : ElementRef;

  public AlarmlistData:Array<any>=[];
  public MallistData=[];
  public AlarmlistNum=[];
  public MallistNum=[];
  public deviceId:any;
  private _chart: any;
  public getdataArray={
    "MulNum":"12",
    "chartMsg":[{
      "datatime":"2019-01-02",
      "mulnum":2
    },{
      "datatime":"2019-01-03",
      "mulnum":2
    },{
      "datatime":"2019-01-04",
      "mulnum":1
    },{
      "datatime":"2019-01-05",
      "mulnum":1
    },{
      "datatime":"2019-01-06",
      "mulnum":0
    },{
      "datatime":"2019-01-07",
      "mulnum":0
    },{
      "datatime":"2019-01-08",
      "mulnum":3
    },{
      "datatime":"2019-01-09",
      "mulnum":0
    },{
      "datatime":"2019-01-10",
      "mulnum":1
    },{
      "datatime":"2019-01-11",
      "mulnum":0
    }]
  }
  example={
    "2019-05-11":1,
    "2019-05-12":0,
    "2019-05-13":3,
    "2019-05-14":0,
    "2019-05-15":2,
    "2019-05-16":0,
    "2019-05-17":0,
    "2019-05-18":4,
    "2019-05-19":0,
    "2019-05-20":1,
  }
  public alarmdom:any;
  public maldom:any;
  public alarmSum:number;
  public malsum:number;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http:Http,
                private nativeService: NativeService,
                private httpService:HttpService,
                public viewCtrl: ViewController ) {
                  this.deviceId = this.navParams.data.deviceId;
                  this.alarmSum = 0;
                  this.malsum = 0;
    }

    AlarmdataInit(){
      let url = this.httpService.getUrl()+"/Statistics/alarm/countByDay/byDeviceID";
      let body = {
          "deviceID":this.deviceId,
      }
      let headers = new Headers({
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Accept': 'application/json'
      })
      let options = new RequestOptions({
          headers: headers
      });
      return new Promise((resolve,reject) => {
        this.http.post(url, JSON.stringify(body), options)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            },err => {
                reject(err);
            });
    });
    }
    MaldataInit(){
      let url = this.httpService.getUrl()+"/Statistics/malfunction/countByDay/byDeviceID";
      let body = {
          "deviceID":this.deviceId,
      }
      let headers = new Headers({
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Accept': 'application/json'
      })
      let options = new RequestOptions({
          headers: headers
      });
      return new Promise((resolve,reject) => {
        this.http.post(url, JSON.stringify(body), options)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            },err => {
                reject(err);
            });
    });
    }
    ionViewDidLoad(){
        this.deviceId = this.navParams.data.deviceId;
        this.nativeService.showLoading('正在加载...');
        this.AlarmdataInit().then(data=>{
            console.log(data);
          for(var key in data){
                this.AlarmlistData.push(key);
                if(data[key]==0){
                  this.AlarmlistNum.push(null);
                }else{
                  this.AlarmlistNum.push(data[key]);
                }
                this.alarmSum += data[key];
          }
          this.paint();
        })
        this.MaldataInit().then(data=>{
            console.log(data);
            for(var key in data){
                this.MallistData.push(key);
                if(data[key]==0){
                  this.MallistNum.push(null);
                }else{
                  this.MallistNum.push(data[key]);
                }
                this.malsum += data[key];
            }
            this.paint();
        })
        //测试使用
        // for(var key in this.example){
        //   this.AlarmlistData.push(key);
        //   this.MallistData.push(key);
        //   if(this.example[key]==0){
        //     this.MallistNum.push(null);
        //   }else{
        //     this.MallistNum.push(this.example[key]);
        //   }
        //   this.alarmSum += this.example[key];
        // }
        // this.malsum = this.alarmSum;
        // this.AlarmlistNum=[2,2,null,null,null,null,null,null,null,5];
        // console.log(this.AlarmlistNum);
        
        // this.paint();
        this.nativeService.hideLoading();
    }

    paint(){
      let opts1:any = {
        title:{
          text:null
        },
        credits:{
          enabled:false
         },
        xAxis: {
          title: {
            text: '时间'
        },
            categories:this.AlarmlistData
        },
        yAxis: {
          title: {
            text: '警报次数'
        },           
        allowDecimals:false,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat:'<b>{point.x}</b><br>',
            pointFormat:'警报次数:{point.y}次',
        },
        plotOptions: {
          series: {
            lineWidth:0,
            showInLegend: false
          }
        },
        series: [{
            type:'scatter',
            name: '警报次数',
            color: 'rgb(255,0,0)',
            data: this.AlarmlistNum
           }]
      }

      let opts2:any = {
        title:{
          text:null
        },
        credits:{
          enabled:false
         },
        xAxis: {
          title: {
            text: '时间'
        },
            categories:this.MallistData
        },
        yAxis: {
          title: {
            text: '警报次数'
        },           
        allowDecimals:false,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat:'<b>{point.x}</b><br>',
            pointFormat:'警报次数:{point.y}次',
        },
        plotOptions: {
          series: {
            lineWidth:0,
            showInLegend: false
          }
        },
        series: [{
            type:'scatter',
            name: '警报次数',
            color: 'rgb(255,0,0)',
            data: this.MallistNum
           }]
      }

      if (this.alarmElement && this.alarmElement.nativeElement) {
        opts1.chart = {
            type: 'scatter',
            backgroundColoe:'rgba(255, 255, 255, 0.116)',
            renderTo: this.alarmElement.nativeElement,
            zoomType: 'x',
            marginRight: 10,
            marginTop:20,
            height:200 ,
            spacingBottom: 0 ,
          };
        this._chart = new HighCharts.Chart(opts1);
        this._chart.redraw;
    }
    if (this.malElement && this.malElement.nativeElement) {
      opts2.chart = {
          type: 'scatter',
          renderTo: this.malElement.nativeElement,
          zoomType: 'x',
          marginRight: 10,
          marginTop:20,
          height:200 ,
          spacingBottom: 0 ,
        };
      this._chart = new HighCharts.Chart(opts2);
      this._chart.redraw;
  }
      
    }
    
    dismiss(){
      this.viewCtrl.dismiss().then();
    }
}

