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
