import { Component } from '@angular/core';
import { NavParams ,ToastController, ViewController, NavController, AlertController} from 'ionic-angular';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../providers/http-service/http-service';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoginPage } from '../../login/login';
import { Storage } from '@ionic/storage';
// import { NativeService } from  '../../../providers/native-service/native-service'

/**
 * Generated class for the UserInfoEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-info-edit',
  templateUrl: 'user-info-edit.html',
})
export class UserInfoEditPage {

    password : string = "";
    passwordConfirm : string = "";
    userInfoForm : any;
    phone1: string = "";
    user : any;
    checkPassword: boolean = true;

    constructor(public  viewCtrl : ViewController,
                private formBuilder : FormBuilder,
                public  navParams : NavParams,
                public  httpService : HttpService,
                public  http : Http,
                private storage : Storage,
                private nav : NavController,
                public toastCtrl : ToastController,
                public alertCtrl : AlertController
    ) {
        console.log(this.navParams.data);
        this.user = this.navParams.data;
        this.userInfoForm = formBuilder.group({
            password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(4)])),
            passwordConfirm: new FormControl('',Validators.compose([Validators.required])),
            // phone1: new FormControl('',Validators.compose([Validators.maxLength(11),Validators.minLength(7)])),
        });
        this.passwordConfirm = this.userInfoForm.controls['passwordConfirm'];
        this.password = this.userInfoForm.controls['password'];
        // this.phone1 = this.userInfoForm.controls['phone1'];
    }


    signup() {
        this.viewCtrl.dismiss();
    }

    onSubmit(value) {
        if(value.password!==value.passwordConfirm || value.password === ""){
            this.checkPassword = false;
        } else {
            this.checkPassword = true;
            this.updateInfo(value.password);
            // this.updatePassword(this.checkPassword);
        }
        console.log(this.checkPassword);
    }

    updateInfo(password) {
        this.user.password = password;
        var url = this.httpService.getUrl()+"/NoiseDust/saveAccount.do";
        // var url = this.appConfig.getUrl()+'/NoiseDust/getOrganizations.do';
        let body = "id="+this.user.accountID+"&account="+this.user.account+
            "&password="+this.user.password+
            "&accountType="+this.user.accountType+
            "&isForcedChange="+this.user.isForcedChange+
            "&realname="+this.user.realName+
            "&mobilePhone1="+this.user.phone1+
            "&mobilePhone2="+this.user.phone2+
            "&email="+this.user.email+
            "&userPosition="+this.user.userPosition+
            "&isAllowDelete="+this.user.isAllowDelete+
            "&isDeleted="+this.user.isDeleted+
            "&isAccountDisabled="+this.user.isAccountDisabled+
            "&note="+this.user.note+
            "&organizationId="+this.user.accountOrgID+
            "&roleId="+this.user.roleId+
            "&accountExpireDate="+this.user.accountExpireDate;
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,body,options).subscribe(data => {
            console.log("Success");
            let alert = this.alertCtrl.create({
                title: '修改成功',
                subTitle: '返回重新登录！',
                buttons: [{
                    text: '退出',
                    handler: () => {
                        this.logout();
                    }
                },],

            });
            alert.present().then();
        },err => {
            //设置输入错误提示
            let toast = this.toastCtrl.create({
                message: '修改密码失败！',
                duration: 2000,
                position: 'middle'
            });

            toast.present(toast);
        } );

    }

    logout() {
        // this.navCtrl.push(LoginPage);
        this.storage.remove('username');
        this.storage.remove('password');
        this.nav.setRoot(LoginPage);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
