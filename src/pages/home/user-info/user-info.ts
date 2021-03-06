import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController} from 'ionic-angular';
import { UserInfo } from '../../../model/UserInfo';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import { AccountService } from '../../../providers/account-service/account-service';
import { UserInfoEditPage } from '../user-info-edit/user-info-edit';
import { Storage } from '@ionic/storage';
import { NativeService} from "../../../providers/native-service/native-service";
import 'rxjs/add/operator/map';
/**
 * Generated class for the UserInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

    userInfo: UserInfo;
    username = "";
    userId = "";
    plants :Array<string>=[];
    plantname ="";
    phone = "";
    email = "";
    remark = "";
    account = "";
    accountId = 0 ;

    user: any;

    constructor(public http:Http,public navCtrl: NavController,
                public navParams: NavParams,
                public accountService: AccountService,
                private httpService: HttpService,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private storage:Storage,
                private nativeService:NativeService,
    ) {
        // this.accountId = (this.accountService.getAccount() as any).userId;
        console.log("userinfoPage");
        this.storage.get('userId').then((userId)=>{
            this.userId=userId;
            this.dataInit();
          });
        
        // console.log("accounId:"+ this.accountId);
        // this.getUserInfoByAccountId(this.accountId).then(data => {
        //     this.realName = data['realName'];
        //     this.accountOrgName = data['accountOrgName'];
        //     this.phone1 = data['phone1'];
        //     this.email = data['email'];
        //     this.phone2 = data['phone2'];

        //     this.userPosition = data['userPosition'];
        //     this.account = data['account'];

        //     this.user = data;
        //     console.log(this.user);

        // });
    }


    dataInit(){
      this.nativeService.showLoading();
        let url = this.httpService.getAccountUrl() + "/user/getuser";
        let body= {
            "userId":this.userId,
        }
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,JSON.stringify(body),options).map(res => res.json()).subscribe(data =>{
            console.log(data);
            this.username = data.username;
            this.email = data.email;
            this.phone = data.phone;
            this.remark = data.remark;
            if(data.plantname) {
              this.plants = data.plantname;
              if (this.plants.length > 0) {
                this.plants.forEach(x => {
                  this.plantname += x;
                  this.plantname += " ";
                })
              }
            }
          this.nativeService.hideLoading();
        },
        error =>{

          this.storage.get("username").then(usernane=>{
            this.username=usernane;
          });
          this.email="";
          this.phone="";
          this.plantname="";
          this.nativeService.showToast("信息获取失败！")
        });

    }

    openSignupModal() {
        this.openModal(UserInfoEditPage);
    }

    openModal(pageName) {
        this.modalCtrl.create(pageName, this.user , { cssClass: 'inset-modal' })
            .present();
    }
    openUserInfoEditPage() {
        this.openSignupModal();
    }

    getUserInfoByAccountId(accountID) {
        let url = "";
        let body= {
            "userId":this.accountId,
        }
        let headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        
        return new Promise((resolve,reject) => {
            this.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(data => {

                    this.userInfo = data;
                    resolve(data);
                },err => {
                    reject(err);
                });
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserInfoPage');
    }



}
