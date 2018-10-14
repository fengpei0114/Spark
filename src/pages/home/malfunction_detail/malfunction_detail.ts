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
  selector: 'page-malfunctiondetail',
  templateUrl: 'malfunction_detail.html',
})
export class MalfunctiondetailPage {

    malfunctionId:string;
    malfunctionType:string;
    datetimeStart:string;
    datetimeEnd:string;
    identifier:string;
    measure:string;
    isConfirmed:string;
    affectedComponents:string;
    note:string;

    equipmentName:string;
    ischangeH:boolean = false;
    choose:boolean = false;
    ischangeE:boolean = false;
    Ename:string;
    name:string;
    EquipmentMsg:any;
    

    constructor(public http:Http,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,
                private toastCtrl: ToastController,

    ) {
       this.malfunctionId = this.navParams.data.malfunctionId;
       this.malfunctionType = this.navParams.data.malfunctionType;
       this.datetimeEnd = this.navParams.data.datetimeEnd;
       this.datetimeStart = this.navParams.data.datetimeStart;
       this.identifier = this.navParams.data.identifier;
       this.measure = this.navParams.data.measure;
       this.isConfirmed = this.navParams.data.isConfirmed;
       this.affectedComponents = this.navParams.data.affectedComponents;
       this.note = this.navParams.data.note;
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
