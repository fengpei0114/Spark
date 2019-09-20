import { Component,Output,EventEmitter ,OnInit ,ElementRef ,ViewChild } from '@angular/core';
import { PopoverController ,NavController, NavParams, AlertController,Events } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Http, Headers ,RequestOptions } from '@angular/http';
import HighCharts from 'highcharts';
// import { ChartComponent } from "angular2-highcharts";
import { HttpService } from '../../../providers/http-service/http-service';
import { AccountService } from '../../../providers/account-service/account-service';
import { OrganizationServiceProvider } from "../../../providers/organization-service/organization-service";

// import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-statistic-detail',
  templateUrl: 'statistic-detail.html',
  providers: [OrganizationServiceProvider]
})
export class StatisticDetailPage implements OnInit{
    public timeCount: number = 0;
    @ViewChild('chart') public chartEl: ElementRef;
    private _chart: any;
    chartDisplay: boolean = false;

    //highCharts使用
    options:Object;

    organization:string = "";
    project:string = "";
    collectionPoint:string = "";
    organData:Array<Object>= [];
    projectData:Array<Object>;
    collectionData:Array<Object>;

    @Output() organizationOut = new EventEmitter();
    @Output() projectOut = new EventEmitter();
    @Output() collectionpointOut = new EventEmitter();

    title: string = "一天";
    //统计开始时间、结束时间
    startTime: string = "";
    endTime: string = "";
    //打开关闭时间选择窗口
    changeTimePic: boolean ;

    //highChart的tickInterval
    tickInterval: number = 0;

    //确定查询时间类型
    timeChangeInterVal: string = "天";
    categoriesOfNoise:Array<string>;
    categoriesOfPm25:Array<string>;
    categoriesOfPm10:Array<string>;
    categoriesOfLX:Array<string>;
    categoriesOfGD:Array<string>;
    categoriesOfWell:Array<string>;

    Xcategories = [];
    YDateTimes = [];
    //时间查询周期
    timePic = 0;
    //统计类型
    statisticType:number = -1;


    //Task传进来的数据接收
    isTaskToStatistic:boolean = false;
    organizationId: any = 0;
    organizationName: string = "";
    prjId: any = 0;
    prjName: any = "";
    attentionPoints:Array<Object> = [];//关注采集点列表
    accountId: number = -1;
    menu:Array<object> = [];
    constructor(public navCtrl: NavController,
                public popCtrl: PopoverController,
                private viewCtrl: ViewController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                // public highcharts: ChartComponent,
                public http: Http,
                public events: Events,
                public httpService: HttpService,
                public accountService: AccountService,
    ) {

        console.log(this.navParams.data);
        this.statisticType = this.navParams.get('type');
        this.timePic = 0;
        // if (typeof(this.navParams.get('isTaskToStatistic'))!=="undefined"){
        //     this.organizationId = this.navParams.get('organizationId');
        //     this.organizationName = this.navParams.get('organizationName');
        //     this.isTaskToStatistic = this.navParams.get('isTaskToStatistic');
        //     if(this.isTaskToStatistic !== true) {
        //         this.getOrganization();
        //     }
        //     this.prjId = this.navParams.get('projectId');
        //     this.prjName = this.navParams.get('projectName');
        //     this.project = this.prjId;
        //     console.log(this.organizationName);

        //     this.projectChange();
        // }else {
            console.log("12312311");
            this.getOrganization();
            events.subscribe('organ:select',item => {
                console.log("订阅事件");
            
            this.organization = item.id;
            
            this.organChange();
        });
        //}
        this.setUpTime(0);
    }

