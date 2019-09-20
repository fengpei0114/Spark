import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../../pages/tabs/tabs';
import { SetServerIpPage } from './set-server-ip/set-server-ip';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpService } from '../../providers/http-service/http-service';
import { NativeService } from '../../providers/native-service/native-service';
import { AccountService } from '../../providers/account-service/account-service';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
import { HomePage } from '../home/home';
import { concat } from 'rxjs/operator/concat';
import { MapPage } from '../map/map';
declare let cordova: any;
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('userName') input:ElementRef;

    isToggled: boolean = false;
    username: string;
    password: string;
    randomCode: string;
    loginForm: any;
    errorMsg:string;
    randomCodeImage: string = "";
    randomCodeIsRight: boolean = false;
    roleId:string;
  userId:string;


    ngOnInit() {
        // this.loginForm = new FormGroup({
        //     username: new FormControl("",Validators.required),
        //     password: new FormControl("",Validators.required)
        // });
    }

    constructor(public renderer: Renderer,
                private elementRef: ElementRef,
                public http: Http,
                public httpService: HttpService,
                public accountService: AccountService,
                public toastCtrl: ToastController,
                public storage: Storage,
                public navCtrl: NavController,
                private  formBuilder: FormBuilder,
                public navParams: NavParams,
                private nativeService: NativeService) {
        // console.log(Md5.hashStr("111111{admin}"));
        this.createCode();
        this.loginForm = formBuilder.group({
            username: new FormControl('',Validators.compose([])),
            password: new FormControl('',Validators.compose([Validators.minLength(4)])),
            randomCode: new FormControl('',Validators.compose([Validators.required,Validators.minLength(4)])),
        });
        this.username = this.loginForm.controls['username'];
        this.password = this.loginForm.controls['password'];
        this.randomCode = this.loginForm.controls['randomCode'];

        // if(this.username == "111111"){
        //     this.nativeService.hideLoading();
        //     this.navCtrl.setRoot(HomePage).then();
        // }else if(this.username == "222222"){
        //     this.nativeService.hideLoading();
        //     this.navCtrl.setRoot(MapPage).then();
        // }
    }
    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('input'),
            'focus',[]);
    }

    //判断是否记住密码
    onSubmit(value) {
        
        // this.httpService.setIpAndPort("47.92.34.161","80");
        if (value.randomCode.toLocaleLowerCase() === this.randomCodeImage.toLocaleLowerCase()){
            if(this.loginForm.valid) {
                this.nativeService.showLoading('正在登陆...');

                // let url = "http://192.168.0.136:7000/login";
                let url = this.httpService.getAccountUrl() + "/login";
                // this.password = Md5.hashStr(this.password).toString();
                let body= {
                    "username":value.username,
                    "password":value.password,
                }
                let headers = new Headers({
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
                  'Accept': 'application/json'
                });
                let options = new RequestOptions({
                    headers: headers
                });
                console.log(JSON.stringify(body));
                this.http.post(url,body,options).map(res =>res.json()).subscribe(data => {
                    // alert(data);
                  this.nativeService.hideLoading();
                    console.log(data);
                    if(data.status == "1"){
                        //  console.log(value.password.length());
                        this.errorMsg = data.Msg;
                    }else {
                        this.accountService.setAccount(data);
                      this.roleId=data['roles'];
                      this.storage.set('roleId',this.roleId);
                      this.userId=data['userId'];
                      this.storage.set('userId',this.userId);
                      this.storage.set('username',value.username);
                        if(this.isToggled){
                            // // alert('记住密码');
                            this.storage.set('username',value.username);
                            this.storage.set('password',value.password);
                        }
                        console.log(this.roleId);
                        if(this.roleId == "3" || this.roleId == "4"){
                            this.nativeService.hideLoading();
                            this.navCtrl.setRoot(HomePage).then();
                        }else if(this.roleId == "5"){
                            this.nativeService.hideLoading();
                            this.navCtrl.setRoot(MapPage).then();
                        }
                        else {
                          this.nativeService.showToast("用户无权限访问！");
                        }
                    }
                },error=>{
                    console.log(error);
                });
                // this.checkUserInfo(this.username,this.password).then(data =>{
                //     // alert(data['load']);
                //     this.accountService.setAccount(data);

                //     if(data[status]="0"){

                //     }


                //    // alert(this.isToggled);
                //     console.log(this.accountService.getAccount());
                //     if(data['status'] == "0"){
                //         if(this.isToggled){

                //            // alert('记住密码');
                //             this.storage.set('username',this.username).then();
                //             this.storage.set('password',this.password).then();
                //             this.storage.set('identyid',data['identyid']).then();
                //         }
                //         if(data['identyid'] == "1"){
                //             this.nativeService.hideLoading();
                //             this.navCtrl.setRoot(MapPage).then();
                //         }else if(data['identyid'] == "2"){
                //             this.nativeService.hideLoading();
                //             this.navCtrl.setRoot(HomePage).then();
                //         }else if(data['identyid'] == "3"){
                //             this.nativeService.hideLoading();
                //             this.navCtrl.setRoot(HomePage).then();
                //         }
                //         this.nativeService.hideLoading();
                //         this.navCtrl.setRoot(HomePage).then();
                //     }else {
                //         //console.log(value.password.length());
                //         this.errorMsg = data['Msg'];
                //         //设置输入错误提示
                //         // let toast = this.toastCtrl.create({
                //         //     message: '用户名或密码错误！',
                //         //     duration: 2000,
                //         //     position: 'middle'
                //         // });
                        
                //         // toast.present(toast).then();
                //     }
                // });
            }else{
                if(value.username==""){
                    this.errorMsg = "  *用户名不能为空！";
                }else {
                    this.errorMsg = "  *密码不正确！";
                }
            }

        }else {
            this.errorMsg = "  *验证码错误！"
            // this.nativeService.showToast("验证码错误，请重新输入！");
            this.createCode();
        }


    }
    clickBtn(){
        this.errorMsg = "";
    }
    //改变记住密码按钮状态
    toggled() {
         
        console.log("isToggled: "+ this.isToggled);
        if (this.isToggled === true) {
            this.isToggled = false;
        }
        else {
            this.isToggled = true;
        }
        this.clickBtn();
    }

    setServerIP() {
        this.navCtrl.push(SetServerIpPage).then( ()=> {
        })
    }

    createCode() {
        let authCode: string ="";//设置这个为空变量，然后往里面添加随机数
        let authCodeLength=4;//随机数的长度
        const randomArray=[1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R', 'S','T','U','V','W','X','Y','Z'];
        //创建一个数组，随机数从里面选择四位数或者更多
        for(let i=0;i<authCodeLength;i++){
            let index=Math.floor(Math.random()*randomArray.length);//随机取一位数
            authCode +=randomArray[index];//取四位数，并+相连
        }
        console.log(authCode);//取到四位随机数之后，跳出循环
        this.randomCodeImage = authCode;//将四位随机数赋值给验证码出现的方框
    }

}
