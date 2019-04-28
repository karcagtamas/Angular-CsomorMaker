import { GTWorkTable } from './../../models/gt.work.table.model';
import { GTWorker } from 'src/app/models/gt.worker.model';
import { Component, OnInit, Input } from '@angular/core';
import { GTWorkerTable } from 'src/app/models/gt.worker.table.model';

@Component({
  selector: 'app-gt-worker-export',
  templateUrl: './gt-worker-export.component.html',
  styleUrls: ['./gt-worker-export.component.css']
})
export class GtWorkerExportComponent implements OnInit {
  @Input() workers: GTWorker[];
  @Input() days: number;
  export = [];
  selectedWorker = -1;
  selectedValue = '';

  constructor() {}

  ngOnInit() {
    if (this.workers.length > 0) {
      this.selectedWorker = 0;
      this.createTable();
    }
  }

  createTable() {
    this.export = [];
    const worker: GTWorker = this.workers[this.selectedWorker];
    for (let i = 0; i < this.days; i++) {
      for (let j = 0; j < 24; j++) {
        if (j === 0) {
          const list: GTWorkTable[] = [];
          this.export.push(list);
        }

        if (worker.works.find(x => x.day === i + 1 && x.hour === j)) {
          const table = worker.works.find(x => x.day === i + 1 && x.hour === j);
          this.export[i].push(table);
        } else {
          const table = new GTWorkerTable();
          table.day = i + 1;
          table.hour = j;
          table.work = '-';
          this.export[i].push(table);
        }
      }
    }
  }

  mouseEnter(value: string) {
    this.selectedValue = value;
  }

  mouseLeave() {
    this.selectedValue = '';
  }
}
