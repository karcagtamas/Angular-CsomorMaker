import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    const now = new Date();
    const message = new Date(value);
    const valueInDay = this.toDay(now.valueOf()) - this.toDay(message.valueOf());
    if (valueInDay <= 1) {
      return `ma - ${message.getFullYear()}-${(message.getMonth() <= 8 ? '0' : null) +
        (message.getMonth() + 1)}-${message.getDate()}`;
    }
    if (valueInDay <= 30) {
      return `${Math.floor(valueInDay)} napja`;
    }
    if (valueInDay / 30 <= 12) {
      return `${Math.floor(valueInDay / 30)} hónapja`;
    }
    if (valueInDay / 30 / 12 >= 1) {
      return `${Math.floor(valueInDay / 30 / 12)} éve`;
    }
    return null;
  }

  toDay(value: number) {
    return value / 1000 / 3600 / 24;
  }
}
