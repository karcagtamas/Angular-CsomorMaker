import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAdmin'
})
export class IsAdminPipe implements PipeTransform {
  transform(value: boolean, args?: any): any {
    if (value) {
      return 'Admin';
    } else {
      return 'Nem Admin';
    }
  }
}
