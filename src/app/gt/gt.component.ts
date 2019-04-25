import { GT } from './../models/gt.model';
import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

  changeGt() {
    this.gt = this.gts[this.selectedGt];
  }

  newGt() {
    const year = new Date().getFullYear();
    if (!this.gts.find(x => x.year === year)) {
      //TODO
    }
  }

  saveWork(work: string) {}

  saveWorker(worker: string) {}
}
