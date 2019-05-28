import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  events: Event[] = [];
  selectedIndex = -1;
  summaryOfPlayers = 0;
  summaryOfDeposits = 0;
  summaryOfVisitors = 0;
  summary = 0;

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
        this.change();
      }
    });
  }

  change() {
    if (this.selectedIndex !== -1) {
      this.summaryOfPlayers = this.getSummaryOfPlayers();
      this.summaryOfDeposits = this.getSummaryOfDeposits();
      this.summaryOfVisitors = this.getSummaryOfVisitors();
      this.summary = this.getSummary();
    }
  }

  getSummaryOfPlayers() {
    return this.events[this.selectedIndex].currentPlayers * this.events[this.selectedIndex].playerCost;
  }

  getSummaryOfVisitors() {
    return this.events[this.selectedIndex].visitors * this.events[this.selectedIndex].visitorCost;
  }

  getSummaryOfDeposits() {
    return this.events[this.selectedIndex].currentPlayers * this.events[this.selectedIndex].playerDeposit;
  }

  getSummary() {
    const inputs = this.getSummaryOfPlayers() + this.getSummaryOfVisitors();
    let outputs = 0;
    for (const i of this.events[this.selectedIndex].payOuts) {
      outputs += i.cost;
    }
    return inputs - outputs;
  }
}
