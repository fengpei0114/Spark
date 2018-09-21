import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, AlertController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TakePhotoPage } from '../../upload/take-photo/take-photo';
import { HttpService } from '../../../providers/http-service/http-service';
import { Http, Headers, RequestOptions} from '@angular/http';
import { TaskHistoryAlarmPage } from '../task-history-alarm/task-history-alarm';
import { ViewerPicPage } from '../viewer-pic/viewer-pic';
import { StatisticDetailPage } from '../../statistic/statistic-detail/statistic-detail';
import { AccountService } from '../../../providers/account-service/account-service';
import { HTTP } from '@ionic-native/http';

// import { PaginationPage } from '../../../components/pagination/pagination';
/**
 * Generated class for the TaskDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {
    @Input() totalSeconds:number;
    @Input() intervalSeconds:number;
    @Input() background:string;
    @Output() onRefresh = new EventEmitter();
    @Output() onFinish = new EventEmitter();

    /* 更改任务状态变量及结果 */
    changeTaskStatusOpen: boolean;
    taskStatusResult;


    imageList: Array<Object>;
    text: string;
    current: number;
    step:number;
    total:number;
    pageSize:number;
    pageIndex:number;

    imageUrl:Array<string> = [];
    task: object;
    callback: any ;
    organization: any;
    organizationName:string = "";
    project:any;

    type:number = -1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private cd: ChangeDetectorRef,
              private accountService: AccountService,
              public app: App,
              public http: Http,
              public Http: HTTP,
              public alertCtrl: AlertController,
              public httpService: HttpService,
    ) {
    this.pageSize = 4;
    console.log(this.navParams.data);
    this.task = this.navParams.get('data');
    this.callback = this.navParams.get('callback');
    this.project = this.navParams.get('project');
    this.organization = this.navParams.get('organization');
    this.organizationName = this.navParams.get('organizationName');
    this.showTaskStatus();
    this.doSearch(1);
  }

  //任务状态进度条显示
  showTaskStatus(){

      if (this.task['status'] == "待处理") {
          this.current = 20;
          this.background = "orangered";
      } else if (this.task['status'] == "下发告知书") {
          this.current = 40;
          this.background = "orange";
      }else if (this.task['status'] == "下发决定书"){
          this.current = 60;
          this.background = "";
      }else if (this.task['status'] == "已缴款"){
          this.current = 80;
          this.background = "";
      }else {
        this.current = 100;
        this.background = "green";
      }

  }
  terminado(){

  }
  actualizaNum(ev){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailPage');
  }

  gotoStatistic() {
      let alarmtype = -1;

      if((this.task as any).alarmtype == "噪音"){
          alarmtype = 0;
      }else if((this.task as any).alarmtype == "PM2.5"){
          alarmtype = 1;
      }else if((this.task as any).alarmtype == "PM10"){
          alarmtype = 2;
      }
      this.type = alarmtype;
      // console.log(this.organizationName);
      this.navCtrl.push(StatisticDetailPage,{
          data:this.task,
          projectId:this.project,
          projectName:this.task['project'],
          organization:this.organization,
          organizationName:this.organizationName,
          isTaskToStatistic:true,
          type : this.type
      });
  }

  gotoChangeStatus() {
      if(this.task['status'] !== "办结"){
          this.showRadio();
      }else {
          let toast = this.toastCtrl.create({
              message: '任务已完结！',
              duration: 2000,
              position: 'middle'
          });

          toast.present(toast);
      }
  }

  gotoHistoryAlaram() {
      this.navCtrl.push(TaskHistoryAlarmPage,[(this.task as any).alarmtypeId,(this.task as any).createtime]).then();

  }
  gotoUpload(){
      this.app.getRootNav().push(TakePhotoPage,{
          projectId:this.project,
          taskNo:this.task['no'],
          projectName:this.task['project'],
          organization:this.organization,
          organizationName:this.organizationName,
          isTaskToUpload:true,
      });
  }

  getTaskImages() {
      let url = this.httpService.getUrl()+"/NoiseDust/getImagesOfTask.do";
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let body = "taskId="+(this.task as any).no+"&pageIndex="+this.pageIndex+"&pageSize="+this.pageSize;
      console.log(body);
      let options = new RequestOptions({
          headers: headers
      });

      this.http.post(url, body, options).map(res => res.json()).subscribe(imageList => {

          if (imageList.data === null) {
              return;
          } else {
              console.log(imageList);

              // console.log(this.imageList[0].imageid);
              this.imageList = imageList.data;
              for (let i = 0; i < this.imageList.length; i++) {
                  console.log(this.imageList[i]);
                  this.getOneTaskImage((this.imageList[i] as any).imageid);
              }
              return;
          }

      });

  }

  getOneTaskImage(imageId) {
      let url = this.httpService.getUrl()+"/NoiseDust/getOneImageOfTask.do"+"?id="+imageId+"&type=0";
       this.imageUrl.push(url);

      this.http.get(url).subscribe(image =>{
          console.log(image);
      });

  }
  doSearch(pageNum) {
      this.imageUrl = [];
      this.pageIndex = pageNum;
      console.log(pageNum);
      this.getTaskImages();
  }

  showRadio() {
        let alert = this.alertCtrl.create();
        alert.setTitle('更改任务状态');

        alert.addInput({
            type: 'radio',
            label: '未处理',
            value:  '0',
            checked: true
        });
      alert.addInput({
          type: 'radio',
          label: '下发告知书',
          value: '1',
      });

      alert.addInput({
          type: 'radio',
          label: '下发决定书',
          value: '2'
      });

      alert.addInput({
          type: 'radio',
          label: '已缴款',
          value: '3'
      });

      alert.addInput({
          type: 'radio',
          label: '已完结',
          value: '4'
      });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                this.changeTaskStatusOpen = false;
                this.taskStatusResult = data;
                console.log(this.taskStatusResult);
                this.taskUpdateStatus(data);
            }
        });


        alert.present().then(() =>{
            this.changeTaskStatusOpen = true;
        });
    }

    showImage(image) {
      console.log(image);
      this.navCtrl.push(ViewerPicPage,image);
    }

    taskUpdateStatus(status) {


        let nowStatus = status;
        let note = "无";
        //获得当前的操作员ID
        //if(nowStatus != )
        let opID = (this.accountService.getAccount() as any).accountId;
        //当前的任务状态，办结时才用
        let change_status=-1;
        let payMoney = "";

        let url = this.httpService.getUrl()+"/NoiseDust/updateAlarmTaskOfMobile.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "taskID="+(this.task as any).no+"&status="+nowStatus+"&note="+note+"&opID="+opID+"&changeStatus="+change_status+"&paymoney="+payMoney;
        console.log(body);
        let options = new RequestOptions({
            headers: headers
        });

        this.http.post(url, body, options).subscribe(imageList => {
            let toast = this.toastCtrl.create({
                message: '更改任务状态成功！',
                duration: 2000,
                position: 'middle'
            });

            toast.present(toast).then(() =>{
                this.dismiss();
            });
        }, err => {

        } );
    }


    dismiss(){
        this.callback().then(() => {

        }) ;
        this.navCtrl.pop();
    }

}
