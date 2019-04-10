import { ActiveWork } from './../models/ignore.model';
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
import { LoginService } from '../services/login.service';

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
  isAdmin = false;

  constructor(
    private generatorservice: GeneratorService,
    public dialog: MatDialog,
    private loginservice: LoginService
  ) {}

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
    this.getIsAdmin();
  }

  getIsAdmin() {
    this.loginservice
      .isAdmin()
      .then(res => {
        if (res) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      })
      .catch(() => (this.isAdmin = false));
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
          worker.activeWorks = [];
          for (const i of generator.works) {
            const act = new ActiveWork();
            act.work = i.name;
            act.active = true;
            worker.activeWorks.push(act);
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
            table.isActive = true;
            table.worker = '';
            work.table.push(table);
          }
          generator.works.push(work);
          for (const i of generator.workers) {
            const act = new ActiveWork();
            act.work = work.name;
            act.active = true;
            i.activeWorks.push(act);
          }
          generator.ready = false;
          this.generatorservice.newGenerator(generator.eventId, generator);
        }
      }
    });
  }

  deleteWork(generator: Generator, work: string): void {
    generator.works = generator.works.filter(x => x.name !== work);
    for (const i of generator.workers) {
      i.activeWorks = i.activeWorks.filter(x => x.work !== work);
    }
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
          if (event.generator.works[j].table.find(x => x.id === tableId).isActive) {
            let worker: Worker;
            let count = 0; // Segéd változó (stop)
            do {
              // Random humán lementése
              index = Math.floor(Math.random() * event.generator.workers.length);
              worker = event.generator.workers[index];
              count++;

              // Ha már több mint 100-stor lefutott, akkor próbája meg kicserélgetni régebbi emberrekkel, akik tudnának jönni
              if (count >= 100) {
                const newindex = Math.floor(Math.random() * event.generator.workers.length); // Új humány indexe
                const newworker = event.generator.workers[newindex]; // Új humán
                /*               const newTableIdIndex = Math.floor(Math.random() * newworker.table.length); // Új tábla azonosító indexe
              const newTableId = newworker.table[newTableIdIndex].id; */

                const param = Math.floor(Math.random() * event.generator.length); // Véletlen paraméter az azonosítóhoz
                const newTableId = this.generateTableId(event.generator.start, param); // Új tábla azonosító

                const newWorkerTableElement = newworker.table.find(x => x.id === tableId); // Új humán a régi helyen
                const workerTableNewElement = worker.table.find(x => x.id === newTableId); // Régi humán az új helyen
                const addedWorkName = newworker.table.find(x => x.id === newTableId).work;
                const addedWork = event.generator.works.find(x => x.name === addedWorkName);
                // Ha az új humán megfelelő a régi helyen és a régi humán megfelelő
                if (
                  newWorkerTableElement.avaiable &&
                  !newWorkerTableElement.work &&
                  this.workerIsValid(worker, newTableId, addedWork) &&
                  newTableId !== tableId
                ) {
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
            } while (!this.workerIsValid(worker, tableId, event.generator.works[j]) && count < limit);
            if (count < limit) {
              event.generator.works[j].table.find(x => x.id === tableId).worker = worker.name;
              worker.workerHours--;
              worker.table.find(x => x.id === tableId).work = event.generator.works[j].name;
            } else {
              stop = false;
            }
          }
        }
      }
      if (!stop) {
        this.setAlert('Nincs generálási eredmény! Próbálja újra!', false);
      }
      event.generator.ready = true;
      this.generatorservice.newGenerator(event.eventId, event.generator);
      this.setAlert('Sikeres generálás!', true);
    }
  }

  workerIsValid(worker: Worker, tableId: string, work?: Work) {
    if (worker.workerHours === 0) {
      return false;
    }
    const workerElement: WorkerTable = worker.table.find(x => x.id === tableId);
    if (!workerElement.avaiable) {
      return false;
    }
    if (workerElement.work) {
      return false;
    }
    if (work) {
      if (!worker.activeWorks.find(x => x.work === work.name).active) {
        return false;
      }
    }
    if (this.checkPast(worker, tableId)) {
      return false;
    }
    return true;
  }

  checkPast(worker: Worker, tableid: string) {
    const index = worker.table.findIndex(x => x.id === tableid);
    if (index < 3) {
      return false;
    }
    if (worker.table[index - 1].work && worker.table[index - 2].work && worker.table[index - 3].work) {
      return true;
    }
    return false;
  }

  setWorkers(generator: Generator): void {
    for (const i of generator.workers) {
      i.workerHours = 0;
      for (const j of i.table) {
        j.work = '';
      }
    }
    let hours = this.getAllActiveHour(generator.works);
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

  activeHours(work: Work): number {
    let count = 0;
    for (const i of work.table) {
      if (i.isActive) {
        count++;
      }
    }
    return count;
  }

  getAllActiveHour(works: Work[]): number {
    let sum = 0;
    for (const i of works) {
      sum += this.activeHours(i);
    }
    return sum;
  }

  checkInput(event: Event): boolean {
    if (this.checkEmptyPersons(event.generator.workers)) {
      this.setAlert('Nem maradhat üres ember! Akkor inkább töröld ki!', false);
      return false;
    }
    if (this.checkEmptyWorks(event.generator.works)) {
      this.setAlert('Nem maradhat üres poszt! Akkor inkább töröld ki!', false);
      return false;
    }
    // const hours = event.generator.length * event.generator.works.length;
    const hours = this.getAllActiveHour(event.generator.works);
    if (!this.checkSum(event.generator.workers, hours)) {
      this.setAlert('Az megadott óraszám, sehogy sem osztható be a kivánt csömörre!', false);
      return false;
    }
    if (!this.checkHours(event.generator)) {
      this.setAlert('Van olyan óra amikor nem jut mindehová ember!', false);
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

  checkEmptyWorks(works: Work[]): boolean {
    for (const i of works) {
      const count = this.activeHours(i);
      if (count === 0) {
        return true;
      }
    }
    return false;
  }

  checkSum(workers: Worker[], hours: number): boolean {
    let sum = 0;
    for (const i of workers) {
      sum += (this.avaiableHours(i) * 3) / 4;
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
      let min = 0;
      for (const k of generator.works) {
        if (k.table.find(x => x.id === tableId).isActive) {
          min++;
        }
      }
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
