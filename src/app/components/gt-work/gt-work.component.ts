import { GTWork } from './../../models/gt.work.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GTWorker } from 'src/app/models/gt.worker.model';
import { isNumber } from 'util';

@Component({
  selector: 'app-gt-work',
  templateUrl: './gt-work.component.html',
  styleUrls: ['./gt-work.component.css']
})
export class GtWorkComponent implements OnInit {
  @Input() work: GTWork;
  @Input() workers: GTWorker[];
  @Input() days: number;
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter();
  modifiedWork: GTWork = null;
  onModify = false;
  selectedWorker = -1;
  modifyAlert = '';
  modifySuccess = false;

  constructor() {}

  ngOnInit() {
    this.workers = this.workers.filter(x => x.isWorker);
  }

  deleteBoss(name: string) {
    this.modifiedWork.bosses = this.modifiedWork.bosses.filter(x => x !== name);
  }

  addBoss() {
    const bossName = this.workers[this.selectedWorker].name;
    if (!this.modifiedWork.bosses.find(x => x === bossName)) {
      this.modifiedWork.bosses.push(bossName);
    }
  }

  modify() {
    this.onModify = true;
    this.modifiedWork = { ...this.work };
  }

  saveModify() {
    if (this.modifiedWork.bosses.length === 0) {
      this.setAlert('A főnökök száma nem megfelelő!');
    } else if (!isNumber(this.modifiedWork.day)) {
      this.setAlert('A nap mező kitöltése kötelező!');
    } else if (this.modifiedWork.day > this.days) {
      this.setAlert('A nap számnak a tábor határain belül kell szerepelnie!');
    } else if (this.modifiedWork.day <= 0) {
      this.setAlert('A nap számnak nagyobbnak kell lennie mint 0!');
    } else if (!isNumber(this.modifiedWork.startHour)) {
      this.setAlert('A kezdeti óra kitöltése kötelező!');
    } else if (!isNumber(this.modifiedWork.endHour)) {
      this.setAlert('A vége óra kitöltése kötelező!');
    } else if (this.modifiedWork.startHour >= this.modifiedWork.endHour) {
      this.setAlert('A kezdeti óra nem lehet egyben vagy utána a vége órának!');
    } else if (!isNumber(this.modifiedWork.workerCount)) {
      this.setAlert('A humán szám kitöltése kötelező!');
    } else if (this.modifiedWork.workerCount < 0) {
      this.setAlert('A darabszának minimum 0-nak kell lennie.');
    } else {
      this.modifySuccess = true;
      setTimeout(() => {
        this.modifySuccess = false;
      }, 3000);

      for (const i of this.work.bosses) {
        this.workers.find(x => x.name === i).activeWorks.find(y => y.work === this.work.name).active = true;
      }
      for (const i of this.modifiedWork.bosses) {
        this.workers.find(x => x.name === i).activeWorks.find(y => y.work === this.work.name).active = false;
      }

      this.work.bosses = [...this.modifiedWork.bosses];
      this.work.day = this.modifiedWork.day;
      this.work.startHour = this.modifiedWork.startHour;
      this.work.endHour = this.modifiedWork.endHour;
      this.work.workerCount = this.modifiedWork.workerCount;
      this.work.isBig = this.work.endHour - this.work.startHour > 6;
      this.save.emit();
      this.onModify = false;
    }
  }

  setAlert(value: string) {
    this.modifyAlert = value;
    setTimeout(() => {
      this.modifyAlert = '';
    }, 3000);
  }

  deleteWork() {
    this.delete.emit(this.work.name);
  }
}
