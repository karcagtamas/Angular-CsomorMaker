import { GeneratorService } from './../../services/generator.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  events: Event[] = [];
  selectedIndex = -1;

  constructor(private generatorservice: GeneratorService) {}

  ngOnInit() {
    this.generatorservice.getEvents().subscribe(data => {
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
