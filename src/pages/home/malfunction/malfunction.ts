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
    malfunctionArray = [
        {
            "malfunctionId":"string11",
            "malfunctionType":"string12",
            "datetimeStart":"string13",
            "datetimeEnd":"string14",
            "identifier":"string15",
            "measure":"string16",
            "isConfirmed":"string17",
            "affectedComponents":"string18",
            "note":"string19",
            "name" : "331122",
            "Ename" : "31111111111",
        },
        {
            "malfunctionId":"string21",
            "malfunctionType":"string22",
            "datetimeStart":"string23",
            "datetimeEnd":"string24",
            "identifier":"string25",
            "measure":"string26",
            "isConfirmed":"string27",
            "affectedComponents":"string28",
            "note":"string29",
            "name" : "331122",
            "Ename" : "41111111111",
        },
        {
            "malfunctionId":"string31",
            "malfunctionType":"string32",
            "datetimeStart":"string33",
            "datetimeEnd":"string34",
            "identifier":"string35",
            "measure":"string36",
            "isConfirmed":"string37",
            "affectedComponents":"string38",
            "note":"string39",
            "name" : "331122",
            "Ename" : "21111111111",
        },
        {
            "malfunctionId":"string41",
            "malfunctionType":"string42",
            "datetimeStart":"string43",
            "datetimeEnd":"string44",
            "identifier":"string45",
            "measure":"string46",
            "isConfirmed":"string47",
            "affectedComponents":"string48",
            "note":"string49",
            "name" : "331122",
            "Ename" : "11111111111",
        },
        {
            "malfunctionId":"string51",
            "malfunctionType":"string52",
            "datetimeStart":"string53",
            "datetimeEnd":"string54",
            "identifier":"string55",
            "measure":"string56",
            "isConfirmed":"string57",
            "affectedComponents":"string58",
            "note":"string59",
            "name" : "331122",
            "Ename" : "71111111111",
        },
        {
            "malfunctionId":"string61",
            "malfunctionType":"string62",
            "datetimeStart":"string63",
            "datetimeEnd":"string64",
            "identifier":"string65",
            "measure":"string66",
            "isConfirmed":"string67",
            "affectedComponents":"string68",
            "note":"string69",
            "name" : "331122",
            "Ename" : "61111111111",
        },
        {
            "malfunctionId":"string71",
            "malfunctionType":"string72",
            "datetimeStart":"string73",
            "datetimeEnd":"string74",
            "identifier":"string75",
            "measure":"string76",
            "isConfirmed":"string77",
            "affectedComponents":"string78",
            "note":"string79",
            "name" : "331122",
            "Ename" : "81111111111",
        },
        {
            "malfunctionId":"string81",
            "malfunctionType":"string82",
            "datetimeStart":"string83",
            "datetimeEnd":"string84",
            "identifier":"string85",
            "measure":"string86",
            "isConfirmed":"string87",
            "affectedComponents":"string88",
            "note":"string89",
            "name" : "331122",
            "Ename" : "91111111111",
        },
        {
            "malfunctionId":"string91",
            "malfunctionType":"string92",
            "datetimeStart":"string93",
            "datetimeEnd":"string94",
            "identifier":"string95",
            "measure":"string96",
            "isConfirmed":"string97",
            "affectedComponents":"string98",
            "note":"string99",
            "name" : "331122",
            "Ename" : "01111111111",
        },
        {
            "malfunctionId":"string211",
            "malfunctionType":"string221",
            "datetimeStart":"string231",
            "datetimeEnd":"string241",
            "identifier":"string251",
            "measure":"string261",
            "isConfirmed":"string271",
            "affectedComponents":"string281",
            "note":"string291",
            "name" : "331122",
            "Ename" : "51111111111",
        },
    ]

    displayArray:any[];

    constructor(public http:Http,
                public app:App,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        
        //this.equipmentName = JSON.stringify(this.Msg);
        
        
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


    plantChoose(item){
        this.factoryArray.forEach((x)=>{
            this.choosebtn = document.getElementsByName(x.id)[0];
            this.choosebtn.style.color = "#000000";
            if(x.id==item){
                console.log(x.id);
                this.choosebtn = document.getElementsByName(x.id)[0];
                console.log("choosebtn"+this.choosebtn);
                this.plant_name = x.name;
                this.selectFactoryID = item;
                this.choosebtn.style.color = this.colorBule;
                this.equipmentArray = x.equipments;
                this.isplant = !this.isplant;
                this.isequipment = true;
            }
        });
    }

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

}
