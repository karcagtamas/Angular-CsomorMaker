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
    } else if (!this.modifiedWork.day || !isNumber(this.modifiedWork.day)) {
      this.setAlert('A nap mező kitöltése kötelező!');
    } else if (!this.modifiedWork.startHour || !isNumber(this.modifiedWork.startHour)) {
      this.setAlert('A kezdeti óra kitöltése kötelező!');
    } else if (!this.modifiedWork.endHour || !isNumber(this.modifiedWork.endHour)) {
      this.setAlert('A vége óra kitöltése kötelező!');
    } else if (this.modifiedWork.startHour >= this.modifiedWork.endHour) {
      this.setAlert('A kezdeti óra nem lehet egyben vagy utána a vége órának!');
    } else if (!this.modifiedWork.workerCount || !isNumber(this.modifiedWork.workerCount)) {
      this.setAlert('A humán szám kitöltése kötelező!');
    } else if (this.modifiedWork.workerCount < 0) {
      this.setAlert('A darabszának minimum 0-nak kell lennie.');
    } else {
      this.modifySuccess = true;
      setTimeout(() => {
        this.modifySuccess = false;
      }, 3000);
      this.work.bosses = [...this.modifiedWork.bosses];
      this.work.day = this.modifiedWork.day;
      this.work.startHour = this.modifiedWork.startHour;
      this.work.endHour = this.modifiedWork.endHour;
      this.work.workerCount = this.modifiedWork.workerCount;
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
