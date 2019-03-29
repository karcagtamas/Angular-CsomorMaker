import { Event } from 'src/app/models/event.model';
import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../services/generator.service';
import { MatDialog } from '@angular/material';
import { NewGeneratorModalComponent } from '../components/new-generator-modal/new-generator-modal.component';
import { isUndefined } from 'util';
import { NewWorkerModalComponent } from '../components/new-worker-modal/new-worker-modal.component';
import { Generator } from './../models/generator.model';
import { Work } from '../models/work.model';
import { WorkTable } from '../models/work.table.model';
import { Worker } from '../models/worker.model';
import { WorkerTable } from '../models/worker.table.model';

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
        const worker: Worker = result;
        if (!generator.workers) {
          generator.workers = [];
        }
        worker.table = [];
        for (let i = 0; i < generator.length; i++) {
          const table = new WorkerTable();
          table.id = Math.floor((i + generator.start) / 24) + '-' + ((i + generator.start) % 24);
          table.avaiable = true;
          table.work = '';
          worker.table.push(table);
        }
        generator.workers.push(worker);
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
        const work: Work = result;
        if (!generator.works) {
          generator.works = [];
        }
        work.table = [];
        for (let i = 0; i < generator.length; i++) {
          const table = new WorkTable();
          table.id = Math.floor((i + generator.start) / 24) + '-' + ((i + generator.start) % 24);
          table.worker = '';
          work.table.push(table);
        }
        generator.works.push(work);
        this.generatorservice.newGenerator(generator.eventId, generator);
      }
    });
  }

  deleteWork(generator: Generator, work: string) {
    generator.works = generator.works.filter(x => x.name !== work);
    this.generatorservice.newGenerator(generator.eventId, generator);
  }

  deleteWorker(generator: Generator, worker: string) {
    generator.workers = generator.workers.filter(x => x.name !== worker);
    this.generatorservice.newGenerator(generator.eventId, generator);
  }
  generate(event: Event) {
    this.generatorservice.newGenerator(event.generator.eventId, event.generator);
  }
}
