import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-pay-outs',
  templateUrl: './pay-outs.component.html',
  styleUrls: ['./pay-outs.component.css']
})
export class PayOutsComponent implements OnInit {
  events: Event[] = [];
  selectedIndex = -1;
  addNew = false;
  alert = '';

  constructor(private eventservice: EventService) {}

  ngOnInit() {
    this.eventservice.getEvents().subscribe(data => {
      this.events = data.map(e => {
        return {
          eventId: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event;
      });
      if (this.events.length > 0) {
        this.selectedIndex = 0;
      }
    });
  }

  savePayOut(event) {
    const payOuts = [...this.events[this.selectedIndex].payOuts];
    payOuts.push(event.payOut);
    this.eventservice.savePayout(this.events[this.selectedIndex].eventId, payOuts).then(() => {
      this.setAlert('A pénz mozgás sikeresen hozzáadva!');
    });
  }

  deletePayOut(index: number) {
    const payOut = this.events[this.selectedIndex].payOuts[index];
    let payOuts = this.events[this.selectedIndex].payOuts;
    payOuts = payOuts.filter(x => x !== payOut);
    this.eventservice.savePayout(this.events[this.selectedIndex].eventId, payOuts).then(() => {
      this.setAlert('A pénz mozgás sikeresen törölve!');
    });
  }

  setAlert(value: string) {
    this.alert = value;
    setTimeout(() => {
      this.alert = '';
    }, 1500);
  }
}
