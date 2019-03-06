import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { PortaService } from '../services/porta.service';

@Component({
  selector: 'app-porta',
  templateUrl: './porta.component.html',
  styleUrls: ['./porta.component.css']
})
export class PortaComponent implements OnInit {
  Events: Event[] = null;
  constructor(private portaservice: PortaService) {}

  ngOnInit() {
    this.portaservice.getEvents().subscribe(data => {
      this.Events = data.map(e => {
        return {
          eventId: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event;
      });
      console.log(this.Events);
    });
  }
}
