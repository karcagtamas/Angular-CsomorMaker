import { GTWork } from './../models/gt.work.model';
import { ActiveWork } from './../models/ignore.model';
import { GT } from './../models/gt.model';
import { Component, OnInit } from '@angular/core';
import { GtService } from '../services/gt.service';
import { GTWorker } from '../models/gt.worker.model';
import { WorkerTable } from '../models/worker.table.model';
import { GTWorkerTable } from '../models/gt.worker.table.model';

@Component({
  selector: 'app-gt',
  templateUrl: './gt.component.html',
  styleUrls: ['./gt.component.css']
})
export class GtComponent implements OnInit {
  newWork = '';
  newWorker = '';
  gts: GT[] = [];
  selectedGt = 0;
  gt: GT = null;
  modifiedGt: GT = null;
  gtIsOnModify = false;
  modifyAlert = '';
  workAlert = '';
  workerAlert = '';
  modifyIsSuccess = false;

  constructor(public gtservice: GtService) {}

  ngOnInit() {
    this.gtservice.getGts().subscribe(data => {
      this.gts = data.map(x => {
        return {
          gtId: x.payload.doc.id,
          ...x.payload.doc.data()
        } as GT;
      });
      if (this.gts.length > 0) {
        this.gt = this.gts[0];
      }
    });
  }

  changeGt() {
    this.gt = this.gts[this.selectedGt];
  }

  resetGt() {
    const year = this.gt.year;
    const id = this.gt.gtId;
    this.gt = new GT();
    this.gt.year = year;
    this.gt.gtId = id;
    console.log(this.gt);
    this.saveGtModify();
    this.changeGt();
  }

  newGt() {
    const year = new Date().getFullYear();
    if (!this.gts.find(x => x.year === year)) {
      const g = new GT();
      g.year = year;
      this.gtservice.newGt(g);
      this.selectedGt = 0;
      this.changeGt();
      window.alert('A gólyatábor sikeresen létrehozva!');
    } else {
      window.alert('Idénre már van gólyatábor!');
    }
  }

  modifyGt() {
    this.gtIsOnModify = true;
    this.modifiedGt = { ...this.gt };
  }

  saveModify() {
    if (this.modifiedGt.year && this.modifiedGt.year < 2000) {
      this.modifyAlert = 'Nem megfelelő évszám!';
    } else if (this.modifiedGt.days && this.modifiedGt.days <= 0) {
      this.modifyAlert = 'Nem megfelelő nap szám!';
    } else if (this.modifiedGt.year !== this.gt.year && this.gts.find(x => x.year === this.modifiedGt.year)) {
      this.modifyAlert = 'Már létezik ez az év!';
    } else {
      this.modifyAlert = '';
      this.gt = this.modifiedGt;
      this.saveGtModify();
      this.gtIsOnModify = false;
      this.modifyIsSuccess = true;
      setTimeout(() => (this.modifyIsSuccess = false), 3000);
    }
  }

  saveWork(work: string) {
    if (!work) {
      this.workAlert = 'A mező kitöltése kötelező!';
    } else if (this.gt.works && this.gt.works.find(x => x.name === work)) {
      this.workAlert = 'A mező név már szerepel a halmazba!';
    } else {
      const w = new GTWork();
      w.name = work;
      for (const i of this.gt.workers) {
        const active = new ActiveWork();
        active.active = true;
        active.work = work;
        i.activeWorks.push(active);
      }
      if (!this.gt.works) {
        this.gt.works = [];
      }
      this.workAlert = '';
      this.gt.works.push(w);
      this.newWork = '';
      this.saveGtModify();
      setTimeout(() => this.changeGt(), 100);
    }
  }

  deleteWork(event) {
    this.gt.works = this.gt.works.filter(x => x.name !== event);
    for (const i of this.gt.workers) {
      i.activeWorks = i.activeWorks.filter(x => x.work !== event);
    }
    this.saveGtModify();
  }

  /*   saveWorkModify(work: GTWork) {
    const workIndex = this.gt.works.findIndex(x => x.name === work.name);
    this.gt.works[workIndex] = work;
    this.saveGtModify();
  } */

