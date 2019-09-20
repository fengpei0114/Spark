import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController, ViewController} from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {NativeService} from "../../../providers/native-service/native-service";

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-changepassword',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
    changePasswordForm:any;
    oldpassword:string;
    newpassword1:string;
    newpassword2:string;
    userId:string;
    errorMsg:string;
    password:string = "123123";
    old:string;
    new1:string;
    new2:string;
    is:boolean=true;

    constructor(public http:Http,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,
                private toastCtrl: ToastController,
                private formBuilder: FormBuilder,
                private alertCtrl: AlertController,
                private storage:Storage,
                private nativeSerivce:NativeService,
                private viewCtrl : ViewController,
    ) {
        this.storage.get('userId').then((userId)=>{
            this.userId=userId;
          });
        this.changePasswordForm = formBuilder.group({
            oldpassword: new FormControl('',Validators.compose([Validators.required])),
            newpassword1: new FormControl('',Validators.compose([Validators.required])),
            newpassword2: new FormControl('',Validators.compose([Validators.required])),
        })
        this.oldpassword = this.changePasswordForm.controls['oldpassword'];
        this.newpassword1 = this.changePasswordForm.controls['newpassword1'];
        this.newpassword2 = this.changePasswordForm.controls['newpassword2'];
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
    clearMsg(){
        this.errorMsg = "";
    }
    onSubmit(value){
        //1.密码不能为空
        if(!this.changePasswordForm.valid) {
            this.errorMsg = "密码不能为空！"
        }
        //2.两次输入密码相同
        else if(this.new1 != this.new2){
            this.errorMsg = "两次输入密码不一致！"
        }
        else{
            let confirm = this.alertCtrl.create({
                title: '修改密码',
                message: '确认修改密码吗？',
                buttons: [
                    {
                        text: '取消',
                        handler: () => {
                            console.log("取消");
                        }
                    },
                    {
                        text: '确定',
                        handler: () => {
                            console.log("确定");
                            this.nativeSerivce.showLoading();
                            // let url = "http://192.168.0.136:7000/user/updatepassword";
                            let url = this.httpService.getAccountUrl() + "/user/updatepassword";
                            let body = {
                                "userId":this.userId,
                                "oldpassword":this.old,
                                "newpassword":this.new1,
                            }
                            let headers = new Headers({
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*",
                                'Accept': 'application/json'
                            });
                            let options = new RequestOptions({
                                headers:headers
                            })
                            this.http.post(url,JSON.stringify(body),options).map(res=>res.json()).subscribe(data=>{
                                console.log(data);
                                    console.log("status==0")
                                    if(data.status == 1){
                                        this.errorMsg = data.Msg;
                                    }else{
                                        this.showConfirm("修改密码","修改密码成功！","确定",()=>{
                                        })
                                    }               
                            },err =>{
                                console.log("status==0")
                                const prompt = this.alertCtrl.create({
                                    title: '确认失败',
                                    message: '网络连接错误',
                                    buttons: [
                                        {
                                            text: '确认',
                                            handler: data => {
                                            }
                                        }
                                    ]
                                });
                                prompt.present();
                            });
                        }
                    }
                ]
            });
            confirm.present();
        }
    }
    showConfirm(item1,item2,item3,item4){
        let confirm = this.alertCtrl.create({
            title: item1,
            message: item2,
            buttons: [{
                text: item3,
                handler: () => {
                    console.log(item3);
                    item4();
                }
            }]
        });
        confirm.present();
    }

    miss(){
      this.viewCtrl.dismiss();
    }
}
