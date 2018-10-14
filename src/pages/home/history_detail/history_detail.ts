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
  selector: 'page-historydetail',
  templateUrl: 'history_detail.html',
})
export class HistorydetailPage {

    alarmId:string;
    alarmType:string;
    datetimeStart:string;
    datetimeEnd:string;
    level:string;
    measure:string;
    isConfirmed:string;
    affectedComponent:string;
    note:string;

    equipmentName:string;
    ischangeH:boolean = false;
    choose:boolean = false;
    ischangeE:boolean = false;
    Ename:string;
    name:string;
    EquipmentMsg:any;
    Msg = {
        "alarmId":"string1",
        "alarmType":"string2",
        "datetimeStart":"string3",
        "datetimeEnd":"string4",
        "level":"一级",
        "measure":"string6",
        "isConfirmed":"string7",
        "affectedComponent":"string8",
        "note":"string9",
        }


    constructor(public http:Http,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,
                private toastCtrl: ToastController,

    ) {
        // if(this.Msg.level == "一级"){
        //     let levelbtn = document.getElementById("levelnote");
        //     levelbtn.style.color="#ce0000";
        // }else if(this.Msg.level == "二级"){
        //     document.getElementById("levelnote").style.color = "#be5e5e"
        // }else if(this.Msg.level == "三级"){
        //     document.getElementById("levelnote").style.color = "#000000"
        // }
        this.alarmId = this.Msg.alarmId;
        this.alarmType = this.Msg.alarmType;
        this.datetimeStart = this.Msg.datetimeStart;
        this.datetimeEnd = this.Msg.datetimeEnd;
        this.level = this.Msg.level;
        this.measure = this.Msg.measure;
        this.isConfirmed = this.Msg.isConfirmed;
        this.affectedComponent = this.Msg.affectedComponent;
        this.note = this.Msg.note;
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
    chooseEqu(item){
        let id = item-1;
        console.log(this.Msg[id].name);
        this.Ename = this.Msg[id].name;
        this.EquipmentMsg = this.Msg[id].msg;
        this.choose = true;
        this.ischangeH = false;
        this.ischangeE = true;
        // this.equipmentName = this.Msg[id].name;
        // this.ischange = false;
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

}
