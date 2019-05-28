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
}
