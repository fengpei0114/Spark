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
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

   
    isequipment:boolean = false;
    isrecord:boolean = false;
    equipmentMsg:any;
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
    ]


    constructor(public http:Http,
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
            this.isrecord = false;
            this.isequipment = !this.isequipment;
            this.equipmentMsg = this.Msg[0].msg;
        }
        if(item == 1){
            this.isequipment = false;
            this.isrecord = !this.isrecord;
        }
    }
    equipmentchoose(item){
        this.Msg.forEach((x)=>{
            if(x.id==item){
                console.log(x.id);
                this.equipmentMsg = x.msg;
            }
        });
    }
}
