import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forint'
})
export class ForintPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return value + ' Ft';
  }
}
