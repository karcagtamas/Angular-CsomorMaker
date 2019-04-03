import { WorkExportComponent } from './../components/work-export/work-export.component';
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
import { NewWorkModalComponent } from '../components/new-work-modal/new-work-modal.component';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  Events: Event[] = null;
  EventsWithGenerator: Event[] = null;
  alert = '';
  success = '';
  selectedExport = 1;

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

  newGenerator(): void {
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
        result.ready = true;
        this.generatorservice.newGenerator(result.eventId, result);
      }
    });
  }

  newWorker(generator: Generator): void {
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
          generator.ready = false;
          this.generatorservice.newGenerator(generator.eventId, generator);
        }
      }
    });
  }

  newWork(generator: Generator): void {
    const dialogRef = this.dialog.open(NewWorkModalComponent, {
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
          generator.ready = false;
          this.generatorservice.newGenerator(generator.eventId, generator);
        }
      }
    });
  }

  deleteWork(generator: Generator, work: string): void {
    generator.works = generator.works.filter(x => x.name !== work);
    generator.ready = false;
    this.generatorservice.newGenerator(generator.eventId, generator);
  }

  deleteWorker(generator: Generator, worker: string): void {
    generator.workers = generator.workers.filter(x => x.name !== worker);
    generator.ready = false;
    this.generatorservice.newGenerator(generator.eventId, generator);
  }

  generateTableId(start: number, param: number): string {
    return Math.floor((param + start) / 24) + '-' + ((param + start) % 24);
  }

  generate(event: Event): void {
    if (this.checkInput(event)) {
      let stop = true; // Leállító segéd változó
      const limit = 500; // Meddig pörögjön a ciklus míg fel nem adja
      this.setWorkers(event.generator); // Beállítja a Humánokat
      this.setWorks(event.generator); // Beállíva a Posztokat

      let index = 0;

      // For ciklus az esemény órái alapján (sorok)
      for (let i = 0; i < event.generator.length && stop; i++) {
        const tableId = this.generateTableId(event.generator.start, i); // Az adott sor és oszlop meghatározó Id-ja

        // Posztok az adott soron (oszlopok)
        for (let j = 0; j < event.generator.works.length && stop; j++) {
          let worker: Worker;
          let count = 0; // Segéd változó (stop)
          do {
            // Random humán lementése
            index = Math.floor(Math.random() * event.generator.workers.length);
            worker = event.generator.workers[index];
            count++;
            /* console.log(count); */

            // Ha már több mint 100-stor lefutott, akkor próbája meg kicserélgetni régebbi emberrekkel, akik tudnának jönni
            if (count >= 100) {
              const newindex = Math.floor(Math.random() * event.generator.workers.length); // Új humány indexe
              const newworker = event.generator.workers[newindex]; // Új humán
              /*               const newTableIdIndex = Math.floor(Math.random() * newworker.table.length); // Új tábla azonosító indexe
              const newTableId = newworker.table[newTableIdIndex].id; */

              const param = Math.floor(Math.random() * event.generator.length); // Véletlen paraméter az azonosítóhoz
              const newTableId = this.generateTableId(event.generator.start, param); // Új tábla azonosító

              /* console.log('régiId', tableId);
              console.log('régiElérhető', worker.table.find(x => x.id === newTableId).avaiable);
              console.log('régiMunka', worker.table.find(x => x.id === newTableId).avaiable);
              console.log('újId', newTableId);
              console.log('újElérhető', newworker.table.find(x => x.id === tableId).avaiable);
              console.log('újMunka', newworker.table.find(x => x.id === tableId).work); */

              const newWorkerTableElement = newworker.table.find(x => x.id === tableId); // Új humán a régi helyen
              const workerTableNewElement = worker.table.find(x => x.id === newTableId); // Régi humán az új helyen

              // Ha az új humán megfelelő a régi helyen és a régi humán megfelelő
              if (
                newWorkerTableElement.avaiable &&
                !newWorkerTableElement.work &&
                worker.workerHours !== 0 &&
                workerTableNewElement.avaiable &&
                !workerTableNewElement.work &&
                newTableId !== tableId
              ) {
                const addedWorkName = newworker.table.find(x => x.id === newTableId).work; // Hozzáadandő poszt neve

                /*   console.log('Hozzáadott név', addedWorkName); */

                workerTableNewElement.work = addedWorkName; // A régi humán új helyére mentjük a posztot
                // Ha a poszt név nem üres, akkor csökkentjük az óra számot
                if (addedWorkName) {
                  worker.workerHours--;
                }

                newworker.table.find(x => x.id === newTableId).work = ''; // Az új humán új helyén lévő posztot üresre álllítjuk
                newworker.workerHours++; // Az új humán óráit növeljük

                // Ha a poszt név nem üres, akkor belerakjuk az új eredményt a poszt táblájába
                if (addedWorkName) {
                  event.generator.works
                    .find(x => x.name === addedWorkName)
                    .table.find(x => x.id === newTableId).worker = worker.name;
                }

                // A régi humánra rá állítja az új humánt
                worker = newworker;
              }
            }
          } while (
            (worker.workerHours === 0 ||
              !worker.table.find(x => x.id === tableId).avaiable ||
              worker.table.find(x => x.id === tableId).work) &&
            count < limit
          );
          if (count < limit) {
            event.generator.works[j].table.find(x => x.id === tableId).worker = worker.name;
            worker.workerHours--;
            worker.table.find(x => x.id === tableId).work = event.generator.works[j].name;
          } else {
            stop = false;
          }
        }
      }
      if (!stop) {
        this.setAlert('Nincs generálási eredmény! Próbálja újra!', false);
      }
      /* console.log('Works', event.generator.works);
      console.log('Workers', event.generator.workers); */
      event.generator.ready = true;
      this.generatorservice.newGenerator(event.eventId, event.generator);
      this.setAlert('Sikeres generálás!', true);
    }
  }

  setWorkers(generator: Generator): void {
    for (const i of generator.workers) {
      i.workerHours = 0;
      for (const j of i.table) {
        j.work = '';
      }
    }
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

  setWorks(generator: Generator): void {
    for (const i of generator.works) {
      for (const k of i.table) {
        k.worker = '';
      }
    }
  }

  avaiableHours(worker: Worker): number {
    let count = 0;
    worker.table.forEach(i => {
      if (i.avaiable) {
        count++;
      }
    });
    return count;
  }

  checkInput(event: Event): boolean {
    if (this.checkEmptyPersons(event.generator.workers)) {
      this.setAlert('Nem maradhat üres ember! Akkor inkább töröld ki!', false);
      return false;
    }
    const hours = event.generator.length * event.generator.works.length;
    if (!this.checkSum(event.generator.workers, hours)) {
      this.setAlert('Az megadott óraszám, sehogy sem osztható be a kivánt csömörre!', false);
      return false;
    }
    if (!this.checkHours(event.generator)) {
      this.setAlert('Van olyan óra amikor nem jut mindehová ember!', false);
      return false;
    }
    if (!this.checkWorks(event.generator)) {
      this.setAlert('Több poszt van mint humán!', false);
      return false;
    }
    return true;
  }

  checkEmptyPersons(workers: Worker[]): boolean {
    for (const i of workers) {
      const count = this.avaiableHours(i);
      if (count === 0) {
        return true;
      }
    }
    return false;
  }

  checkSum(workers: Worker[], hours: number): boolean {
    let sum = 0;
    for (const i of workers) {
      sum += this.avaiableHours(i);
    }
    if (sum < hours) {
      return false;
    }
    return true;
  }

  checkHours(generator: Generator): boolean {
    for (let i = 0; i < generator.length; i++) {
      const tableId = Math.floor((i + generator.start) / 24) + '-' + ((i + generator.start) % 24);
      let count = 0;
      const min = generator.works.length;
      for (const k of generator.workers) {
        if (k.table.find(x => x.id === tableId).avaiable) {
          count++;
        }
      }
      if (count < min) {
        return false;
      }
    }
    return true;
  }

  checkWorks(generator: Generator): boolean {
    if (generator.workers.length < generator.works.length) {
      return false;
    }
    return true;
  }

  setAlert(alert: string, isSuccess: boolean): void {
    if (isSuccess) {
      this.success = alert;
      setTimeout(() => (this.success = ''), 2000);
    } else {
      this.alert = alert;
      setTimeout(() => (this.alert = ''), 2000);
    }
  }
}
