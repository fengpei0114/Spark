import { Component,Output,EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Http, Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';
import { NativeService } from '../../../providers/native-service/native-service';
/**
 * Generated class for the TaskCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-task-create',
  templateUrl: 'task-create.html',
})
export class TaskCreatePage {
    @Output() collectionpointOut = new EventEmitter();
    @Output() sensortypeOut = new EventEmitter();

    collectionData:Array<Object>;
    collectionPoint:string;
    sensorType:string;
    projectId: number;
    projectName: string;
    note:string = "";
    deviceData: Array<Object>;

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              public navParams: NavParams,
              public http: Http,
              public nativeService: NativeService,
              public httpService: HttpService,) {
      console.log(this.navParams.data);
      this.projectId = this.navParams.data[0];
      this.projectName = this.navParams.data[1];
      this.getCollectionPointData();
  }

  getCollectionPointData(){

      let url = this.httpService.getUrl()+"/NoiseDust/getCollectionOfProject.do";
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let body = "id="+this.projectId;
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
        console.log(this.collectionPoint);
        this.initCreateTaskSensorType();
  }
  ionViewDidLoad() {
  }

  initCreateTaskSensorType(){
      let url = this.httpService.getUrl()+"/NoiseDust/getSensorTypeOfPro.do";
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let body = "dataPointId="+this.collectionPoint;
      let options = new RequestOptions({
          headers: headers
      });

      this.http.post(url,body,options).map(res => res.json()).subscribe(data =>{
          console.log(data);
          this.deviceData = data;
      });
  }

  sensorTypeChange() {
      this.sensortypeOut.emit(this.sensorType);
  }

  taskSave() {

      this.nativeService.showLoading("正在保存...");
      let url = this.httpService.getUrl()+"/NoiseDust/createAlarmTask.do";
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let body = "projectId="+this.projectId+"&datacollectionpointId="+this.collectionPoint+
          "&sensorType="+this.sensorType+"&note="+this.note;
      let options = new RequestOptions({
          headers: headers
      });

      this.http.post(url,body,options).map(res => res.json()).subscribe(data =>{
          console.log("sucess!");

          this.nativeService.hideLoading();
          this.navCtrl.pop().then(() =>{
              this.nativeService.showToast("保存成功",2000);

          });
          // this.deviceData = data;
      });
  }

  taskCancel(){
      this.navCtrl.pop();
  }

}
