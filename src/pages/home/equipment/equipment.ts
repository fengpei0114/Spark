import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-equipment',
  templateUrl: 'equipment.html',
})
export class EquipmentPage {

    dev_id: number;
    dev_org = "";
    dev_mod = "";
    dev_simNo = "";
    dev_status = "";
    dev_latestHeartbeat = "";
    dev_note = "";
    equipmentName:string;
    ischangeH:boolean = false;
    choose:boolean = false;
    serial:number =0;

    ischangeE:boolean = false;
    Ename:string;
    name:string;
    EquipmentMsg:any;
    eq_name:string;
    eq_id:string;
    eq_status:string;
    statusColor:string;
    eq_part:string;
    eq_runTime:string;
    eq_note:string;
    Msg = [{
        "id" : "1",
        "name" : "112233",
        "msg" : [{
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
        "msg" : [{
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
        "msg" : [{
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


    equipMsg=[{
        "id":"VOT-0001",
        "name":"1区探测器",
        "status":"running",
        "part1":"探测头1",
        "part2":"探测头2",
        "runTime":"12h 50m",
        "note":"设备运行正常",
    },{
        "id":"VOT-0002",
        "name":"2区探测器",
        "status":"breakdown",
        "part1":"探测头1",
        "part2":"探测头2",
        "runTime":"1h 20m",
        "note":"设备故障",
    },{
        "id":"VOT-0003",
        "name":"3区探测器",
        "status":"poweroff",
        "part1":"探测头1",
        "part2":"探测头2",
        "runTime":"0m",
        "note":"设备关闭",
    }];

    constructor(public http:Http,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,
                private toastCtrl: ToastController,

    ) {
        // this.equipmentName = this.Msg[0].msg[0].name;
        // this.Ename = this.Msg[0].name;
        // this.EquipmentMsg = this.Msg[0].msg;
        // //this.equipmentName = JSON.stringify(this.Msg);

        this.changeEquipMsg(this.equipMsg[0]);
    }

    setup(){
        
    }
    private popToastView(message: string, duration: number){
        this.toastCtrl.create({
            message : message,
            duration : duration,
            position : 'bottom',
            dismissOnPageChange : true,
        }).present();
    }
    changeItem(){
        // this.ischange = !this.ischange;
        //let bg = document.getElementById("padding");
        // bg.style.background = "url('../../assets/login.png')";
    }
    chooseEqu(item){
        this.changeEquipMsg(item);
        this.ischangeH = false;
        // console.log(this.Msg[id].name);
        // this.Ename = this.Msg[id].name;
        // this.EquipmentMsg = this.Msg[id].msg;
        // this.choose = true;
        // this.ischangeH = false;
        // this.ischangeE = true;
        // this.equipmentName = this.Msg[id].name;
        // this.ischange = false;
    }

    checkSerial(item){
        this.serial=this.equipMsg.indexOf(item);
        console.log(this.serial);

    }

    chooseMsg(item){
        this.ischangeE = false;
        this.EquipmentMsg.forEach((x)=>{
            if(x.id==item){
                console.log(x.id);
                // this.choosebtn.style.color = "#000000";
                this.equipmentName = x.name;
            }
        });
    }
    changestatus(){
        this.ischangeE = false;
        this.ischangeH = false;
    }
    ischoose(item){
        if(item == 0){
            this.ischangeH = !this.ischangeH;
            this.ischangeE = false;
        }
        if(item == 1){
            this.ischangeE = !this.ischangeE;
            this.ischangeH = false;
        }
    }
    changeEquipMsg(item){
        this.checkSerial(item);
        this.eq_id=item.id;
        this.eq_name=item.name;
        this.eq_part=item.part1+"  "+item.part2;
        this.eq_runTime=item.runTime;
        this.eq_note=item.note;
        switch(item.status){
            case "running":
                this.statusColor="secondary";
                this.eq_status="正常运行";
                break;
            case "breakdown":
                this.statusColor="danger";
                this.eq_status="设备故障";
                break;
            case "poweroff":
                this.statusColor="grey";
                this.eq_status="设备关闭";
                break;
            default:
                this.statusColor="grey";
                this.eq_status="设备异常";

        }
    }

    beforeClick(){
        if(this.serial==0)
        {
            this.serial=this.equipMsg.length-1;
        }
        else
        {
            this.serial=this.serial-1;
        }
        this.changeEquipMsg(this.equipMsg[this.serial]);
    }

    afterClick(){
        this.serial=(this.serial+1)% this.equipMsg.length;
        this.changeEquipMsg(this.equipMsg[this.serial]);
    }

}
