import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-generator-results',
  templateUrl: './generator-results.component.html',
  styleUrls: ['./generator-results.component.css']
})
export class GeneratorResultsComponent implements OnInit {
  events: Event[] = [];
  eventWithGenerator: Event[] = [];
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
      this.eventWithGenerator = this.events.filter(x => x.generator);
      if (this.eventWithGenerator.length > 0) {
        this.selectedIndex = 0;
      }
    });
  }
}
