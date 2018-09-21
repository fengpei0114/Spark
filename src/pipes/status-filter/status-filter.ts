import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StatusFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'statusFilter',
})
export class StatusFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
     let styleType :number = 0;

     switch (value) {
         case "待处理":
             styleType = 1;
             break;
         case "下发告知书":
             styleType = 2;
             break;
         case "下发决定书":
             styleType = 3;
             break;
         case "已交款":
             styleType = 4;
             break;
         case "办结":
             styleType = 5;
             break;
         default:
             styleType = 0;
             break;
     }
    return styleType;
  }
}
