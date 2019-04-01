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

  newGenerator() {
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
        if (isUndefined(generator.workers.find(x => x.name === worker.name))) {
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
        if (isUndefined(generator.works.find(x => x.name === work.name))) {
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
    window.alert('A generálás sikeres! :D Vagy nem?');
    const fullCount: number = event.generator.works.length * event.generator.length;
    this.setWorkers(event.generator);
    console.log(event.generator.workers);
    let index = 0;

    for (let i = 0; i < event.generator.length; i++) {
      const tableId = Math.floor((i + event.generator.start) / 24) + '-' + ((i + event.generator.start) % 24);
      for (let j = 0; j < event.generator.works.length; j++) {
        let worker: Worker;
        let count = 0;
        do {
          index = Math.floor(Math.random() * event.generator.workers.length);
          worker = event.generator.workers[index];
          // console.log(worker);
          count++;
          console.log(count);
          if (count >= 100) {
            const newindex = Math.floor(Math.random() * event.generator.workers.length);
            const newworker = event.generator.workers[newindex];
            const newTableIdIndex = Math.floor(Math.random() * newworker.table.length);
            const newTableId = newworker.table[newTableIdIndex].id;
            console.log('Régi', { ...worker });
            console.log('Új', { ...newworker });
            console.log('régiId', tableId);
            console.log('újId', newTableId);

            if (
              newworker.table.find(x => x.id === tableId).avaiable &&
              !newworker.table.find(x => x.id === tableId).work &&
              worker.workerHours !== 0 &&
              worker.table.find(x => x.id === newTableId).avaiable &&
              !worker.table.find(x => x.id === newTableId).work
            ) {
              console.log('asdasdasd');
              worker.table.find(x => x.id === newTableId).work = newworker.table.find(x => x.id === newTableId).work;
              worker.workerHours--;
              newworker.table.find(x => x.id === newTableId).work = '';
              newworker.workerHours++;
              worker = newworker;
            }
          }
        } while (
          (worker.workerHours === 0 ||
            !worker.table.find(x => x.id === tableId).avaiable ||
            worker.table.find(x => x.id === tableId).work) &&
          count < 250
        );
        if (count < 250) {
          event.generator.works[j].table.find(x => x.id === tableId).worker = worker.name;
          worker.workerHours--;
          worker.table.find(x => x.id === tableId).work = event.generator.works[j].name;
        }
      }
    }
    console.log('Works', event.generator.works);
    console.log('Workers', event.generator.workers);
    this.generatorservice.newGenerator(event.eventId, event.generator);
  }

  setWorkers(generator: Generator) {
    for (const i of generator.workers) {
      i.workerHours = 0;
      for (const j of i.table) {
        j.work = '';
      }
    }
    console.log(generator);
    let hours = generator.length * generator.works.length;
    let index = 0;
    do {
      if (generator.workers[index].workerHours < this.avaiableHours(generator.workers[index])) {
        generator.workers[index].workerHours++;
        hours--;
      }
      index++;
      if (index === generator.workers.length) {
        index = 0;
      }
    } while (hours > 0);
  }

  avaiableHours(worker: Worker) {
    let count = 0;
    worker.table.forEach(i => {
      if (i.avaiable) {
        count++;
      }
    });
    return count;
  }
}
