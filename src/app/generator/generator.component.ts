import { Event } from 'src/app/models/event.model';
import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../services/generator.service';
import { MatDialog } from '@angular/material';
import { NewGeneratorModalComponent } from '../components/new-generator-modal/new-generator-modal.component';
import { isUndefined } from 'util';
import { NewWorkerModalComponent } from '../components/new-worker-modal/new-worker-modal.component';
import { Generator } from './../models/generator.model';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  Events: Event[] = null;
  EventsWithGenerator: Event[] = null;
  constructor(private generatorservice: GeneratorService, public dialog: MatDialog) {}

  ngOnInit() {
    this.generatorservice.getEvents().subscribe(data => {
      this.Events = data.map(e => {
        return {
          eventId: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event;
      });
      this.EventsWithGenerator = this.Events.filter(x => x.generator);
    });
  }

  newGenerator(event: string) {
    const dialogRef = this.dialog.open(NewGeneratorModalComponent, {
      width: '300px',
      data: this.Events
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        result.length = result.end - result.start + result.days * 24;
        result.start = +result.start;
        result.end = +result.end;
        result.days = +result.days;
        this.generatorservice.newGenerator(result.eventId, result);
      }
    });
  }

  newWorker(generator: Generator) {
    const dialogRef = this.dialog.open(NewWorkerModalComponent, {
      width: '300px',
      data: this.Events
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        if (!generator.workers) {
          generator.workers = [];
        }
        generator.workers.push(result);
        this.generatorservice.newGenerator(generator.eventId, generator);
      }
    });
  }

  newWork(generator: Generator) {
    const dialogRef = this.dialog.open(NewWorkerModalComponent, {
      width: '300px',
      data: this.Events
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        if (!generator.works) {
          generator.works = [];
        }
        generator.works.push(result);
        this.generatorservice.newGenerator(generator.eventId, generator);
      }
    });
  }
}
