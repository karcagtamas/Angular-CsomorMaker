import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToHour'
})
export class ConvertToHourPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    // tslint:disable-next-line: radix
    let hour: number = parseInt(value.split('-')[1]);
    return hour + ' óra - ' + (hour + 1) + ' óra';
  }
}
