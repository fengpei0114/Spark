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
  selector: 'page-maldetail',
  templateUrl: 'mal_detail.html',
})
export class MaldetailPage {
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
    
    deviceName:any;
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
    prinicipalName:any;
    prinicipalphone:any;
    plantform:any;
    comfirmUser:any;
    factoryName:any;
    malId:number;
    // Msg_alarm = {
    //     "alarmId":"string1",
    //     "level":"一级",
    //     "fireNum":"string2",
    //     "subNode":"string6",
    //     "alarmDetector":"string3",
    //     "alarmdatetime":"string4",
    //     "enddatetime":"string8",
    //     "isConfirmed":"string7",
    //     "note":"string9",
    //     }
    // Msg_nul={
    //     "multype":"XXX",
    //     "mulComponent":"string2",
    //     "subNode":"string6",
    //     "muldata":"string3",
    //     "measure":"string4",
    //     "isConfirmed":"string7",
    //     "note":"string9",
    // }

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
        // console.log(this.TestArray);
        this.deviceName = this.navParams.data.deviceName;
        this.malId = this.navParams.data.malID;
        this.measure = this.navParams.data.measure;
        // this.alarmOrmulMsg = this.navParams.data;
        // this.alarmOrMul = this.navParams.data.alarmOrmul;
        // this.equipmentName = this.navParams.data.equipmentName;
        // this.alarmOrMul = this.navParams.data.alarmOrmul;

        this.MuldataInit();

    }
    /**
     * 获取故障详细信息
     */
    MuldataInit(){

        console.log("maldata Init");
        let url = this.httpService.getDeviceUrl() + "/Malfunction/find/byMalID";
        let body = {
            "malfunctionID":this.malId,
        };
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        })
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,JSON.stringify(body),options).map(res => res.json()).subscribe(data =>{
            console.log(data);
            this.multype = data[0].malType;
            this.mulComponent = data[0].malComponent;
            this.muldata = new Date(Date.parse(data[0].malTime)).toLocaleString();
            this.isConfirmed = data[0].confirmed;
            // this.prinicipalName = data[0].prinicipalName;
            // this.prinicipalphone = data[0].prinicipalphone;
            this.factoryName = data[0].factoryName;
            this.note = data[0].note;
            if(data[0].confirmed){
                this.plantform = data[0].plantform;
                this.comfirmUser = data[0].user;
            }
            
            // console.log(data.malType);
            console.log("maldata");
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
}
