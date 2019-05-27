import { GeneratorService } from './../../services/generator.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-generator-results',
  templateUrl: './generator-results.component.html',
  styleUrls: ['./generator-results.component.css']
})
export class GeneratorResultsComponent implements OnInit {
  events: Event[] = [];
  eventWithGenerator: Event[] = [];
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
      this.eventWithGenerator = this.events.filter(x => x.generator);
      if (this.eventWithGenerator.length > 0) {
        this.selectedIndex = 0;
      }
    });
  }
}
