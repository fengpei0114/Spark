import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NameLengthPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'setPointLength',
})
export class NameLengthPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
      let length = value.length;

      if (length>=6) {
          // console.log("======================");
          value = value.substring(0,6);
          value = value + "...";
      }
     
       // console.log(value);
    return value;
  }
}