    //初始化组织机构数据
    getOrganization() {
        let organizationId = (this.accountService.getAccount() as any).role['organizationId'];
        console.log("orgID===");
        console.log(organizationId);
        let url;// = this.httpService.getUrl()+"/NoiseDust/getOrganizationTreeDataForApp.do";
        // let url = this.httpService.getUrl()+"/NoiseDust/getSelectableOrganizationsForApp.do";
        // var url = this.appConfig.getUrl()+'/NoiseDust/getOrganizations.do';
        let body= "organizationId="+organizationId;

        console.log((this.accountService.getAccount() as any).role['organizationId']);
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,body,options).map(res =>res.json()).subscribe(data => {
            
            if(data.length != 0) {
                
                this.menu = [];
            }
            this.menu.push(data);
            console.log("123123"+this.menu);

            if(typeof((this.accountService.getAccount() as any).accountId) !="undefined"){
                this.accountId = (this.accountService.getAccount() as any).accountId;
                this.selectAccountAttentionPoints(this.accountId);
            }
        
        });
    }
    selectAccountAttentionPoints(accountId){
        this.attentionPoints = [];
        let url;// = this.httpService.getUrl()+"/NoiseDust/getAccountAttentionPoints.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "accountId="+accountId;
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,body,options).map(res =>res.json()).subscribe(result =>{
            this.attentionPoints = result;

            console.log("+++++++++attention+++++++++");
            console.log(this.attentionPoints);

        },err =>{

        });
    }
    //初始化操作

    setUpTime(timeInterval) {
        this.startTime = this.getBeforeDate(timeInterval)+" 00:00:00";
        this.endTime = this.getBeforeDate(0)+" 23:59:59";

        console.log("start"+this.startTime);
    }

    organChange() {
        this.organizationOut.emit(this.organization);
        let url;// this.httpService.getUrl()+"/NoiseDust/getProjectsByOrg.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "id="+this.organization;
        let options = new RequestOptions({
            headers: headers
        });


        this.http.post(url,body,options).map(res => res.json()).subscribe(data =>{
            console.log(data);
            this.projectData = data;
        });
    }

    projectChange() {
        this.projectOut.emit(this.project);
        let url ;//= this.httpService.getUrl()+"/NoiseDust/getCollectionOfProject.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "id="+this.project;
        let options = new RequestOptions({
            headers: headers
        });


        this.http.post(url,body,options).map(res => res.json()).subscribe(data =>{
            // console.log(data);
            this.collectionData = data;
        });
    }

    collectionPointChange() {
        this.collectionpointOut.emit(this.collectionPoint);
        this.statistic();
    }

    statistic() {

        switch (this.statisticType){
            case 0:
                this.QueryOfNoise();
                break;
            case 1:
                this.QueryOfPm25();
                break;
            case 2:
                this.QueryOfPm10();
                break;
            case 3:
                this.QueryOfFixWaterLevel();
                break;
            case 4:
                this.QueryOfConWaterLevel();
                break;
            case 5:
                this.QueryOfWell();
                break;
        }
    }

    changeTime(myEvent) {
        this.showRadio();

    }

    showRadio() {
        let alert = this.alertCtrl.create();
        alert.setTitle('选择时间');

        alert.addInput({
            type: 'radio',
            label: '一天',
            value: '0',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: '三天',
            value: '2',
        });

        alert.addInput({
            type: 'radio',
            label: '一周',
            value: '6'
        });



        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                this.changeTimePic = false;
                this.timePic = data;
                if (this.timePic == 0){
                    this.timeChangeInterVal = "天";
                    this.title = "一天";
                }else if(this.timePic == 2){
                    this.timeChangeInterVal = "三天";
                    this.title = "三天";
                }else {
                    this.timeChangeInterVal = "周";
                    this.title = "一周"
                }
                console.log(this.timePic);
                this.setUpTime(this.timePic);
            }
        });


        alert.present().then(() =>{
            this.changeTimePic = true;
            this.statistic();
        });
    }


    getTimeBefore(){
        if (this.timeChangeInterVal == "天"){
            this.timeCount ++;
            console.log(this.timeCount);
            this.setUpTime(this.timeCount);
        }else if(this.timeChangeInterVal == "三天") {
            this.timeCount = this.timeCount+3;
            console.log(this.timeCount);
            this.setUpTime(this.timeCount);
        }else {
            this.timeCount = this.timeCount + 7;

            console.log(this.timeCount);
            this.setUpTime(this.timeCount);
        }
        this.statistic();
    }
    getTimeAfter(){

        let alert = this.alertCtrl.create({
            title: '查询失败',
            subTitle: '日期选择超出当前日期！',
            buttons: ['返回'],
        });

        if (this.timeChangeInterVal == "天"){
            if (this.timeCount >0) {
                this.timeCount --;
                this.setUpTime(this.timeCount);
            }else {
                alert.present().then();
            }
        }else if(this.timeChangeInterVal == "三天") {
            if (this.timeCount > 3) {
                this.timeCount = this.timeCount - 3;
                this.setUpTime(this.timeCount);
            }else {
                alert.present().then();
            }
        }else {
            if (this.timeCount > 7) {
                this.timeCount = this.timeCount - 7;
                this.setUpTime(this.timeCount);
            }else {
                alert.present().then();
            }
        }
        this.statistic();
    }

    getBeforeDate(before){
        var n = before;
        var d = new Date();
        var year = d.getFullYear();
        var mon=d.getMonth()+1;
        var day=d.getDate();
        if(day <= n){
            if(mon>1) {
                mon=mon-1;
            }
            else {
                year = year-1;
                mon = 12;
            }
        }
        d.setDate(d.getDate()-n);
        year = d.getFullYear();
        mon=d.getMonth()+1;
        day=d.getDate();
        let s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        return s;
    }



    QueryOfNoise() {

        let  xcategories = [];
        let  categoriesOfNoise = [];
        let startTime:String = this.startTime;
        let endTime:String = this.endTime;
        console.log(startTime +"   "+endTime);
        this.collectionpointOut.emit(this.collectionPoint);

        console.log(this.collectionPoint);
        let url;// = this.httpService.getUrl()+"/NoiseDust/getNoiseByPointID.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "pointId="+this.collectionPoint+"&startTime="+startTime+"&endTime="+endTime;
        console.log(body);
        let options = new RequestOptions({
            headers: headers
        });


        this.http.post(url,body,options).map(res =>res.json()).subscribe(data =>{
            //显示图表
            this.chartDisplay = true;
            setTimeout(()=>{
                if (data){
                    if (data.length > 1){
                        this.tickInterval = data.length / 2;
                    }else {
                        this.tickInterval = 1;
                    }

                    for (let i = 0 ;i < data.length; i ++){

                        let dt = new Date(data[i].time);
                        let xAxisDate = dt.toLocaleString();
                        xcategories.push(xAxisDate);
                        let yAxisDate = data[i].noise;
                        categoriesOfNoise.push(yAxisDate);
                    }
                    this.Xcategories = xcategories;
                    this.categoriesOfNoise = categoriesOfNoise;
                    this.QueryOfNoiseChart();
                    this.QueryOfNoiseChart();
                }else {
                    console.log("null");
                }
            },2000);

        });



    }

    QueryOfPm25() {

        let  xcategories = [];
        let  categoriesOfPm25 = [];
        let startTime:String = this.startTime;
        let endTime:String = this.endTime;
        console.log(startTime +"   "+endTime);
        this.collectionpointOut.emit(this.collectionPoint);

        console.log(this.collectionPoint);
        let url ;//= this.httpService.getUrl()+"/NoiseDust/getPm25ByPointID.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "pointId="+this.collectionPoint+"&startTime="+startTime+"&endTime="+endTime;
        console.log(body);
        let options = new RequestOptions({
            headers: headers
        });


        this.http.post(url,body,options).map(res =>res.json()).subscribe(data =>{
            //显示图表
            this.chartDisplay = true;
            if (data[0] !== null){
                if (data.length > 1){
                    this.tickInterval = data.length / 2;
                }else {
                    this.tickInterval = 1;
                }
                for (var i = 0 ;i < data.length; i ++){

                    var  dt = new Date(data[i].time);
                    var xAxisDate = dt.toLocaleString();
                    xcategories.push(xAxisDate);
                    var yAxisDate = data[i].pm25;
                    categoriesOfPm25.push(yAxisDate);
                }
                this.Xcategories = xcategories;
                this.categoriesOfPm25 = categoriesOfPm25;
                this.QueryOfPm25Chart();
                this.QueryOfPm25Chart();
            }else {
               let alert = this.alertCtrl.create({
                    title: '查询失败',
                    subTitle: '该时段无数据！',
                    buttons: ['返回'],
                });

               alert.present().then();
                // this.searchFail();
            }

        });

    }

    QueryOfPm10() {

        let  xcategories = [];
        let  categoriesOfPm10 = [];
        let startTime:String = this.startTime;
        let endTime:String = this.endTime;
        console.log(startTime +"   "+endTime);
        this.collectionpointOut.emit(this.collectionPoint);

        console.log(this.collectionPoint);
        let url ;//= this.httpService.getUrl()+"/NoiseDust/getPm10ByPointID.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "pointId="+this.collectionPoint+"&startTime="+startTime+"&endTime="+endTime;
        console.log(body);
        let options = new RequestOptions({
            headers: headers
        });


        this.http.post(url,body,options).map(res =>res.json()).subscribe(data =>{
            //显示图表
            this.chartDisplay = true;
            console.log(data);
            if (data) {
                if (data.length > 1){
                    this.tickInterval = data.length / 2;
                }else {
                    this.tickInterval = 1;
                }

                for (let i = 0 ;i < data.length; i ++){

                    let  dt = new Date(data[i].time);
                    let xAxisDate = dt.toLocaleString();
                    // let yDateTime = dt.toUTCString();
                    xcategories.push(xAxisDate);
                    // this.YDateTimes.push(yDateTime);
                    let yAxisDate = data[i].pm10;
                    categoriesOfPm10.push(yAxisDate);
                }
                this.Xcategories = xcategories;
                this.categoriesOfPm10 = categoriesOfPm10;
                this.QueryOfPm10Chart();
                this.QueryOfPm10Chart();
            }else {
                this.searchFail();
            }

        });



    }



    QueryOfConWaterLevel() {

        let  xcategories = [];
        let  categoriesOfLX = [];
        let startTime:String = this.startTime;
        let endTime:String = this.endTime;
        console.log(startTime +"   "+endTime);
        this.collectionpointOut.emit(this.collectionPoint);

        console.log(this.collectionPoint);
        let url  ;//this.httpService.getUrl()+"/NoiseDust/getContinuationByPointID.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "pointId="+this.collectionPoint+"&startTime="+startTime+"&endTime="+endTime;
        console.log(body);
        let options = new RequestOptions({
            headers: headers
        });


        this.http.post(url,body,options).map(res =>res.json()).subscribe(data =>{

            if (data.warn === null) {
                this.searchFail();
            }else {
                //显示图表
                this.chartDisplay = true;
                if (data.length > 1){
                    this.tickInterval = data.length / 2;
                }else {
                    this.tickInterval = 1;
                }
                for (var i = 0 ;i < data.length; i ++){

                    var  dt = new Date(data[i].dmonitorDate);
                    var xAxisDate = dt.toLocaleString();
                    xcategories.push(xAxisDate);
                    var yAxisDate = data[i].warn;
                    categoriesOfLX.push(yAxisDate);
                }
                this.Xcategories = xcategories;
                this.categoriesOfLX = categoriesOfLX;
                this.QueryOfLXChart();
            }

        });



    }

    QueryOfFixWaterLevel() {

        let  xcategories = [];
        let  categoriesOfGD = [];
        let startTime:String = this.startTime;
        let endTime:String = this.endTime;
        console.log(startTime +"   "+endTime);
        this.collectionpointOut.emit(this.collectionPoint);

        console.log(this.collectionPoint);
        let url ;//= this.httpService.getUrl()+"/NoiseDust/getGDByPointID.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "pointId="+this.collectionPoint+"&startTime="+startTime+"&endTime="+endTime;
        console.log(body);
        let options = new RequestOptions({
            headers: headers
        });


        this.http.post(url,body,options).map(res =>res.json()).subscribe(data =>{
            console.log(data);
            if (data.status === null) {
                this.searchFail();
            }else {
                //显示图表
                this.chartDisplay = true;
                if (data.length > 1){
                    this.tickInterval = data.length / 2;
                }else {
                    this.tickInterval = 1;
                }
                for (var i = 0 ;i < data.length; i ++){

                    var  dt = new Date(data[i].time);
                    var xAxisDate = dt.toLocaleString();
                    xcategories.push(xAxisDate);
                    var yAxisDate = data[i].status;
                    categoriesOfGD.push(yAxisDate);
                }
                this.Xcategories = xcategories;
                this.categoriesOfGD = categoriesOfGD;
                this.QueryOfGDChart();
            }

        });
    }

    QueryOfWell() {

        let xcategories = [];
        let categoriesOfWell = [];
        let startTime:String = this.startTime;
        let endTime:String = this.endTime;
        console.log(startTime +"   "+endTime);
        this.collectionpointOut.emit(this.collectionPoint);

        console.log(this.collectionPoint);
        let url ;//= this.httpService.getUrl()+"/NoiseDust/getJGByPointID.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "pointId="+this.collectionPoint+"&startTime="+startTime+"&endTime="+endTime;
        console.log(body);
        let options = new RequestOptions({
            headers: headers
        });


        this.http.post(url,body,options).map(res =>res.json()).subscribe(data =>{
            //显示图表
            this.chartDisplay = true;
            console.log(data);
            setTimeout(()=>{
                if (data){
                    if (data.length > 1){
                        this.tickInterval = data.length / 2;
                    }else {
                        this.tickInterval = 1;
                    }

                    for (let i = 0 ;i < data.length; i ++){

                        console.log(data);
                        let dt = new Date(data[i].time);
                        let xAxisDate = dt.toLocaleString();
                        xcategories.push(xAxisDate);
                        let yAxisDate = data[i].status;
                        categoriesOfWell.push([xAxisDate,yAxisDate]);
                    }
                    this.Xcategories = xcategories;
                    this.categoriesOfWell = categoriesOfWell;
                    console.log(categoriesOfWell);
                    this.QueryOfWellChart();
                }else {
                    console.log("null");
                }
            },2000);

        });



    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NoiseStatisticPage');
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }



    ngOnInit(){

    }

    QueryOfWellChart(){
        let opts: any = {

            lang: {
                printChart:"打印图表",
                downloadJPEG: "下载JPEG 图片" ,
                downloadPDF: "下载PDF文档"  ,
                downloadPNG: "下载PNG 图片"  ,
                downloadSVG: "下载SVG 矢量图" ,
                exportButtonTitle: "导出图片" ,
                resetZoom:"重置图片"
            },
            title: {
                text: '单个数据采集点的井盖状态图',
                align: 'center',
                verticalAlign: 'bottom',
                // x: -20
            },
            credits : {
                enabled : false
            },
            xAxis: {
                type: 'datetime',
                tickInterval:this.Xcategories.length / 2,
                categories:this.Xcategories
            },
            yAxis : {
                lineWidth: 1,
                    title : {
                    text : '井盖状态'
                },
                gridLineWidth:0,
                labels: {
                    formatter:function(){
                        if(this.value ==0) {
                            return"关闭";
                        }else if(this.value ==1) {
                            return"打开";
                        }
                    }

                }
            },
            tooltip: {
                formatter: function() {
                    let yStatus = "关闭";
                    if(this.y==0){
                        yStatus="关闭";
                    }else if(this.y ==1) {
                        yStatus="打开";
                    }
                    return '<b>' + this.series.name + '</b><br/>时间：'+this.x +'<br/>井盖状态：'+ yStatus;
                }
            },
            plotOptions: {
                area: {
                    // fillColor: {
                    //     linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    //     // stops: [
                    //     //     [0, this.highcharts.getOptions().colors[0]],
                    //     //     [1, highchart.Color(highchart.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    //     // ]
                    // },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series:
                [{
                    step: true,
                    name: '数据采集点的井盖状态',
                    data: this.categoriesOfWell
                }]
        };
        if (this.chartEl && this.chartEl.nativeElement) {
            opts.chart = {
                type: 'line',
                renderTo: this.chartEl.nativeElement,
                zoomType: 'x',
                marginRight: 10,
                marginTop:20,
                spacingBottom: 0 ,
                position: {
                    x: 0,
                    y: -30
                }};
            this._chart = new HighCharts.Chart(opts);
            this._chart.redraw;
        }
    }


    QueryOfNoiseChart() {
        let opts: any = {

            lang: {
                printChart:"打印图表",
                downloadJPEG: "下载JPEG 图片" ,
                downloadPDF: "下载PDF文档"  ,
                downloadPNG: "下载PNG 图片"  ,
                downloadSVG: "下载SVG 矢量图" ,
                exportButtonTitle: "导出图片" ,
                resetZoom:"重置图片"
            },
            title: {
                text: '噪音统计',
                align: 'center',
                verticalAlign: 'bottom',
                // x: -20
            },
            credits : {
                enabled : false
            },
            xAxis: {
                type: 'datetime',
                tickInterval:this.Xcategories.length / 2,
                categories:this.Xcategories
            },
            yAxis : {
                floor: 30,
                ceiling: 200,
                title : {
                    text : '(dB)'
                },
                plotLines : [
                    {
                        value : 0,
                        width : 1,
                        color : '#808080'
                    },
                ]

            },
            // tooltip : {
            //     formatter : function()
            //     {
            //         return '<b>' +  this.highcharts.numberFormat(this.y, 2) + '</b><br>'
            //             + this.x + '<br>';
            //     }
            // },
            plotOptions: {
                area: {
                     fillColor: {
                         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                         stops: [
                            [0, 'rgb(124,181,236)'],
                            [1, 'rgba(124,181,236,0)']
                        ]
                     },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series:
                [{
                    type: 'area',
                    name: '噪音',
                    data: this.categoriesOfNoise
                }]
        };
        if (this.chartEl && this.chartEl.nativeElement) {
            opts.chart = {
                type: 'spline',
                renderTo: this.chartEl.nativeElement,
                zoomType: 'x',
                marginRight: 10,
                marginTop:20,
                height:200 ,
                spacingBottom: 0 ,
                position: {
                    x: 0,
                    y: -30
                }};
            this._chart = new HighCharts.Chart(opts);
            this._chart.redraw;
        }
    }

    QueryOfPm25Chart() {
        let opts: any = {

            lang: {
                printChart:"打印图表",
                downloadJPEG: "下载JPEG 图片" ,
                downloadPDF: "下载PDF文档"  ,
                downloadPNG: "下载PNG 图片"  ,
                downloadSVG: "下载SVG 矢量图" ,
                exportButtonTitle: "导出图片" ,
                resetZoom:"重置图片"
            },
            title: {
                text: '',
                align: 'center',
                // x: -20
            },
            credits : {
                enabled : false
            },
            xAxis: {
                type: 'datetime',
                tickInterval:this.Xcategories.length / 2 ,
                categories:this.Xcategories
            },
            yAxis : {
                min : 0,
                title : {
                    text: 'Pm2.5'
                },
                plotLines : [
                    {
                        value : 0,
                        width : 1,
                        color : '#808080'
                    },
                    {
                        color:'#00E400',            //线的颜色，定义为红色
                        //dashStyle:'solid',     //默认是值，这里定义为长虚线
                        value:35,              //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                        width:1,               //标示线的宽度，2px
                        label:{
                            text:'一级（优）',     //标签的内容
                            align:'left',                //标签的水平位置，水平居左,默认是水平居中center
                            x:10,                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                            style:{
                                fontSize:'12px',
                            }
                        }
                    },
                    {
                        color:'#FFFF00',
                        value:75,
                        width:1,
                        label:{
                            text:'二级（良）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',

                            }
                        }
                    },
                    {
                        color:'#FF7E00',
                        value:115,
                        width:1,
                        label:{
                            text:'三级（轻度污染）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',

                            }
                        }
                    },
                    {
                        color:'#FF0000',
                        value:150,
                        width:1,
                        label:{
                            text:'四级（中度污染）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    },
                    {
                        color:'#99004C',
                        value:250,
                        width:1,
                        label:{
                            text:'五级（重度污染）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    },
                    {
                        color:'#7E0023',
                        value:500,
                        width:1,
                        label:{
                            text:'六级（严重污染）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    }
                ]
            },
            plotOptions: {
                area: {
                    // fillColor: {
                    //     linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    //     // stops: [
                    //     //     [0, highchart.getOptions().colors[0]],
                    //     //     [1, highchart.Color(highchart.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    //     // ]
                    // },
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                           [0, 'rgb(124,181,236)'],
                           [1, 'rgba(124,181,236,0)']
                       ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            // tooltip :
            //     {
            //         formatter : function()
            //         {
            //             return this.x + '</br>'
            //                 + highchart.numberFormat(this.y, 2);
            //         }
            //     },
            series:
                [{
                    type: 'area',
                    name: 'PM2.5',
                    data: this.categoriesOfPm25
                }]
        };
        if (this.chartEl && this.chartEl.nativeElement) {
            opts.chart = {
                type: 'spline',
                renderTo: this.chartEl.nativeElement,
                zoomType: 'x',
                marginRight: 10,
                height:200 ,
                marginTop:20,
                spacingBottom: 0            };
            this._chart = new HighCharts.Chart(opts);
            this._chart.redraw;
        }
    }

    QueryOfPm10Chart() {
        let opts: any = {

            lang: {
                resetZoom:"重置图片"
            },
            title: {
                text: 'PM10数据',
                align: 'center',
                // x: -20
            },
            xAxis: {
                showLastLabel:true,
                tickInterval:this.Xcategories.length / 2 ,
                type: 'datetime',
                categories:this.Xcategories,

            },
            yAxis : {
                min : 0,
                title : {
                    text: '（um/m³）',
                    align: 'center',
                },
                plotLines : [
                    {
                        value : 0,
                        width : 1,
                        color : '#808080'
                    },{
                        color:'#00E400',            //线的颜色，定义为红色
                        //dashStyle:'solid',     //默认是值，这里定义为长虚线
                        value:35,              //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                        width:1,               //标示线的宽度，2px
                        label:{
                            text:'一级（优）',     //标签的内容
                            align:'left',                //标签的水平位置，水平居左,默认是水平居中center
                            x:10,                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    },
                    {
                        color:'#FFFF00',
                        value:75,
                        width:1,
                        label:{
                            text:'二级（良）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    },
                    {
                        color:'#FF7E00',
                        value:115,
                        width:1,
                        label:{
                            text:'三级（轻度污染）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    },
                    {
                        color:'#FF0000',
                        value:150,
                        width:1,
                        label:{
                            text:'四级（中度污染）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    },
                    {
                        color:'#99004C',
                        value:250,
                        width:1,
                        label:{
                            text:'五级（重度污染）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    },
                    {
                        color:'#7E0023',
                        value:500,
                        width:1,
                        label:{
                            text:'六级（严重污染）',
                            align:'left',
                            x:10,
                            style:{
                                fontSize:'12px',
                                //fontWeight:'bold'
                            }
                        }
                    }
                ]
            },
            plotOptions: {
                area: {
                    // fillColor: {
                    //     linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    //     // stops: [
                    //     //     [0, highchart.getOptions().colors[0]],
                    //     //     [1, highchart.Color(highchart.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    //     // ]
                    // },
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                           [0, 'rgb(124,181,236)'],
                           [1, 'rgba(124,181,236,0)']
                       ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            // tooltip :
            //     {
            //         formatter : function()
            //         {
            //             return this.x + '</br>';
            //                 // + this.highcharts.numberFormat(this.y, 2);
            //         }
            //     },
            series:
                [{
                    type: 'area',
                    name: 'Pm10',
                    data: this.categoriesOfPm10
                }]
        };
        if (this.chartEl && this.chartEl.nativeElement) {
            opts.chart = {
                type: 'spline',
                renderTo: this.chartEl.nativeElement,
                zoomType: 'x',
                spacingBottom: 0,
                marginTop:20,
                height:200 ,
                marginRight : 10,
            };
            // this._chart = this.highcharts;
            this._chart = new HighCharts.Chart(opts);
            // this.QueryOfPm10();
            this._chart.redraw;
        }
    }

    QueryOfGDChart() {
        let opts: any = {

            lang: {
                printChart:"打印图表",
                downloadJPEG: "下载JPEG 图片" ,
                downloadPDF: "下载PDF文档"  ,
                downloadPNG: "下载PNG 图片"  ,
                downloadSVG: "下载SVG 矢量图" ,
                exportButtonTitle: "导出图片" ,
                resetZoom:"重置图片"
            },
            title: {
                text: '固定水位',
                align: 'center',
                verticalAlign: 'bottom',
                // x: -20
            },
            credits : {
                enabled : false
            },
            xAxis: {
                type: 'datetime',
                tickInterval:this.Xcategories.length / 2 ,
                categories:this.Xcategories
            },

            yAxis : {
                lineWidth: 1,
                title : {
                    text : '固定设备状态'
                },
                gridLineWidth:0,
                labels: {
                    formatter:function(){
                        if(this.value ==0) {
                            return"正常";
                        }else if(this.value ==1) {
                            return"报警";
                        }
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    let yStatus = "";
                    if(this.y==0){
                        yStatus="正常";
                    }else if(this.y ==1) {
                        yStatus="报警";
                    }
                    return '<b>' + this.series.name + '</b><br/>时间：'+this.x +'<br/>固定设备状态：'+ yStatus;
                }
            },
            series:
                [{
                    step: true,
                    name: '数据采集点的固定设备状态',
                    data: this.categoriesOfGD
                }]
        };
        if (this.chartEl && this.chartEl.nativeElement) {
            opts.chart = {
                renderTo: this.chartEl.nativeElement,
                zoomType: 'x',
                marginRight: 10,
                spacingBottom: 0 ,
                marginTop:20,
                position: {
                    x: 0,
                    y: -30
                }};
            this._chart = new HighCharts.Chart(opts);
        }
    }

    QueryOfLXChart() {
        let opts: any = {

            lang: {
                printChart:"打印图表",
                downloadJPEG: "下载JPEG 图片" ,
                downloadPDF: "下载PDF文档"  ,
                downloadPNG: "下载PNG 图片"  ,
                downloadSVG: "下载SVG 矢量图" ,
                exportButtonTitle: "导出图片" ,
                resetZoom:"重置图片"
            },
            title: {
                text: '连续水位实时数据',
                align: 'center',
                verticalAlign: 'bottom',
                // x: -20
            },
            credits : {
                enabled : false
            },
            xAxis: {
                type: 'datetime',
                tickInterval:this.Xcategories.length / 2 ,
                categories:this.Xcategories
            },
            yAxis : {
                floor: 30,
                ceiling: 200,
                title : {
                    text : '连续水位值(m)'
                },
                plotLines : [
                    {
                        value : 0,
                        width : 1,
                        color : '#808080'
                    },
                ]
            },
            // tooltip : {
            //     formatter : function()
            //     {
            //         return '<b>' +  this.highcharts.numberFormat(this.y, 2) + '</b><br>'
            //             + this.x + '<br>';
            //     }
            // },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        // stops: [
                        //     [0, this.highcharts.getOptions().colors[0]],
                        //     [1, highchart.Color(highchart.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        // ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series:
                [{
                    type: 'area',
                    name: '连续水位',
                    data: this.categoriesOfLX
                }]
        };
        if (this.chartEl && this.chartEl.nativeElement) {
            opts.chart = {
                type: 'spline',
                renderTo: this.chartEl.nativeElement,
                zoomType: 'x',
                marginRight: 10,
                spacingBottom: 0 ,
                marginTop:20,
                position: {
                    x: 0,
                    y: -30
                }};
            this._chart = new HighCharts.Chart(opts);
        }
    }

    public ngOnDestroy() {

    }

    searchFail() {
        let alert = this.alertCtrl.create({
            title: '查询失败',
            subTitle: '该时段无数据！',
            buttons: ['返回'],
        });

        alert.present().then();
    }

}


