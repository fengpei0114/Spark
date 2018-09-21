import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, App } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpService } from '../../providers/http-service/http-service';
import { MapPage } from '../home/map/map';
import { DevicePage } from '../home/device/device';
import { UserInfoPage } from '../home/user-info/user-info';
import { StatisticOfHomePage } from '../home/statistic-of-home/statistic-of-home';
import { TakePhotoPage } from '../upload/take-photo/take-photo';
import { TaskPage } from '../task/task';
import { AccountService } from '../../providers/account-service/account-service';


import 'rxjs/add/operator/map';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-attention',
    templateUrl: 'attention.html',
})
export class AttentionPage implements OnInit{


    @Output() organizationOut = new EventEmitter();
    @Output() projectOut = new EventEmitter();
    organization:string;
    project:string;
    pointName : string = "";
    projectName : string = "";
    organData:Array<Object> = [];
    projectData:Array<Object>;
    collectionData:Array<Object>;
    NoiseDeviceData:Array<Object> = [];
    WellDeviceData:Array<Object> = [];
    LXWaterLevelData:Array<Object> = [];
    GDWaterLevelData:Array<Object> = [];
    showCollectionPoint:boolean = false;
    icon:string;
    accountId: number = -1;
    isAttention:boolean = false;
    //noinspection TypeScriptUnresolvedVariable
    showNoise:boolean = false;
    showWaterlevel:boolean = false;
    showAll:boolean = false;


    collectionPointShow: string = "noise";
    constructor(public navParams: NavParams,
                public app: App,
                public toastCtrl: ToastController,
                public menuCtrl: MenuController,
                public nav: NavController,
                public http: Http,
                public accountService: AccountService,
                public httpService: HttpService,
                // private elementREf:ElementRef,
                // private appConfig: AppConfig,
    ){ 
        this.showNoise = this.accountService.getSysType() == 0? true:false;
        this.showWaterlevel = this.accountService.getSysType() == 1? true:false;
        this.showAll = this.accountService.getSysType() == 3? true:false;

        if (this.showWaterlevel) {
            this.collectionPointShow = "LXWaterLevel";
        }else  {
            this.collectionPointShow = "noise";
        }
        this.icon = "ios-heart-outline";
        this.getAttentionList();

    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.clearDeviceData();
            this.getAttentionList().then();
             console.log('Async operation has ended');
             refresher.complete();
            }, 2000);
    }

    ngAfterViewInit() {

    }

    openMenu(): void{
        this.menuCtrl.open();
    }

    changeUserInfo(){
        //使用getRootNav方法可以去掉子页面的tabs

        this.app.getRootNav().push(UserInfoPage);
    }


    ngOnInit() {

    }

    dedupe(arr) {
        var tmpArr = [], hash = {};//hash为hash表
        for(var i=0;i<arr.length;i++){
            if(!hash[arr[i].id]){//如果hash表中没有当前项
                hash[arr[i].id] = true;//存入hash表
                tmpArr.push(arr[i]);//存入临时数组
            }
        }
        return tmpArr;
    }

    getAttentionList() {

        let url = this.httpService.getUrl()+"/NoiseDust/getAccountAttentionPoints.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "accountId="+(this.accountService.getAccount() as any).accountId;
        let options = new RequestOptions({
            headers: headers
        });

        return new Promise((resolve, reject) =>{
            this.http.post(url,body,options).map(res =>res.json()).subscribe(data =>{

                this.showCollectionPoint = true;
                console.log(data);
                this.collectionData = this.dedupe(data);
                console.log("=========dedupe");
                console.log(this.dedupe(data));
                console.log("==============");
                  this.http.post(url,body,options).map(res => res.json()).subscribe(data =>{
            // console.log(data);
            this.projectData = data;
        });



                for (let i =0; i<this.collectionData.length;i++){
                    // console.log(this.collectionData[i].deviceId);
                    this.getDeviceTypeById((this.collectionData[i] as any).deviceId,i);

                }
            },err =>{
                    //设置输入错误提示
                    let toast = this.toastCtrl.create({
                        message: '网络连接错误！',
                        duration: 2000,
                        position: 'middle'
                    });

                    toast.present(toast);
                    reject(err);
                });
            });
            
    }

    clearDeviceData() {
        // console.log(result);
        this.NoiseDeviceData = [];
        this.LXWaterLevelData = [];
        this.GDWaterLevelData = [];
        this.WellDeviceData = [];
    }

    getDeviceTypeById(Id,i){
        let url = this.httpService.getUrl()+"/NoiseDust/getDeviceByIdForApp.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "deviceId="+Id;
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,body,options).map(res =>res.json()).subscribe(result =>{
            console.log(result);
            // console.log(this.collectionData[i]);
            if(result.model=='ZN-WCZ-01') {
                this.NoiseDeviceData.push(this.collectionData[i]);
            }else if(result.model=='ZF-LX-01'){
                this.LXWaterLevelData.push(this.collectionData[i]);
            }else if(result.model=='ZF-GD-01'){
                this.GDWaterLevelData.push(this.collectionData[i]);
            }else if(result.model=='ZF-JG-01'){
                this.WellDeviceData.push(this.collectionData[i]);
            }
            else if(result.dev_model==''){
            }
        });
    }


    gotoDeviceInfo(id){
        this.app.getRootNav().push(DevicePage,id);
    }


    gotoMap(latitude :number,longitude :number,projectName :string,pointName :string){
        this.app.getRootNav().push(MapPage,[latitude,longitude,projectName,pointName]);
    }



    gotoStatistic(point){
        this.app.getRootNav().push(StatisticOfHomePage,[point]);
    }

    gotoUpload(){
        this.app.getRootNav().push(TakePhotoPage);
    }

    // gotoTask(){
    //
    //     this.app.getRootNav().push(TaskPage);
    //
    // }

    gotoTask(item){
        // let orgName = "";
        // for (let i =0;i<this.organData.length;i++){
        //     if ((this.organData[i] as any).id == this.organization){
        //         orgName = (this.organData[i] as any).name;
        //     }
        // }
        //
        // let prjName = "";
        // for (let i =0;i<this.projectData.length;i++){
        //     if ((this.projectData[i] as any).id == this.project){
        //         prjName = (this.projectData[i] as any).name;
        //     }
        // }
        // console.log(orgName);

        this.app.getRootNav().push(TaskPage,{
            isHomeToTask:true,
            organizationId:item.organizationId,
            organizationName:item.organizationName,
            prjId:item.projectId,
            prjName:item.projectName,
        });

    }

    delAttention(item) {
        this.accountId = (this.accountService.getAccount() as any).accountId;
        let url = this.httpService.getUrl() + "/NoiseDust/delAccountAttentionPoint.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "accountId=" + this.accountId + "&pointId=" + (item as any).id;
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url, body, options).subscribe(result => {
            // this.attentionPoints = result;
            // console.log(this.attentionPoints);
            console.log("取消关注成功！！！！");
        }, err => {
        });
    }

}

