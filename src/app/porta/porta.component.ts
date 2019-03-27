import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { PortaService } from '../services/porta.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewEventModalComponent } from '../components/new-event-modal/new-event-modal.component';

@Component({
  selector: 'app-porta',
  templateUrl: './porta.component.html',
  styleUrls: ['./porta.component.css']
})
export class PortaComponent implements OnInit {
  Events: Event[] = null;
  constructor(private portaservice: PortaService, public dialog: MatDialog) {}

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

  incrementVisitors(event: string, value: number) {
    this.portaservice.setVisitor(event, value + 1);
  }

  decrementVisitors(event: string, value: number) {
    if (value !== 0) {
      this.portaservice.setVisitor(event, value - 1);
    }
  }

  incrementInjured(event: string, value: number) {
    this.portaservice.setInjured(event, value + 1);
  }

  decrementInjured(event: string, value: number) {
    if (value !== 0) {
      this.portaservice.setInjured(event, value - 1);
    }
  }

  deleteEvent(event: string) {
    this.portaservice.deleteEvent(event);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewEventModalComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.portaservice.addEvent(result);
    });
  }
}
