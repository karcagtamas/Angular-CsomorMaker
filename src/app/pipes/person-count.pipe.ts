import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personCount'
})
export class PersonCountPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return value + ' fő';
  }
}
