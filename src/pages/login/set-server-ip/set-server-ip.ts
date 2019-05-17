import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service/http-service';
import { NativeService } from '../../../providers/native-service/native-service';

/**
 * Generated class for the SetServerIpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-set-server-ip',
  templateUrl: 'set-server-ip.html',
})
export class SetServerIpPage {
    newServerIp: string;
    newServerPort: string;
    serverIp: string;
    serverPort: string;
    errorMsg: string;
    is:boolean = true;

    constructor(public navCtrl: NavController,
                public  viewCtrl : ViewController,
                public navParams: NavParams,
                public httpService: HttpService,
                public nativeService: NativeService,
                public alertCtrl: AlertController,
    ) {

    //  this.serverIp = this.httpService.getIp();
    //  this.serverPort = this.httpService.getPort();

        this.serverIp = "47.92.34.161";
        this.serverPort = "80";
    }

    changeIpAndPort() {

        this.httpService.setIpAndPort(this.newServerIp,this.newServerPort);
        console.log(this.serverIp+":"+this.serverPort);
        console.log("new"+this.httpService.getUrl());
        
        var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;  
        var reg = this.newServerIp.match(exp);  

        if(reg == null){
            this.errorMsg = "ip地址错误！";
        }else{
            let confirm = this.alertCtrl.create({
                title: '设置服务器',
                message: '确认设置服务器吗？',
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
                            if(this.is == true){
                                this.showConfirm("设置服务器","设置服务器成功！","确定",()=>{
                                    this.serverIp = this.newServerIp;
                                    this.serverPort = this.newServerPort;
                                    this.newServerIp= "";
                                    this.newServerPort = "";
                                    this.errorMsg = "";
                                    this.httpService.setIpAndPort(this.serverIp,this.serverPort);
                                })
                            }else{
                                this.showConfirm("设置服务器","设置服务器失败！","确定",()=>{

                                })
                            }
                        }
                    }
                ]
            });
            confirm.present();
        }
    }
    miss(){
        this.viewCtrl.dismiss();
    }
    clearMsg(){
        this.errorMsg = "";
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
}
