import { Component } from '@angular/core';
import { NavController, NavParams, App,AlertController } from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import {Color} from "highcharts";
import { NativeService } from '../../../providers/native-service/native-service'
import { MalfunctiondetailPage } from '../malfunction_detail/malfunction_detail';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-malfunction',
  templateUrl: 'malfunction.html',
})
export class MalfunctionPage {


    deviceId:any;
    isequipment:boolean = false;
    isplant:boolean = false;

    plant_name = "选择厂房";
    equipment_name = "选择设备";

    choosebtn:any;

    selectFactoryID   :number;
    selectEquipmentID :number;

    isSpray:boolean=true;
    isFault:boolean=true;
    isWarning:boolean=true;

    colorBule:string='#5eb1f5';
    colorGrey:string='#bbbbbb'

    sprayColor:string=this.colorBule;
    faultColor:string=this.colorBule;
    warningColor:string=this.colorBule;

    equipmentArray:any;
    name:string;
    MulNum:any;
    unconfirmMulNum:any;
    lastConfirmTime:any;
    mulMsg:any;
    // dataArray=[
    //     {
    //         "malfunctionNo":"01",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"2018-08-01 15:55:52",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"未确认",
    //         "dealPlatform":"equipment",
    //         "dealStaff":"tony",
    //         "note":""
    //     },    {
    //         "malfunctionNo":"02",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"2018-08-01 15:55:52",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"未确认",
    //         "dealPlatform":"equipment",
    //         "dealStaff":"tony",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"03",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"2018-08-01 15:55:52",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"未确认",
    //         "dealPlatform":"equipment",
    //         "dealStaff":"tony",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"04",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"2018-08-01 15:55:52",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"未确认",
    //         "dealPlatform":"equipment",
    //         "dealStaff":"tony",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"05",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"2018-08-01 15:55:52",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"未确认",
    //         "dealPlatform":"equipment",
    //         "dealStaff":"tony",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"06",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"已确认",
    //         "dealPlatform":"",
    //         "dealStaff":"",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"07",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"已确认",
    //         "dealPlatform":"",
    //         "dealStaff":"",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"08",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"已确认",
    //         "dealPlatform":"",
    //         "dealStaff":"",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"09",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"已确认",
    //         "dealPlatform":"",
    //         "dealStaff":"",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"10",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"已确认",
    //         "dealPlatform":"",
    //         "dealStaff":"",
    //         "note":""
    //     },
    //     {
    //         "malfunctionNo":"11",
    //         "malfunctionType":"1",
    //         "childNode":"XXX",
    //         "startTime":"2018-08-01 15:54:52",
    //         "endTime":"",
    //         "malfunctionEquipment":"xxx",
    //         "recommendedMeasure":"XXX",
    //         "malfunctionState":"已确认",
    //         "dealPlatform":"",
    //         "dealStaff":"",
    //         "note":""
    //     },

    // ]


    pageSize: number = 0;
    pageNum: number = 0;
    pageOther: number = 0;
    malfunctionArray:Array<Object> = [];
    pagesizenow:number;
    roleId:string;
    username:string;
    constructor(public http:Http,
                public app:App,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,
                private alertCtrl:AlertController,
                private nativeService:NativeService,
                private  storage:Storage,

    ) {
        this.storage.get('roleId').then(roleId=>{
            this.roleId=roleId;
        })
        this.storage.get('username').then((username)=>{
            this.username=username;
          })
        this.deviceId = this.navParams.data.deviceId;
        this.unconfirmMulNum = this.navParams.data.unconfirmedMalNum;
        this.dataInit();
        
        
    }

