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
     let status :string = '';

     switch (value) {
         case '0':
             status = '关闭';
             break;
         case '1':
             status = '开启';
             break;
         default:
             status = '异常';
             break;
     }
    return status;
  }
}
