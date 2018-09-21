import { Component ,Output,EventEmitter ,ElementRef } from '@angular/core';
import { MenuController, NavParams ,IonicPage ,ViewController} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { Headers, RequestOptions, Http} from '@angular/http';
import { HttpService } from '../../providers/http-service/http-service';
import { TaskDetailPage } from './task-detail/task-detail';
import { TaskCreatePage } from './task-create/task-create';
import { AccountService } from  '../../providers/account-service/account-service';


/**
 * Generated class for the TaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

    @Output() organizationOut = new EventEmitter();
    @Output() projectOut = new EventEmitter();
    organization:any;
    project:string;
    projectName:string;
    organData:Array<Object> = [];
    projectData:Array<Object>;

    //home传进来的数据接收
    isHomeToTask:boolean = false;
    organizationId: any = 0;
    organizationName: string = "";
    prjId: any = 0;
    prjName: any = "";
    showTask: boolean = true;

    //任务进度的颜色
    // taskStatusColor:any = {"border-left": "3px solid #000"};



    tasklistData:Array<Object>;
    showTasklist:boolean = false;
    constructor(public navParams: NavParams,
                public app: App,
                public menuCtrl: MenuController,
                public nav: NavController,
                private viewCtrl: ViewController,
                public http: Http,
                public httpService: HttpService,
                public accountService: AccountService,
                private elementREf:ElementRef)
    {

        console.log(typeof(this.navParams.get('isHomeToTask')));
        if (typeof(this.navParams.get('isHomeToTask'))!="undefined"){
            this.organizationId = this.navParams.get('organizationId');
            this.organizationName = this.navParams.get('organizationName');
            this.isHomeToTask = this.navParams.get('isHomeToTask');
            if(this.isHomeToTask !== true) {
                this.getOrganization();
            }
            this.prjId = this.navParams.get('prjId');
            this.prjName = this.navParams.get('prjName');
            this.project = this.prjId;

            this.taskQuery();
        } else{
            this.showTasklist = true;
            this.showAllTask();
            this.getOrganization();
        }

        viewCtrl.didEnter.subscribe(this.onDidEnter.bind(this));

    }

    showAllTask() {
        let url = this.httpService.getUrl()+"/NoiseDust/getTasksOfProject.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "projectId=0";
        let options = new RequestOptions({
            headers: headers
        });

        this.http.post(url,body,options).map(res => res.json()).subscribe(tasklist =>{
            console.log(tasklist);
            this.showTasklist = true;
            this.tasklistData = tasklist;
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

    onDidEnter(){
        console.log("Did Enter");
    }

    organChange() {
        this.isHomeToTask = false;
        this.organizationOut.emit(this.organization);
        this.organizationId = this.organization;

        for (let i =0;i<this.organData.length;i++){
            if ((this.organData[i] as any).id == this.organization){
                this.organizationName = (this.organData[i] as any).name;
            }
        }
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

        console.log(this.project + this.projectName);
    }

    taskQuery() {
        this.tasklistData = [];
        let url = this.httpService.getUrl()+"/NoiseDust/getTasksOfProject.do";
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = "projectId="+this.project;
        let options = new RequestOptions({
            headers: headers
        });

        this.http.post(url,body,options).map(res => res.json()).subscribe(tasklist =>{
            console.log(tasklist);
            this.showTasklist = true;
            this.tasklistData = tasklist;
        });
    }

    taskDetailQuery(item) {
        console.log(this.organizationName);
        // let orgName = "";
        // if(typeof(this.organizationName)!=="undefined"){
        //     orgName = this.organizationName;
        // }else{
        //     for (let i =0;i<this.organData.length;i++){
        //         if ((this.organData[i] as any).id == this.organization){
        //             orgName = (this.organData[i] as any).name;
        //         }
        //     }
        // }
        this.app.getRootNav().push(TaskDetailPage,
            {
                data:item,
                project:this.project,
                organization:this.organizationId,
                organizationName:this.organizationName,
                callback:this.refresh
            }).then(() =>{
        });
    }

    refresh = () =>
    {
        return new Promise((resolve, reject) => {
            this.taskQuery();
        });
    };

    taskCreate(){

        // console.log(item);
        this.app.getRootNav().push(TaskCreatePage,[this.project,this.projectName]).then(() =>{

        });

    }

    getItem(item ){
        this.projectName = (item as any).name;
    }



}
