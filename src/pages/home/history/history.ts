import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import {Color} from "highcharts";

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

   
    isequipment:boolean = false;
    isrecord:boolean = false;


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
    factoryArray = [{
        "id" : "1",
        "name" : "112233",
        "equipments" : [{
                    "id" : "1",
                    "EName":"11111111",
                    "name" : "123123123123",
                },
                {
                    "id" : "2",
                    "EName":"22222222",
                    "name" : "213213213213",
                },
                {
                    "id" : "3",
                    "EName":"33333333",
                    "name" : "312312312312",
                },
                {
                    "id" : "4",
                    "EName":"4444444",
                    "name" : "412341234123",
                }
            ]
        },
        {
        "id" : "2",
        "name" : "223311",
        "equipments" : [{
                    "id" : "1",
                    "EName":"211111111",
                    "name" : "2123123123123",
                },
                {
                    "id" : "2",
                    "EName":"222222222",
                    "name" : "2213213213213",
                },
                {
                    "id" : "3",
                    "EName":"233333333",
                    "name" : "2312312312312",
                },
                {
                    "id" : "4",
                    "EName":"24444444",
                    "name" : "2412341234123",
                }
            ]
        },
        {
        "id" : "3",
        "name" : "331122",
        "equipments" : [{
                    "id" : "1",
                    "EName":"311111111",
                    "name" : "3123123123123",
                },
                {
                    "id" : "2",
                    "EName":"322222222",
                    "name" : "3213213213213",
                },
                {
                    "id" : "3",
                    "EName":"333333333",
                    "name" : "3312312312312",
                },
                {
                    "id" : "4",
                    "EName":"34444444",
                    "name" : "3412341234123",
                }
            ]
        },
    ];
    historyArray = [
        {
            "id" : "1",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "31111111111",
            "type" : "喷淋"
        },
        {
            "id" : "2",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "41111111111",
            "type" : "喷淋"
        },
        {
            "id" : "3",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "21111111111",
            "type" : "喷淋"
        },
        {
            "id" : "4",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "11111111111",
            "type" : "喷淋"
        },
        {
            "id" : "5",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "71111111111",
            "type" : "故障"
        },
        {
            "id" : "6",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "61111111111",
            "type" : "故障"
        },
        {
            "id" : "7",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "81111111111",
            "type" : "喷淋"
        },
        {
            "id" : "8",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "91111111111",
            "type" : "预警"
        },
        {
            "id" : "9",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "01111111111",
            "type" : "喷淋"
        },
        {
            "id" : "10",
            "time" : "2018-9-2",
            "name" : "331122",
            "Ename" : "51111111111",
            "type" : "预警"
        },
    ]

    displayArray:any[];

    constructor(public http:Http,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        this.displayArray=this.historyArray;
        //this.equipmentName = JSON.stringify(this.Msg);
        
        
    }
    setup(){
        
    }
    ischoose(item){
        if(item == 0){
            this.isrecord = false;
            this.isequipment = !this.isequipment;
            this.equipmentArray = "";
        }
        if(item == 1){
            this.isequipment = false;
            this.isrecord = !this.isrecord;
        }
    }

    changestatus(){
        this.isrecord = false;
        this.isequipment = false;
    }


    factoryChoose(item){
        this.factoryArray.forEach((x)=>{
            this.choosebtn = document.getElementsByName(x.id)[0];
            this.choosebtn.style.color = "#000000";
            if(x.id==item){
                console.log(x.id);
                this.choosebtn = document.getElementsByName(x.id)[0];
                console.log("choosebtn"+this.choosebtn);
                this.selectFactoryID = item;
                this.choosebtn.style.color = this.colorBule;
                this.equipmentArray = x.equipments;
            }
        });
    }

    equipmentChoose(item){
        this.selectEquipmentID = item;
        this.isequipment=false;
        console.log("工厂id:"+this.selectFactoryID+"\n设备id："+this.selectEquipmentID);
    }


    btSprayClick()
    {
        if(this.isSpray==false) {
            this.isSpray = true;
            this.sprayColor=this.colorBule;
        }
        else if(this.isSpray==true) {
            this.isSpray = false;
            this.sprayColor=this.colorGrey;
        }
    }

    btFaultClick()
    {
        if(this.isFault==false) {
            this.isFault = true;
            this.faultColor=this.colorBule;
        }
        else if(this.isFault==true) {
            this.isFault = false;
            this.faultColor=this.colorGrey;
        }
    }

    btWarningClick()
    {
        if(this.isWarning==false) {
            this.isWarning = true;
            this.warningColor=this.colorBule;
        }
        else if(this.isWarning==true) {
            this.isWarning = false;
            this.warningColor=this.colorGrey;
        }
    }

    btTypeSlectClick()
    {
        this.isrecord = false;
        console.log("选择的类型：");
        if(this.isSpray){
            console.log("喷淋");
        }
        if(this.isFault){
            console.log("故障");
        }
        if(this.isWarning){
            console.log("预警");
        }
        this.filtrateArray();
    }

    filtrateArray()
    {
        this.displayArray=this.historyArray.filter(record=>
            record.type=="喷淋"&&this.isSpray ||record.type=="预警"&&this.isWarning||record.type=="故障"&&this.isFault
        );
    }

}
