import { Component ,ElementRef ,ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController,AlertController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service/http-service";
import { Http, Headers, RequestOptions } from "@angular/http";
import HighCharts from 'highcharts';
/**
 * Generated class for the StatisticOfHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-statistic-of-home',
  templateUrl: 'statistic-of-home.html',
})
export class StatisticOfHomePage {
    @ViewChild('chart')        public chartEl        : ElementRef;
    @ViewChild('chartOfPM25')  public chartOfPM25El  : ElementRef;
    @ViewChild('chartOfPM10')  public chartOfPm10El  : ElementRef;
    @ViewChild('chartOfNoise') public chartOfNoiseEl : ElementRef;
    private _chart: any;
    pointName : string = "";
    projectName : string = "";
    deviceId  : number = -1;
    deviceData: object = null;
    projectId : number = -1;
    collectId : number = -1;



    constructor(public  navCtrl: NavController,
                public  navParams: NavParams,
                private viewCtrl: ViewController,
                private http: Http,
                private alertCtrl: AlertController,
                private httpService: HttpService
    ) {
        
    }


}
