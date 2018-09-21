import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * @name 自定义分页组件
 * @description
 * @example <page-pagination [total]="18" (pageNumChange)="doSearch($event)"></page-pagination>
 * @example <page-pagination [total]="total" (pageNumChange)="doSearch($event)" pageSize="10" color="dark"></page-pagination>
 */
@Component({
    selector: 'page-pagination',
    templateUrl: 'pagination.html'
})
export class PaginationPage {

    @Input()
    total:number;//共多少条数据

    @Input()
    pageSize:number=6;//每页大小,默认6条

    @Input()
    color:string='primary';//主题颜色

    @Input() pageNum:number=1;//当前第几页,默认1
    @Output() pageNumChange = new EventEmitter<any>();


    constructor() {
    }

    btnClick(pageNum){
        this.pageNum = pageNum;
        this.pageNumChange.emit(pageNum);
    }

    ceil(num){
        return Math.ceil(num);
    }

}
