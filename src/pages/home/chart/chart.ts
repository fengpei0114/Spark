import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController, NavParams,App ,ViewController} from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import HighCharts from 'highcharts';
import { NativeService } from '../../../providers/native-service/native-service';
import { GetdataProvider } from '../../providers/getdata/getdata';
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
  private alarmSum:number;
  private malfunctionSum:number;
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
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http:Http,
                private nativeService: NativeService,
                public viewCtrl: ViewController ) {
                  this.deviceId = this.navParams.data.deviceId;
                  this.alarmSum=this.navParams.data.alarmsum;
                  this.malfunctionSum=this.navParams.data.malfunctionsum;
    }

    AlarmdataInit(){
      let url = "http://192.168.0.167:7002/Statistics/alarm/countByDay/byDeviceID";
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
      let url = "http://192.168.0.167:7002/Statistics/malfunction/countByDay/byDeviceID";
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
        // this.AlarmdataInit().then(data=>{
        //     console.log(data);
        //     // console.log(this.example);
        //   for(var key in data){
        //         this.AlarmlistData.push(key);
        //         this.AlarmlistNum.push(data[key]);
        //   }
        //   this.paint();
        // })
        // this.MaldataInit().then(data=>{
        //     console.log(data);
        //     // console.log(this.example);
        //     for(var key in data){
        //         this.MallistData.push(key);
        //         this.MallistNum.push(data[key]);
        //     }
        //     this.paint();
        // })
        for(var key in this.example){
          this.AlarmlistData.push(key);
          this.MallistData.push(key);
          this.AlarmlistNum.push(this.example[key]);
          this.MallistNum.push(this.example[key]);
        }
        this.paint();
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

