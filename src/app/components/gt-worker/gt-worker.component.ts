import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GTWorker } from 'src/app/models/gt.worker.model';

@Component({
  selector: 'app-gt-worker',
  templateUrl: './gt-worker.component.html',
  styleUrls: ['./gt-worker.component.css']
})
export class GtWorkerComponent implements OnInit {
  @Input() worker: GTWorker;
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter();
  modifiedWorker: GTWorker = null;
  onModify = false;
  selectedWork = -1;
  modifySuccess = false;

  constructor() {}

  ngOnInit() {}

  modify() {
    this.onModify = true;
    this.modifiedWorker = { ...this.worker };
  }

  saveModify() {
    this.modifySuccess = true;
    setTimeout(() => (this.modifySuccess = false), 3000);
    this.worker.activeWorks = [...this.modifiedWorker.activeWorks];
    this.worker.isWorker = this.modifiedWorker.isWorker;
    this.save.emit();
    this.onModify = false;
  }

  deleteWorker() {
    this.delete.emit(this.worker.name);
  }
}
