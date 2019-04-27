import { GTWork } from './../../models/gt.work.model';
import { Component, OnInit, Input } from '@angular/core';
import { GTWorker } from 'src/app/models/gt.worker.model';

@Component({
  selector: 'app-gt-work',
  templateUrl: './gt-work.component.html',
  styleUrls: ['./gt-work.component.css']
})
export class GtWorkComponent implements OnInit {
  @Input() work: GTWork;
  @Input() workers: GTWorker[];
  modifiedWork: GTWork = null;
  onModify = false;
  selectedWorker = -1;

  constructor() {}

  ngOnInit() {
    this.workers = this.workers.filter(x => x.isWorker);
  }

  deleteBoss() {}

  addBoss() {}

  modify() {
    this.onModify = true;
    this.modifiedWork = { ...this.work };
  }

  saveModify() {}
}
