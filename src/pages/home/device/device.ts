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
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {

    dev_id: number;
    dev_org = "";
    dev_mod = "";
    dev_simNo = "";
    dev_status = "";
    dev_latestHeartbeat = "";
    dev_note = "";

    constructor(public http:Http,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        this.dev_id = this.navParams.data;
        console.log(this.dev_id);
        this.getDeviceById(this.dev_id).then(data => {
            this.dev_org = data['organizationName'];
            this.dev_mod = data['model'];
            this.dev_simNo = data['simNo'];
            if(data['status']==0)
            {
                this.dev_status="未安装";
            } else
            {
                this.dev_status="已安装";
            }
            // this.dev_status = data['status'];
            this.dev_latestHeartbeat = data['latestHeartbeat'];
            this.dev_note = data['note'];

        });
    }

    getDeviceById(deviceId) {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let url = this.httpService.getUrl()+"/NoiseDust/getDeviceByIdForApp.do";
        let body= "deviceId="+deviceId;
        return new Promise((resolve,reject) => {
            this.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                    console.log(data);
                    // alert(this.userInfo.realName + this.userInfo.phone1);

                },err => {
                    reject(err);
                });
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserInfoPage');
    }

}
