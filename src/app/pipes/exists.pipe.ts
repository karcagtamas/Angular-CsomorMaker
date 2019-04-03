import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exists'
})
export class ExistsPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      return value;
    } else {
      return '-';
    }
  }
}
