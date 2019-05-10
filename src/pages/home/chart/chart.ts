import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import Highcharts from 'highcharts';
import { GetdataProvider } from '../../providers/getdata/getdata';
// import { preserveWhitespacesDefault } from '@angular/compiler';


@Component({
    selector: 'page-chart',
    templateUrl: 'chart.html',
})
export class ChartPage {
  listData=[];
  listNum=[];
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
    constructor(public navCtrl: NavController,
                // public getdata: GetdataProvider,
                public viewCtrl: ViewController ) {
                  this.getRequestContact();
    }

    getRequestContact(){
      this.getdataArray.chartMsg.forEach((x)=>{
        // this.listData[x.datatime]=x.mulnum;
        this.listData.push(x.datatime);
        this.listNum.push(x.mulnum);
      })
      console.log(this.listData);
      console.log(this.listNum);
    }
    
    

    ionViewDidLoad(){
       
      // this.getRequestContact();

        var chart = Highcharts.chart('alarm', {
          chart:{
           // backgroundColor:'#f2f2f2',
          },
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
                categories:this.listData
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
                // lineColor:preserveWhitespacesDefault,
                // fillOpacity: 0.1
                // fillOpacity: 0.1,
                showInLegend: false
              }
            },
            series: [{
                type:'scatter',
                name: '警报次数',
                data: this.listNum
               }]
        });


        var chart2 = Highcharts.chart('malfunction', {
          chart:{
           // backgroundColor:'#f2f2f2',
          },
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
                categories:this.listData
            },
            yAxis: {
              title: {
                text: '故障次数'
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
                pointFormat:'故障次数:{point.y}次',
            },
            plotOptions: {
              series: {
                lineWidth:0,
                // lineColor:preserveWhitespacesDefault,
                // fillOpacity: 0.1
                // fillOpacity: 0.1,
                showInLegend: false
              }
            },
            series: [{
                type:'scatter',
                name: '警报次数',
                data: this.listNum
               }]
        });
        
    }
    
    dismiss(){
      this.viewCtrl.dismiss().then();
    }
}