  saveGtModify() {
    console.log(this.gt);
    this.gtservice.saveGt(this.gt);
  }

  saveWorker(worker: string) {
    if (!worker) {
      this.workerAlert = 'A mező kitöltése kötelező!';
    } else if (this.gt.workers && this.gt.workers.find(x => x.name === worker)) {
      this.workAlert = 'A dolgozó név már szerepel a halmazban!';
    } else {
      const w = new GTWorker();
      w.name = worker;
      for (const i of this.gt.works) {
        const active = new ActiveWork();
        active.active = true;
        active.work = i.name;
        w.activeWorks.push(active);
      }
      if (!this.gt.workers) {
        this.gt.workers = [];
      }
      this.workerAlert = '';
      this.gt.workers.push(w);
      this.newWorker = '';
      this.saveGtModify();
      setTimeout(() => this.changeGt(), 100);
    }
  }

  deleteWorker(name: string) {
    this.gt.workers = this.gt.workers.filter(x => x.name !== name);
    for (const i of this.gt.works) {
      i.bosses = i.bosses.filter(x => x !== name);
    }
    this.saveGtModify();
  }

  gen() {
    if (this.checkGen()) {
      this.setWorks();
      for (let i = 0; i < this.gt.works.length; i++) {
        let work = this.gt.works[i];
        let count = 0;
        do {
          let index;
          do {
            index = Math.floor(Math.random() * this.gt.workers.length);
          } while (!this.gt.workers[index].isWorker);
          const worker = this.gt.workers[index];
          if (
            !worker.works.find(x => x.day === work.day && x.hour === work.startHour) &&
            worker.activeWorks.find(x => x.work === work.name && x.active)
          ) {
            work.workers.push(worker.name);
            count++;
            for (let hour = work.startHour; hour <= work.endHour; hour++) {
              const workerTable = new GTWorkerTable();
              workerTable.day = work.day;
              workerTable.hour = hour;
              workerTable.work = work.name;
              worker.works.push(workerTable);
            }
          }
        } while (count < work.workerCount);
      }
      console.log(this.gt.workers);
    }
  }

  checkGen(): boolean {
    if (!this.checkWorkNeeded()) {
      return false;
    }
    return true;
  }

  checkWorkNeeded() {
    for (const i of this.gt.works) {
      const workers = this.workersCount(i.name);
      if (i.workerCount > workers) {
        return false;
      }
    }
    return true;
  }

  setWorks() {
    for (const i of this.gt.workers) {
      i.countOfBigWorks = 0;
      i.countOfSmallWorks = 0;
      i.works = [];
    }
    for (const i of this.gt.works) {
      i.workers = [];
    }
    const countOfBigs = this.countOfBigWorks();
    let index = 0;
    for (let i = 0; i < countOfBigs; i++) {
      if (this.gt.workers[index].isWorker) {
        this.gt.workers[index].countOfBigWorks++;
      }
      index++;
      if (index === this.gt.workers.length) {
        index = 0;
      }
    }
    const countOfSmalls = this.countOfSmallWorks();
    index = this.gt.workers.length - 1;
    for (let i = 0; i < countOfSmalls; i++) {
      if (this.gt.workers[index].isWorker) {
        this.gt.workers[index].countOfSmallWorks++;
      }
      index--;
      if (index === -1) {
        index = this.gt.workers.length - 1;
      }
    }
  }

  countOfBigWorks(): number {
    let count = 0;
    for (const i of this.gt.works) {
      if (i.isBig) {
        count += i.workerCount;
      }
    }
    return count;
  }
  countOfSmallWorks(): number {
    let count = 0;
    for (const i of this.gt.works) {
      if (!i.isBig) {
        count += i.workerCount;
      }
    }
    return count;
  }
  workersCount(work?: string): number {
    let count = 0;
    for (const i of this.gt.workers) {
      if (work) {
        if (i.isWorker && i.activeWorks.find(x => x.work === work && x.active)) {
          count++;
        }
      } else {
        if (i.isWorker) {
          count++;
        }
      }
    }
    return count;
  }
}
