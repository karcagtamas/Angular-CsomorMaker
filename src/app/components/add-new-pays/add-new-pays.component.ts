import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PayOut } from 'src/app/models/payouts.model';

@Component({
  selector: 'app-add-new-pays',
  templateUrl: './add-new-pays.component.html',
  styleUrls: ['./add-new-pays.component.css']
})
export class AddNewPaysComponent implements OnInit {
  payOut: PayOut = new PayOut();
  @Output() saveNewPayOut = new EventEmitter();
  alert = '';
  constructor() {}

  ngOnInit() {}

  save() {
    if (this.payOut.name.length === 0) {
      this.setAlert('Nem megfelelő név!');
    } else if (this.payOut.from.length === 0) {
      this.setAlert('Nem megfelelő kifizető!');
    } else if (this.payOut.to.length === 0) {
      this.setAlert('Nem megfelelő kedvezményzett!');
    } else if (this.payOut.cost < 0) {
      this.setAlert('Nem megfelelő összeg!');
    } else if (this.payOut.type !== 'input' && this.payOut.type !== 'output') {
      this.setAlert('Nem megfelelő típus!');
    } else {
      this.saveNewPayOut.emit({ payOut: this.payOut });
      this.payOut = new PayOut();
    }
  }

  setAlert(value: string) {
    this.alert = value;
    setTimeout(() => {
      this.alert = '';
    }, 1500);
  }
}
