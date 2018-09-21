import { Component,Input ,Output ,EventEmitter} from '@angular/core';
import { Events } from "ionic-angular";
import {OrganizationServiceProvider } from "../../providers/organization-service/organization-service"

/**
 * Generated class for the AppTreeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-tree',
  templateUrl: 'app-tree.html'
})
export class AppTreeComponent {
  @Input() treeLists: any;
  @Output() ItemSelect = new EventEmitter<any>();
  selectedItem: any;
  constructor(
    public organService: OrganizationServiceProvider,
    public events: Events,
  ) {
    // console.log('He1qllo AppTreeComponent Component');
    //   console.log(this.treeLists);

  }



  itemClick(item) {
    // this.organService.setSelectedOrganization(item);

    if (!item.open){
      item.open = true;
    }else  {
      item.open = !item.open;
    }
    this.ItemSelect.emit(item);
    // 发布组织机构选中事件
    this.events.publish('organ:select',item);
  }

  selectItem(item) {
    this.selectedItem = item;
    console.log("selectItem");
    this.ItemSelect.emit(item);

  }

}
