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
  selector: 'page-alarmdetail',
  templateUrl: 'alarm_detail.html',
})
export class AlarmdetailPage {
    alarmId:string;
    level:string;
    fireNum:string;
    subNode:string;
    alarmDetector:string;
    alarmdatetime:string;
    enddatetime:string;
    isConfirmed:string;
    note:string;

    multype:string;
    mulComponent:string;
    muldata:string;
    measure:string;

    
    affectedComponent:string;
    

    equipmentName:string;
    ischangeH:boolean = false;
    choose:boolean = false;
    ischangeE:boolean = false;
    Ename:string;
    name:string;
    EquipmentMsg:any;
    alarmOrMul:boolean;
    alarmOrmulMsg:any;
    TestArray:any;
    Msg_alarm = {
        "alarmId":"string1",
        "level":"一级",
        "fireNum":"string2",
        "subNode":"string6",
        "alarmDetector":"string3",
        "alarmdatetime":"string4",
        "enddatetime":"string8",
        "isConfirmed":"string7",
        "note":"string9",
        }
    Msg_nul={
        "multype":"XXX",
        "mulComponent":"string2",
        "subNode":"string6",
        "muldata":"string3",
        "measure":"string4",
        "isConfirmed":"string7",
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
        this.TestArray=[];
        this.dataInit();
        console.log(this.TestArray);
        this.alarmOrmulMsg = this.navParams.data;
        this.alarmOrMul = this.navParams.data.alarmOrmul;
        this.equipmentName = this.navParams.data.equipmentName;
        
        // console.log("alarmormul:"+this.alarmOrMul);
        if(this.alarmOrMul){
            this.alarmId = this.Msg_alarm.alarmId;
            this.level = this.Msg_alarm.level;
            this.fireNum = this.Msg_alarm.fireNum;
            this.subNode = this.Msg_alarm.subNode;
            this.alarmDetector = this.Msg_alarm.alarmDetector;
            this.alarmdatetime = this.Msg_alarm.alarmdatetime;
            this.enddatetime = this.Msg_alarm.enddatetime;
            this.isConfirmed = this.Msg_alarm.isConfirmed;
            this.note = this.Msg_alarm.note;
        }
        else{
            this.multype = this.Msg_nul.multype;
            this.mulComponent = this.Msg_nul.mulComponent;
            this.subNode = this.Msg_nul.subNode;
            this.muldata = this.Msg_nul.muldata;
            this.measure = this.Msg_nul.measure;
            this.isConfirmed = this.Msg_nul.isConfirmed;
            this.note = this.Msg_nul.isConfirmed;
        }
    }
    dataInit(){
        let url = "http://192.168.0.167:7002/Alarm/find/detail/byAlarmID";
        let  body = {
            "AlarmId":"1",
        };
        // let body="AlarmId=1";
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,JSON.stringify(body),options).map(res=>{
            return res.json();
        }).subscribe(data=>{
            console.log("111:"+data.sparkNum+","+data.subNode_InstallPoint);
            this.TestArray.push(data);
            //alarmTime: "Thu May 30 22:20:09 CST 2019"
            console.log(new Date(Date.parse(data.alarmTime)).toLocaleString());
            // console.log( $filter('date')(data.alarmTime, "yyyy-MM-dd hh:mm:ss"))
        },error=>{
            console.log(error);
        })
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
        console.log(this.Msg_alarm[id].name);
        this.Ename = this.Msg_alarm[id].name;
        this.EquipmentMsg = this.Msg_alarm[id].msg;
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
