import { Component,Output,EventEmitter } from '@angular/core';
import { ViewController ,ToastController} from 'ionic-angular';
import { NativeService } from "../../../providers/native-service/native-service";
import { NavController, NavParams } from 'ionic-angular';
import { Http,Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import { AccountService } from '../../../providers/account-service/account-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera,CameraOptions} from '@ionic-native/camera';
/*
 Generated class for the TakePhoto page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-take-photo',
    templateUrl: 'take-photo.html',
})
export class TakePhotoPage {
    @Output() organizationOut = new EventEmitter();
    @Output() projectOut = new EventEmitter();
    @Output() collectionpointOut = new EventEmitter();
    organization:string;
    project:number;
    collectionPoint:number;
    organData:Array<Object> = [];
    projectData:Array<Object>;
    collectionData:Array<Object>;

    accountId = 0;
    isChange: boolean = false;//头像是否改变标识
    avatarPath: string = 'assets/camera.jpg';//用户默认头像
    imageBase64: string;//保存头像base64,用于上传
    litImage: string;
    longitude = 108.00;//经度
    latitude = 34.00;//纬度
    note:string = " ";//备注信息
    isHomeToUpload:boolean = false;
    isTaskToUpload:boolean = false;

    //主页上传照片参数
    organizationId: number = -1;
    organizationName: string = " ";
    projectId:number = -1;
    projectName:string = " ";
    collectionPointId: number = -1;
    collectionPointName: string = " ";
    taskId:number = -1;

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController,
                public navParams: NavParams,
                public http: Http,
                public toastCtrl: ToastController,
                public camera: Camera,
                public geolocation: Geolocation,
                public accountService: AccountService,
                public httpService: HttpService,
                private nativeService: NativeService,
    ) {
        console.log(this.navParams.data);
        typeof("=====================isHomeToTask");
        console.log(typeof(this.navParams.get('isHomeToUpload')));
        if (typeof(this.navParams.get('isHomeToUpload'))!="undefined"){
            this.organizationId = this.navParams.get('organizationId');
            this.organizationName = this.navParams.get('organizationName');
            this.isHomeToUpload = this.navParams.get('isHomeToUpload');
            this.projectId = this.navParams.get('projectId');
            this.projectName = this.navParams.get('projectName');
            this.collectionPointName = this.navParams.get('collectionPointName');
            this.collectionPointId = this.navParams.get('collectionPointId');

            this.project = this.projectId;
            this.collectionPoint = this.collectionPointId;
        }else if(typeof(this.navParams.get('isTaskToUpload'))!="undefined"){
            this.organizationId = this.navParams.get('organizationId');
            this.organizationName = this.navParams.get('organizationName');
            this.isTaskToUpload = this.navParams.get('isTaskToUpload');
            this.projectId = this.navParams.get('projectId');
            this.projectName = this.navParams.get('projectName');
            this.project = this.projectId;
            this.taskId = this.navParams.get('taskNo');
            this.projectChange();
        }else{
            this.getOrganization();
        }

        this.geolocation.getCurrentPosition().then((resp) =>{
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            console.log(resp.coords);
        });

    }




    //初始化组织机构数据
    getOrganization() {

        let organizationId = (this.accountService.getAccount() as any).role['organizationId'];
        let url = this.httpService.getUrl()+"/NoiseDust/getOrganization.do";
        // var url = this.appConfig.getUrl()+'/NoiseDust/getOrganizations.do';
        let body= "organizationId="+organizationId;

        console.log((this.accountService.getAccount() as any).role['organizationId']);
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,body,options).map(res =>res.json()).subscribe(data => {
            // alert(data['name']);

            console.log(data);
            this.organData.push(data);
        });
    }
    organChange() {
        this.organizationOut.emit(this.organization);
        let url = this.httpService.getUrl()+"/NoiseDust/getProjectsByOrg.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "id="+this.organization;
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,body,options).map(res => res.json()).subscribe(data =>{
            console.log(data);
            this.projectData = data;
        });
    }

    projectChange() {
        this.projectOut.emit(this.project);
        let url = this.httpService.getUrl()+"/NoiseDust/getCollectionOfProject.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "id="+this.project;
        let options = new RequestOptions({
            headers: headers
        });

        this.http.post(url,body,options).map(res => res.json()).subscribe(data =>{
            console.log(data);
            this.collectionData = data;
        });
    }

    collectionPointChange() {
        this.collectionpointOut.emit(this.collectionPoint);
    }



    getPicture(type) {//1拍照,0从图库选择

        let options = {
            quality:50,
            targetWidth: 500,
            targetHeight: 500,
        };
        if (type == 1) {
            this.getPic();
        } else {
            this.nativeService.getPictureByPhotoLibrary(options).then(imageBase64 => {
                this.getPictureSuccess(imageBase64);
            });
        }
    }

    private getPictureSuccess(imageBase64) {

        let base64Image = 'data:image/jpeg;base64,' + imageBase64;

        this.avatarPath = base64Image;
        console.log(imageBase64);
        this.imageBase64 = <string>imageBase64;
        this.litImage = imageBase64;

    }

    uploadImage() {
        this.accountId = (this.accountService.getAccount() as any).accountId;
        console.log(this.imageBase64.length);
        // this.litImage = this.imageBase64;
        let url = this.httpService.getUrl()+"/NoiseDust/saveImage.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let note = "任务上传图片";
        let body = "projectId="+this.project+"&datacollectionpointId="+this.collectionPoint+"&base64ImageData="+this.imageBase64+"&note=1&base64Litimg="+this.litImage+"&longitude="+this.longitude+"&latitude="+this.latitude+"&accountID="+this.accountId;
        if (this.isTaskToUpload){
            body = "base64ImageData="+this.imageBase64+"&note="+note+"&base64Litimg="+this.litImage+"&longitude="+this.longitude+"&latitude="+this.latitude+"&accountID="+this.accountId+"&alarmTaskId="+this.taskId;
        }

        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(url,body,options).subscribe(data =>{
            this.isChange = true;
            // this.projectData = data;

            let toast = this.toastCtrl.create({
                message: '上传成功！',
                duration: 2000,
                position: 'middle'
            });

            toast.present(toast).then();
        },err =>{
            let toast = this.toastCtrl.create({
                message: '上传失败，请重新拍照！',
                duration: 2000,
                position: 'middle'
            });
            toast.present(toast).then(() =>{
                this.avatarPath = 'assets/camera.jpg';//用户默认头像
            });
        });

        if (!this.isChange) {
            this.nativeService.showLoading('正在上传....');
            this.avatarPath = 'assets/camera.jpg';
            // this.viewCtrl.dismiss({avatarPath: this.avatarPath});//这里可以把头像传出去.
        } else {
            this.dismiss();
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    getPic(){

        const options: CameraOptions = {
            quality: 50,
            targetWidth: 500,
            targetHeight: 500,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG,
            destinationType: this.camera.DestinationType.DATA_URL
        };
        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.imageBase64 = imageData;
            this.litImage = imageData;

            console.log(this.litImage);
            this.avatarPath = base64Image;

        }, (err) => {
        });
    }


    inputBlur() {
        console.log(this.note);
    }

}
