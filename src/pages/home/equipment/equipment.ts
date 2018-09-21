import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    ischange:boolean = false;
    Ename:string;
    name:string;
    Msg = [
            {
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
        ];


    constructor(public http:Http,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        this.equipmentName = this.Msg[0].name;
        this.Ename = this.Msg[0].EName;
        //this.equipmentName = JSON.stringify(this.Msg);
        
        
    }
    setup(){
        
    }
    changeItem(){
        this.ischange = !this.ischange;
        //let bg = document.getElementById("padding");
        // bg.style.background = "url('../../assets/login.png')";
    }
    chooseEqu(item){
        let id = item-1;
        console.log(this.Msg[id].EName);
        this.Ename = this.Msg[id].EName;
        this.equipmentName = this.Msg[id].name;
        this.ischange = false;
    }

}