    dataInit(){
        this.nativeService.showLoading("数据加载中...")
        let url = this.httpService.getUrl()+"/Malfunction/find/byDeviceID";
        let body = {
            "DeviceId":this.deviceId,
            "pageSize":10,
            "pageNum":1,
        }
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        })
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,JSON.stringify(body),options).map(res => res.json()).subscribe(data =>{
            data.forEach(x=>{
                var d=(new Date(x.malTime));
                x.malTime=d.toLocaleDateString()+"  "+d.toLocaleTimeString();
              })
              console.log(data);
            this.nativeService.hideLoading();
              this.malfunctionArray = data;
              this.pageNum++;
          },error=> {
  
            this.nativeService.hideLoading();
            this.nativeService.showToast("数据获取失败！");
            // this.malfunctionArray = this.dataArray;
          })
        // this.name = this.navParams.data;
        // this.pageOther = this.malfunctionArray.length % 10;
        // this.pageSize = (this.malfunctionArray.length-this.pageOther) / 10;
        // console.log(this.pageSize);
        // console.log(this.pageOther);
        // for(var i = 0;i<10;i++) {
        //     this.dataArray.push(this.malfunctionArray[i]);
        // }
    }
    setup(){
        
    }
    ischoose(item){
        if(item == 0){
            this.isplant = !this.isplant;
            this.isequipment = false;
            this.equipmentArray = "";
        }
        if(item == 1){
            this.isequipment = !this.isequipment;
            this.isplant = false;
        }
    }

    changestatus(){
        this.isplant = false;
        this.isequipment = false;
    }


    // plantChoose(item){
    //     this.factoryArray.forEach((x)=>{
    //         this.choosebtn = document.getElementsByName(x.id)[0];
    //         this.choosebtn.style.color = "#000000";
    //         if(x.id==item){
    //             console.log(x.id);
    //             this.choosebtn = document.getElementsByName(x.id)[0];
    //             console.log("choosebtn"+this.choosebtn);
    //             this.plant_name = x.name;
    //             this.selectFactoryID = item;
    //             this.choosebtn.style.color = this.colorBule;
    //             this.equipmentArray = x.equipments;
    //             this.isplant = !this.isplant;
    //             this.isequipment = true;
    //         }
    //     });
    // }

    equipmentChoose(item){
        this.selectEquipmentID = item;
        
        this.equipmentArray.forEach((x)=>{
            if(x.id==item){
                this.equipment_name = x.name;
                this.isequipment=false;
            }
        });
        console.log("工厂id:"+this.selectFactoryID+"\n设备id："+this.selectEquipmentID);
    }
    gotomalfunctionDetail(item){
        this.app.getRootNav().push(MalfunctiondetailPage,item);
    }


    // doInfinite(infiniteScroll){
    //     console.log('Begin async operation');

    //     setTimeout(()=>{
    //         this.pageNum++;
    //         console.log(this.pageNum);
    //         if(this.pageNum<this.pageSize){
    //             for(var i = 0;i<10;i++){
    //                 this.malfunctionArray.push(this.dataArray[i+this.pageNum*10]);
    //             }
    //         }else if(this.pageNum==this.pageSize){
    //             for(i = 0;i<this.pageOther;i++){
    //                 this.malfunctionArray.push(this.dataArray[i+this.pageNum*10]);
    //             }
    //         }else{
    //             infiniteScroll.enable(false);
    //         }

    //         console.log('Async operation has ended');
    //         infiniteScroll.complete();
    //     },500);
    // }
    doInfinite1(infiniteScroll){
        console.log('Begin async operation');
        console.log(infiniteScroll._scrollY);
        console.log(infiniteScroll.scrollHeight);
        let url = this.httpService.getUrl()+"";
        let body = {
            "DeviceId":this.deviceId,
            "pageSize":10,
            "pageNum":this.pageNum,
        }
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
                            this.malfunctionArray.push(data.content[i]);
                        }
                        this.pageNum++;
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
                        this.comfirmMalfunction(data,item);
                    }
                }
            ]
        });
        prompt.present();
    }

    comfirmMalfunction(comfirmData,item) {
        console.log(comfirmData.note);
        let url = this.httpService.getUrl()+"/Malfunction/update/confirm/ByMalID";
        let body = {
            "userName":this.username,
            "malfunctionID":item.malId,
            "Plantform":true,
            "note":comfirmData.note,
        }
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        });
        let options = new RequestOptions({
            headers:headers
        })
        this.http.post(url,JSON.stringify(body),options).map(res=>res.json()).subscribe(data=>{
            console.log(data);
            if(data.status=="0"){
                console.log("status==0")
                const prompt = this.alertCtrl.create({
                    title: '确认失败',
                    message: data.Msg,
                    buttons: [
                        {
                            text: '确认',
                            handler: data => {
                            }
                        }
                    ]
                });
                prompt.present();
            }else{
                this.pageNum--;
                this.dataInit();
            }                
        },err =>{
            //设置输入错误提示
            console.log("status==0")
            const prompt = this.alertCtrl.create({
                title: '确认失败',
                message: '网络连接错误',
                buttons: [
                    {
                        text: '确认',
                        handler: data => {
                        }
                    }
                ]
            });
            prompt.present();
        });
    }
}
