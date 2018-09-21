import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController} from 'ionic-angular';
import { UserInfo } from '../../../model/UserInfo';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import { AccountService } from '../../../providers/account-service/account-service';
import { UserInfoEditPage } from '../user-info-edit/user-info-edit';

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
    accountOrgName:string = "";
    realName = "";
    phone1 = "";
    phone2 = "";
    email = "";
    userPosition = "";
    account = "";
    accountId = 0 ;

    user: any;

    constructor(public http:Http,public navCtrl: NavController,
                public navParams: NavParams,
                public accountService: AccountService,
                private httpService: HttpService,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
    ) {
        this.accountId = (this.accountService.getAccount() as any).accountId;

        console.log("accounId:"+ this.accountId);
        this.getUserInfoByAccountId(this.accountId).then(data => {
            this.realName = data['realName'];
            this.accountOrgName = data['accountOrgName'];
            this.phone1 = data['phone1'];
            this.email = data['email'];
            this.phone2 = data['phone2'];

            this.userPosition = data['userPosition'];
            this.account = data['account'];

            this.user = data;
            console.log(this.user);

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
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body= "accountID="+accountID;
        let url = this.httpService.getUrl()+"/NoiseDust/getAccount.do";
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
