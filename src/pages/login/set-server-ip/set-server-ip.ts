import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public httpService: HttpService,
                public nativeService: NativeService,
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

        this.navCtrl.pop().then(() =>{
            this.nativeService.showToast("修改完成");
        });
    }
}
