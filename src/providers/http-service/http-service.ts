import {Injectable} from '@angular/core';
import {
  Http, Response, Headers, RequestOptions
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import {Storage} from '@ionic/storage';
import {NativeService} from '../native-service/native-service';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {

  // private url:string = "http://192.168.0.167:7002";// 服务器端口号和IP
  // private urlIp:string = "192.168.0.167";
  // private urlPort:string = "7002";
  private url: string = "http://121.40.43.164";// 服务器端口号和IP
  private urlIp: string = "121.40.43.164";
  private accountPort: string = "7000";
  private devicePort: string = "7002";

  constructor(public http: Http, public nativeService: NativeService,
              private storage: Storage
  ) {

    this.storage.get('urlIp').then(ip => {
      if (typeof (ip) !== "undefined" && ip != null) {
        this.urlIp = ip;
        console.log("stroageIp:" + this.urlIp);
      } else {
        this.url = "http://121.40.43.164";
        this.urlIp = "121.40.43.164";
      }
    })


  }

  public get(url: string, paramMap: any = null): Observable<Response> {
    console.log(url);
    return this.http.get(url);
  }

  // 默认Content-Type为application/json;
  public post(url: string, body: any = null): Observable<Response> {


    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(url, body, options);
  }

  public static getDebugUrl() {
    return "http://10.175.200.30:8081";
  }

  getDeviceUrl() {
    return this.url + ":" + this.devicePort;
  }

  getAccountUrl() {
    return this.url + ":" + this.accountPort;
  }

  //生产环境URL
  public static getProdUrl() {
    return "http://service:8080";
  }

  setUrl(url: string) {
    this.url = url;
  }

  getIp() {
    return this.urlIp;
  }

  getUrl() {
    
  }

  setIp(Ip: string) {
    this.urlIp = Ip;
    this.url = "http://" + Ip;
    this.storage.set('urlIp', this.urlIp).then();
    this.storage.set('url', this.url).then();
  }
}
