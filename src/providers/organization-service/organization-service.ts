import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the OrganizationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OrganizationServiceProvider {

  private selectedOrganization:any;
  constructor(public http: Http) {
    console.log('Hello OrganizationServiceProvider Provider');
  }

  getSelectedOrganization(): string {
    return this.selectedOrganization;
  }

  setSelectedOrganization(organ:any) {
    this.selectedOrganization = organ;
    console.log("当前选中的机构");
    console.log(organ);
  }
}
