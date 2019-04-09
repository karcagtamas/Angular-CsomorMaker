import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from 'util';

@Pipe({
  name: 'createLetter'
})
export class CreateLetterPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value.length !== 0) {
      return value[0].toUpperCase();
    } else {
      return 'M';
    }
  }
}
