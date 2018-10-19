import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import {Color} from "highcharts";
import { MalfunctiondetailPage } from '../malfunction_detail/malfunction_detail';

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

    malfunctionArray=[
        {
            "malfunctionNo":"01",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },    {
            "malfunctionNo":"02",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"03",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"04",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"05",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"06",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"07",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"08",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"09",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"10",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },
        {
            "malfunctionNo":"11",
            "malfunctionType":"1",
            "startTime":"2018-08-01 15:54:52",
            "endTime":"2018-08-01 15:55:52",
            "tag":"1",
            "measure":"1",
            "impactDevice":["1","2"],
        },

    ]


    pageSize: number = 0;
    pageNum: number = 0;
    pageOther: number = 0;
    dataArray:Array<Object> = [];

    constructor(public http:Http,
                public app:App,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        this.pageOther = this.malfunctionArray.length % 10;
        this.pageSize = (this.malfunctionArray.length-this.pageOther) / 10;
        console.log(this.pageSize);
        console.log(this.pageOther);
        for(var i = 0;i<10;i++) {
            this.dataArray.push(this.malfunctionArray[i]);
        }
        
        
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


    doInfinite(infiniteScroll){
        console.log('Begin async operation');

        setTimeout(()=>{
            this.pageNum++;
            console.log(this.pageNum);
            if(this.pageNum<this.pageSize){
                for(var i = 0;i<10;i++){
                    this.dataArray.push(this.malfunctionArray[i+this.pageNum*10]);
                }
            }else if(this.pageNum==this.pageSize){
                for(i = 0;i<this.pageOther;i++){
                    this.dataArray.push(this.malfunctionArray[i+this.pageNum*10]);
                }
            }else{
                infiniteScroll.enable(false);
            }

            console.log('Async operation has ended');
            infiniteScroll.complete();
        },500);
    }
}
